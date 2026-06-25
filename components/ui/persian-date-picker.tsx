'use client'

import { useMemo, useCallback } from 'react'
import { toJalaali, toGregorian, jalaaliMonthLength } from 'jalaali-js'

interface PersianDatePickerProps {
  value: string // ISO 8601 (Gregorian)
  onChange: (iso: string) => void
  className?: string
}

const persianMonths = [
  'فروردین', 'اردیبهشت', 'خرداد',
  'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر',
  'دی', 'بهمن', 'اسفند',
]

function isoToJalaaliParts(iso: string) {
  const d = new Date(iso)
  if (isNaN(d.getTime())) {
    const now = new Date()
    const j = toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate())
    return { jy: j.jy, jm: j.jm, jd: j.jd }
  }
  const j = toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate())
  return { jy: j.jy, jm: j.jm, jd: j.jd }
}

function jalaaliToIso(jy: number, jm: number, jd: number): string {
  const g = toGregorian(jy, jm, jd)
  const d = new Date(g.gy, g.gm - 1, g.gd)
  return d.toISOString().slice(0, 10)
}

export function PersianDatePicker({ value, onChange, className = '' }: PersianDatePickerProps) {
  const parts = useMemo(() => isoToJalaaliParts(value), [value])

  const daysInMonth = useMemo(
    () => jalaaliMonthLength(parts.jy, parts.jm),
    [parts.jy, parts.jm]
  )

  // Available years: current year - 5 to current year + 2
  const years = useMemo(() => {
    const currentJy = toJalaali(new Date().getFullYear(), 1, 1).jy
    return Array.from({ length: 8 }, (_, i) => currentJy - 5 + i)
  }, [])

  const days = useMemo(
    () => Array.from({ length: daysInMonth }, (_, i) => i + 1),
    [daysInMonth]
  )

  const handleYearChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newJy = parseInt(e.target.value)
      const clampedDay = Math.min(parts.jd, jalaaliMonthLength(newJy, parts.jm))
      const iso = jalaaliToIso(newJy, parts.jm, clampedDay)
      onChange(iso)
    },
    [parts.jm, parts.jd, onChange]
  )

  const handleMonthChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newJm = parseInt(e.target.value)
      const clampedDay = Math.min(parts.jd, jalaaliMonthLength(parts.jy, newJm))
      const iso = jalaaliToIso(parts.jy, newJm, clampedDay)
      onChange(iso)
    },
    [parts.jy, parts.jd, onChange]
  )

  const handleDayChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newJd = parseInt(e.target.value)
      const iso = jalaaliToIso(parts.jy, parts.jm, newJd)
      onChange(iso)
    },
    [parts.jy, parts.jm, onChange]
  )

  const selectClass = `appearance-none px-3 py-2.5 rounded-xl border border-border/40 bg-background/50 text-sm outline-none focus:border-primary/50 transition-colors cursor-pointer ${
    className.includes('w-') ? '' : ''
  }`

  return (
    <div className="flex gap-2 items-center" dir="rtl">
      {/* Day */}
      <select
        value={parts.jd}
        onChange={handleDayChange}
        className={`${selectClass} w-16 text-center`}
        aria-label="روز"
      >
        {days.map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <span className="text-muted-foreground/40">/</span>

      {/* Month */}
      <select
        value={parts.jm}
        onChange={handleMonthChange}
        className={`${selectClass} w-28`}
        aria-label="ماه"
      >
        {persianMonths.map((name, i) => (
          <option key={i + 1} value={i + 1}>{name}</option>
        ))}
      </select>

      <span className="text-muted-foreground/40">/</span>

      {/* Year */}
      <select
        value={parts.jy}
        onChange={handleYearChange}
        className={`${selectClass} w-20 text-center`}
        aria-label="سال"
      >
        {years.map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  )
}
