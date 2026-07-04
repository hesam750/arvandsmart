'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '@/lib/i18n/language-context'
import { useScroll3D } from '@/hooks/use-scroll-3d'
import { CircuitBoard, Cpu, Wifi, Building2, Thermometer, Factory, Microchip, Zap } from 'lucide-react'

const brands = [
  {
    name: 'Carel',
    desc: { en: 'pCO series controllers — full Modbus & BACnet support', fa: 'کنترلرهای سری pCO — پشتیبانی کامل Modbus و BACnet', ar: 'وحدات تحكم سلسلة pCO — دعم كامل لـ Modbus و BACnet' },
    color: 'from-blue-500/20 to-blue-600/10',
    icon: Microchip,
    protocols: ['Modbus', 'BACnet'],
  },
  {
    name: 'Danfoss',
    desc: { en: 'MCX and EKF series — direct TCP/IP connection', fa: 'سری MCX و EKF — اتصال مستقیم TCP/IP', ar: 'سلسلة MCX و EKF — اتصال مباشر عبر TCP/IP' },
    color: 'from-emerald-500/20 to-emerald-600/10',
    icon: CircuitBoard,
    protocols: ['TCP/IP', 'Modbus'],
  },
  {
    name: 'Microtech',
    desc: { en: 'All UC and EC series controllers supported', fa: 'تمامی کنترلرهای سری UC و EC پشتیبانی می‌شوند', ar: 'جميع وحدات تحكم سلسلة UC و EC مدعومة' },
    color: 'from-violet-500/20 to-violet-600/10',
    icon: Cpu,
    protocols: ['Modbus', 'BACnet'],
  },
  {
    name: 'Siemens',
    desc: { en: 'Climatix and Synco series — seamless integration', fa: 'سری Climatix و Synco — یکپارچه‌سازی بدون درز', ar: 'سلسلة Climatix و Synco — تكامل سلس' },
    color: 'from-cyan-500/20 to-cyan-600/10',
    icon: Wifi,
    protocols: ['BACnet', 'KNX'],
  },
  {
    name: 'Honeywell',
    desc: { en: 'Spyder and WEB series controllers supported', fa: 'کنترلرهای سری Spyder و WEB پشتیبانی می‌شوند', ar: 'وحدات تحكم سلسلة Spyder و WEB مدعومة' },
    color: 'from-amber-500/20 to-amber-600/10',
    icon: Thermometer,
    protocols: ['BACnet', 'Modbus'],
  },
  {
    name: 'Johnson Controls',
    desc: { en: 'Metasys and FX series — full integration', fa: 'سری Metasys و FX — یکپارچه‌سازی کامل', ar: 'سلسلة Metasys و FX — تكامل كامل' },
    color: 'from-rose-500/20 to-rose-600/10',
    icon: Building2,
    protocols: ['BACnet', 'N2'],
  },
  {
    name: 'Schneider',
    desc: { en: 'EcoStruxure and Andover Continuum ready', fa: 'سازگار با EcoStruxure و Andover Continuum', ar: 'متوافق مع EcoStruxure و Andover Continuum' },
    color: 'from-green-500/20 to-green-600/10',
    icon: Factory,
    protocols: ['Modbus', 'BACnet'],
  },
  {
    name: 'LG Electronics',
    desc: { en: 'Multi V and VRF systems — direct connection', fa: 'سیستم‌های Multi V و VRF — اتصال مستقیم', ar: 'أنظمة Multi V و VRF — اتصال مباشر' },
    color: 'from-red-500/20 to-red-600/10',
    icon: Zap,
    protocols: ['TCP/IP', 'Modbus'],
  },
]

export function BrandShowcaseSection() {
  const { t, language } = useLanguage()
  const { ref: scrollRef, rotateX, scale, y } = useScroll3D({ rotateRange: 5, scaleRange: [0.97, 1] })
  const dir = language === 'ar' ? 'rtl' : 'ltr'

  return (
    <section id="brands" className="relative section-py px-4 overflow-hidden" ref={scrollRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />
      <div className="section-alt absolute inset-0 pointer-events-none" />

      <motion.div
        style={{ rotateX, scale, y }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1]">
            <span className="text-foreground">{t('brands.title.part1')}</span>{' '}
            <span className="text-primary block sm:inline">{t('brands.title.part2')}</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-mono max-w-2xl mx-auto px-2 sm:px-0">
            {t('brands.subtitle')}
          </p>
        </motion.div>

        {/* Brand Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {brands.map((brand, i) => {
            const Icon = brand.icon
            const isCarel = brand.name === 'Carel'
            return (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className={`group card-command p-4 sm:p-5 hover:-translate-y-1 hover:shadow-lg transition-all cursor-default ${isCarel ? 'sm:col-span-2 lg:col-span-2 border-primary/30 shadow-primary/10 hover:shadow-primary/20' : 'hover:shadow-primary/5'}`}
                style={{ direction: dir }}
              >
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${brand.color} flex items-center justify-center mb-3 border ${isCarel ? 'border-primary/40 shadow-sm shadow-primary/20' : 'border-border/30'}`}>
                  <Icon className={`w-5 h-5 ${isCarel ? 'text-primary' : 'text-foreground/80'}`} />
                </div>

                {/* Brand name */}
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`text-base sm:text-lg font-bold ${isCarel ? 'text-primary' : 'text-foreground/90'} mb-0`}>{brand.name}</h3>
                  {isCarel && (
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] sm:text-[10px] font-mono text-primary tracking-wider uppercase">
                      Primary
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted-foreground/70 leading-relaxed mb-3">
                  {brand.desc[language] || brand.desc.en}
                </p>

                {/* Protocol badges */}
                <div className="flex flex-wrap gap-1.5" style={{ direction: 'ltr' }}>
                  {brand.protocols.map((p) => (
                    <span
                      key={p}
                      className={`px-2 py-0.5 rounded-md border text-[10px] sm:text-[11px] font-mono ${isCarel ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-primary/5 border-primary/10 text-primary/70'}`}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-xs sm:text-sm text-muted-foreground/50 mt-6 sm:mt-8 data-text"
        >
          {t('brands.note')}
        </motion.p>
      </motion.div>
    </section>
  )
}
