'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { useLanguage } from '@/lib/i18n/language-context'
import { useScroll3D } from '@/hooks/use-scroll-3d'
import {
  Calculator,
  TrendingDown,
  DollarSign,
  RefreshCw,
  Snowflake,
  Wallet,
} from 'lucide-react'

export function ROICalculatorSection() {
  const {
    ref: scrollRef,
    rotateX,
    scale,
    y,
  } = useScroll3D({
    rotateRange: 5,
    scaleRange: [0.97, 1],
  })

  const { t, language } = useLanguage()

  // -----------------------------
  // Inputs
  // -----------------------------

  const [chillers, setChillers] = useState(10)

  // Monthly electricity bill
  const [bill, setBill] = useState(100000000)

  // Target energy reduction
  const [improvement, setImprovement] = useState(20)

  const [calculated, setCalculated] = useState(false)
  const [showResult, setShowResult] = useState(false)

  // -----------------------------
  // Safe input values
  // -----------------------------

  const numberOfChillers = Math.max(
    1,
    Number(chillers) || 1
  )

  const monthlyBill = Math.max(
    0,
    Number(bill) || 0
  )

  const reductionPercent = Math.min(
    100,
    Math.max(0, Number(improvement) || 0)
  )

  // -----------------------------
  // Accurate calculations
  // -----------------------------

  /**
   * Monthly saving
   *
   * Example:
   * 100,000,000 × 20% = 20,000,000
   */
  const monthlySavings = Math.round(
    monthlyBill * (reductionPercent / 100)
  )

  /**
   * Monthly bill after optimization
   *
   * Example:
   * 100,000,000 - 20,000,000
   * = 80,000,000
   */
  const optimizedMonthlyBill = Math.round(
    monthlyBill - monthlySavings
  )

  /**
   * Current annual electricity cost
   */
  const annualBill = Math.round(
    monthlyBill * 12
  )

  /**
   * Annual saving
   *
   * Example:
   * 20,000,000 × 12
   * = 240,000,000
   */
  const annualSavings = Math.round(
    monthlySavings * 12
  )

  /**
   * Annual electricity cost after optimization
   */
  const optimizedAnnualBill = Math.round(
    optimizedMonthlyBill * 12
  )

  /**
   * Average monthly saving per chiller
   *
   * This is only an informational metric.
   * Number of chillers does NOT artificially change
   * the total saving.
   */
  const savingsPerChiller = Math.round(
    monthlySavings / numberOfChillers
  )

  // -----------------------------
  // Formatting
  // -----------------------------

  const currencySymbol =
    language === 'fa'
      ? 'تومان'
      : language === 'ar'
        ? '$'
        : '$'

  const formatMoney = (value: number) => {
    return value.toLocaleString(
      language === 'fa'
        ? 'fa-IR'
        : language === 'ar'
          ? 'ar-SA'
          : 'en-US'
    )
  }

  // -----------------------------
  // Calculate
  // -----------------------------

  const handleCalculate = () => {
    setShowResult(false)
    setCalculated(true)

    window.setTimeout(() => {
      setShowResult(true)
    }, 100)
  }

  // -----------------------------
  // Reset
  // -----------------------------

  const handleReset = () => {
    setCalculated(false)
    setShowResult(false)

    setChillers(10)
    setBill(100000000)
    setImprovement(20)
  }

  // -----------------------------
  // Input change helper
  // -----------------------------

  const handleBillChange = (
    value: string
  ) => {
    const numericValue = Number(
      value.replace(/,/g, '')
    )

    setBill(
      Number.isFinite(numericValue)
        ? Math.max(0, numericValue)
        : 0
    )

    setCalculated(false)
    setShowResult(false)
  }

  return (
    <section
      id="roi-calculator"
      className="relative section-py px-4 overflow-hidden"
      ref={scrollRef}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />

      <motion.div
        style={{
          rotateX,
          scale,
          y,
        }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* =========================
            Header
        ========================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: '-100px',
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1]">
            <span className="text-foreground">
              {t('roi.title.part1')}
            </span>{' '}

            <span className="text-primary block sm:inline">
              {t('roi.title.part2')}
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-mono max-w-2xl mx-auto px-2 sm:px-0">
            {t('roi.subtitle')}
          </p>
        </motion.div>

        {/* =========================
            Calculator
        ========================== */}

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-5 sm:gap-6">

          {/* =========================
              Inputs
          ========================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              margin: '-100px',
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="card-command p-5 sm:p-6 lg:p-8"
          >
            <h3 className="text-sm sm:text-base font-bold text-foreground/90 mb-5 sm:mb-6 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-primary" />

              {t('roi.inputs')}
            </h3>

            <div className="space-y-5 sm:space-y-6">

              {/* =========================
                  Number of chillers
              ========================== */}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                    {t('roi.chillers')}
                  </label>

                  <span className="text-sm sm:text-base font-bold font-mono text-primary tabular-nums">
                    {numberOfChillers}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Snowflake className="w-4 h-4 text-muted-foreground/50 shrink-0" />

                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={numberOfChillers}
                    onChange={(e) => {
                      setChillers(
                        Number(e.target.value)
                      )

                      setCalculated(false)
                      setShowResult(false)
                    }}
                    className="
                      flex-1
                      accent-primary
                      h-1.5
                      rounded-full
                      appearance-none
                      bg-border
                      cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:w-4
                      [&::-webkit-slider-thumb]:h-4
                      [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:bg-primary
                      [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-webkit-slider-thumb]:shadow-md
                    "
                  />
                </div>

                <p className="text-[10px] text-muted-foreground/40 mt-2">
                  {language === 'fa'
                    ? 'تعداد تجهیزات سرمایشی تحت پوشش'
                    : language === 'ar'
                      ? 'عدد وحدات التبريد'
                      : 'Number of cooling units'}
                </p>
              </div>

              {/* =========================
                  Monthly bill
              ========================== */}

              <div>
                <label className="text-xs sm:text-sm font-medium text-muted-foreground mb-2 block">
                  {t('roi.bill')}
                </label>

                <div className="relative">
                  <span
                    className="
                      absolute
                      inset-y-0
                      start-0
                      flex
                      items-center
                      ps-3
                      text-[10px]
                      sm:text-xs
                      text-muted-foreground/50
                      pointer-events-none
                    "
                  >
                    {currencySymbol}
                  </span>

                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatMoney(monthlyBill)}
                    onChange={(e) =>
                      handleBillChange(
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      px-16
                      py-3
                      rounded-lg
                      bg-background
                      border
                      border-border/60
                      text-sm
                      text-foreground
                      font-mono
                      tabular-nums
                      focus:outline-none
                      focus:ring-1
                      focus:ring-primary/30
                      focus:border-primary/40
                      transition-all
                    "
                    dir="ltr"
                  />
                </div>

                <p className="text-[10px] text-muted-foreground/40 mt-2">
                  {language === 'fa'
                    ? 'مبلغ واقعی قبض ماهانه برق'
                    : language === 'ar'
                      ? 'قيمة فاتورة الكهرباء الشهرية'
                      : 'Actual monthly electricity bill'}
                </p>
              </div>

              {/* =========================
                  Target reduction
              ========================== */}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                    {t('roi.improvement')}
                  </label>

                  <span className="text-sm sm:text-base font-bold font-mono text-primary tabular-nums">
                    {reductionPercent}%
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="80"
                  step="1"
                  value={reductionPercent}
                  onChange={(e) => {
                    setImprovement(
                      Number(e.target.value)
                    )

                    setCalculated(false)
                    setShowResult(false)
                  }}
                  className="
                    w-full
                    accent-primary
                    h-1.5
                    rounded-full
                    appearance-none
                    bg-border
                    cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-primary
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:shadow-md
                  "
                />

                <div className="flex justify-between text-[9px] text-muted-foreground/40 mt-2 font-mono">
                  <span>1%</span>
                  <span>80%</span>
                </div>
              </div>
            </div>

            {/* Buttons */}

            <div className="flex gap-2 mt-6 sm:mt-7">
              <button
                type="button"
                onClick={handleCalculate}
                disabled={monthlyBill <= 0}
                className="
                  flex-1
                  px-4
                  py-3
                  rounded-lg
                  bg-primary
                  text-primary-foreground
                  text-sm
                  font-medium
                  hover:bg-primary/90
                  active:scale-[0.98]
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  transition-all
                "
              >
                {t('roi.calculate')}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="
                  px-3
                  py-3
                  rounded-lg
                  bg-card
                  border
                  border-border/50
                  text-muted-foreground
                  text-sm
                  hover:text-foreground
                  hover:border-border/70
                  active:scale-[0.98]
                  transition-all
                "
                aria-label={
                  language === 'fa'
                    ? 'بازنشانی'
                    : 'Reset'
                }
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* =========================
              Results
          ========================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              margin: '-100px',
            }}
            transition={{
              duration: 0.5,
              delay: 0.3,
            }}
            className="card-command p-5 sm:p-6 lg:p-8 flex flex-col"
          >
            <h3 className="text-sm sm:text-base font-bold text-foreground/90 mb-4 sm:mb-6 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-chart-3" />

              {t('roi.results')}
            </h3>

            <AnimatePresence mode="wait">
              {showResult && calculated ? (
                <motion.div
                  key="results"
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -15,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-5"
                >

                  {/* =========================
                      Annual savings
                  ========================== */}

                  <div className="text-center py-4 sm:py-5 px-3 rounded-xl bg-chart-3/5 border border-chart-3/15">
                    <div className="text-[9px] sm:text-[10px] data-text text-chart-3/70 tracking-wider uppercase mb-1">
                      {language === 'fa'
                        ? 'صرفه‌جویی سالانه'
                        : language === 'ar'
                          ? 'التوفير السنوي'
                          : 'Annual Savings'}
                    </div>

                    <motion.div
                      initial={{
                        scale: 0.5,
                        opacity: 0,
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 15,
                        delay: 0.2,
                      }}
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono text-chart-3 tabular-nums"
                      dir="ltr"
                    >
                      {formatMoney(annualSavings)}
                    </motion.div>

                    <div className="text-[10px] sm:text-xs text-chart-3/60 mt-1">
                      {currencySymbol}
                    </div>

                    <div className="text-[10px] sm:text-xs text-chart-3/60 mt-1">
                      {language === 'fa'
                        ? `معادل ${formatMoney(monthlySavings)} تومان در ماه`
                        : language === 'ar'
                          ? `أي ${currencySymbol}${formatMoney(monthlySavings)} شهرياً`
                          : `≈ ${currencySymbol}${formatMoney(monthlySavings)} / month`}
                    </div>
                  </div>

                  {/* =========================
                      Secondary metrics
                  ========================== */}

                  <div className="grid grid-cols-2 gap-3">

                    {/* Reduction */}

                    <div className="text-center p-3 sm:p-4 rounded-xl bg-primary/5 border border-primary/10">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                        <TrendingDown className="w-3.5 h-3.5 text-primary" />
                      </div>

                      <div className="text-sm sm:text-base font-bold font-mono text-primary">
                        {reductionPercent}%
                      </div>

                      <div className="text-[8px] sm:text-[9px] data-text text-muted-foreground/50 mt-1">
                        {language === 'fa'
                          ? 'کاهش هدف'
                          : language === 'ar'
                            ? 'نسبة الخفض المستهدفة'
                            : 'Target reduction'}
                      </div>
                    </div>

                    {/* Optimized monthly bill */}

                    <div className="text-center p-3 sm:p-4 rounded-xl bg-chart-3/5 border border-chart-3/15">
                      <div className="w-8 h-8 rounded-lg bg-chart-3/10 flex items-center justify-center mx-auto mb-2">
                        <Wallet className="w-3.5 h-3.5 text-chart-3" />
                      </div>

                      <div
                        className="text-sm sm:text-base font-bold font-mono text-chart-3 tabular-nums"
                        dir="ltr"
                      >
                        {formatMoney(
                          optimizedMonthlyBill
                        )}
                      </div>

                      <div className="text-[8px] sm:text-[9px] data-text text-muted-foreground/50 mt-1">
                        {language === 'fa'
                          ? 'قبض ماهانه پس از کاهش'
                          : language === 'ar'
                            ? 'الفاتورة بعد الخفض'
                            : 'Bill after reduction'}
                      </div>
                    </div>
                  </div>

                  {/* =========================
                      Chiller information
                  ========================== */}

                  <div className="grid grid-cols-2 gap-3">

                    {/* Number of chillers */}

                    <div className="text-center p-3 rounded-xl bg-background/50 border border-border/30">
                      <div className="w-7 h-7 rounded-lg bg-primary/5 flex items-center justify-center mx-auto mb-1">
                        <Snowflake className="w-3.5 h-3.5 text-primary" />
                      </div>

                      <div className="text-sm font-bold font-mono text-foreground/80">
                        {numberOfChillers}
                      </div>

                      <div className="text-[8px] sm:text-[9px] text-muted-foreground/50 mt-0.5">
                        {language === 'fa'
                          ? 'تعداد چیلر'
                          : language === 'ar'
                            ? 'عدد المبردات'
                            : 'Chillers'}
                      </div>
                    </div>

                    {/* Saving per chiller */}

                    <div className="text-center p-3 rounded-xl bg-background/50 border border-border/30">
                      <div className="w-7 h-7 rounded-lg bg-primary/5 flex items-center justify-center mx-auto mb-1">
                        <DollarSign className="w-3.5 h-3.5 text-primary" />
                      </div>

                      <div
                        className="text-sm font-bold font-mono text-foreground/80 tabular-nums"
                        dir="ltr"
                      >
                        {formatMoney(
                          savingsPerChiller
                        )}
                      </div>

                      <div className="text-[8px] sm:text-[9px] text-muted-foreground/50 mt-0.5">
                        {language === 'fa'
                          ? 'صرفه‌جویی هر چیلر / ماه'
                          : language === 'ar'
                            ? 'التوفير لكل مبرد / شهر'
                            : 'Saving / chiller / month'}
                      </div>
                    </div>
                  </div>

                  {/* =========================
                      Annual cost comparison
                  ========================== */}

                  <div
                    className="pt-4 border-t border-border/30"
                    dir={language === 'fa' ? 'rtl' : 'ltr'}
                  >
                    <div className="flex items-center justify-between gap-4 text-xs">
                      <span className="text-muted-foreground/50">
                        {language === 'fa'
                          ? 'هزینه سالانه فعلی'
                          : language === 'ar'
                            ? 'التكلفة السنوية الحالية'
                            : 'Current annual cost'}
                      </span>

                      <span
                        className="font-mono text-muted-foreground/70"
                        dir="ltr"
                      >
                        {formatMoney(annualBill)}{' '}
                        {currencySymbol}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 text-xs mt-2">
                      <span className="text-muted-foreground/50">
                        {language === 'fa'
                          ? 'هزینه سالانه پس از کاهش'
                          : language === 'ar'
                            ? 'التكلفة السنوية بعد الخفض'
                            : 'Annual cost after reduction'}
                      </span>

                      <span
                        className="font-mono text-chart-3 font-semibold"
                        dir="ltr"
                      >
                        {formatMoney(
                          optimizedAnnualBill
                        )}{' '}
                        {currencySymbol}
                      </span>
                    </div>
                  </div>

                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="flex-1 flex flex-col items-center justify-center text-center py-6 sm:py-8"
                >
                  <Calculator className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground/20 mb-3" />

                  <p className="text-xs sm:text-sm text-muted-foreground/50 max-w-xs leading-relaxed">
                    {language === 'fa'
                      ? 'تعداد چیلر، مبلغ قبض ماهانه و درصد کاهش موردنظر خود را وارد کنید و محاسبه را بزنید.'
                      : language === 'ar'
                        ? 'أدخل عدد المبردات وقيمة الفاتورة الشهرية ونسبة الخفض المطلوبة ثم اضغط على حساب.'
                        : 'Enter the number of chillers, monthly bill and target reduction, then calculate.'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* =========================
            Disclaimer
        ========================== */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
            margin: '-100px',
          }}
          transition={{
            duration: 0.5,
            delay: 0.6,
          }}
          className="text-center text-[9px] sm:text-[10px] text-muted-foreground/30 data-text mt-4 sm:mt-5 max-w-2xl mx-auto leading-relaxed"
        >
          {language === 'fa'
            ? 'این محاسبه بر اساس مبلغ قبض ماهانه و درصد کاهش مصرف واردشده توسط کاربر انجام می‌شود. نتیجه، برآورد مالی است و میزان صرفه‌جویی واقعی به شرایط بهره‌برداری، تجهیزات و الگوی مصرف بستگی دارد.'
            : language === 'ar'
              ? 'يتم احتساب النتيجة بناءً على قيمة الفاتورة الشهرية ونسبة الخفض التي يدخلها المستخدم. النتيجة تقدير مالي وقد تختلف الوفورات الفعلية حسب ظروف التشغيل والمعدات ونمط الاستهلاك.'
              : 'The calculation is based on the monthly bill and target reduction entered by the user. Actual savings may vary depending on operating conditions, equipment and consumption patterns.'}
        </motion.p>
      </motion.div>
    </section>
  )
}