'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '@/lib/i18n/language-context'
import { useScroll3D } from '@/hooks/use-scroll-3d'
import { Calculator, TrendingDown, Leaf, DollarSign, RefreshCw } from 'lucide-react'

export function ROICalculatorSection() {
  const { ref: scrollRef, rotateX, scale, y } = useScroll3D({ rotateRange: 5, scaleRange: [0.97, 1] })
  const { t, language } = useLanguage()

  const [chillers, setChillers] = useState(10)
  const [bill, setBill] = useState(5000)
  const [improvement, setImprovement] = useState(30)
  const [calculated, setCalculated] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const annualBill = bill * 12
  const annualSavings = Math.round(annualBill * (improvement / 100))
  const co2Reduction = Math.round(chillers * 2.4 * (improvement / 100)) // tonnes CO2/year
  const monthlySavings = Math.round(annualSavings / 12)
  const roiMonths = 3 // typical: cost recovered in 3 months

  const handleCalculate = () => {
    setShowResult(false)
    setCalculated(true)
    // Brief delay for dramatic effect, then show result
    setTimeout(() => setShowResult(true), 100)
  }

  const handleReset = () => {
    setCalculated(false)
    setShowResult(false)
    setChillers(10)
    setBill(5000)
    setImprovement(30)
  }

  const currencySymbol = language === 'fa' ? 'تومان' : language === 'ar' ? '$' : '$'

  return (
    <section id="roi-calculator" className="relative section-py px-4 overflow-hidden" ref={scrollRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />

      <motion.div style={{ rotateX, scale, y }} className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-[1.1]">
            <span className="text-foreground">{t('roi.title.part1')}</span>{' '}
            <span className="text-primary block sm:inline">{t('roi.title.part2')}</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-mono max-w-2xl mx-auto px-2 sm:px-0">
            {t('roi.subtitle')}
          </p>
        </motion.div>

        {/* Calculator */}
        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-5 sm:gap-6">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-command p-5 sm:p-6 lg:p-8"
          >
            <h3 className="text-sm sm:text-base font-bold text-foreground/90 mb-4 sm:mb-6 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-primary" />
              {t('roi.inputs')}
            </h3>

            <div className="space-y-4 sm:space-y-5">
              {/* Number of chillers */}
              <div>
                <label className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 block">
                  {t('roi.chillers')}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={chillers}
                    onChange={(e) => { setChillers(Number(e.target.value)); setCalculated(false) }}
                    className="flex-1 accent-primary h-1.5 rounded-full appearance-none bg-border cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <span className="text-sm sm:text-base font-bold font-mono text-primary min-w-[3ch] text-center tabular-nums">
                    {chillers}
                  </span>
                </div>
              </div>

              {/* Monthly bill */}
              <div>
                <label className="text-xs sm:text-sm font-medium text-muted-foreground  mb-1.5 block">
                  {t('roi.bill')}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 start-0 flex items-center ps-3 text-xs sm:text-sm text-muted-foreground/60 pointer-events-none">
                    {currencySymbol}
                  </span>
                  <input
                    type="number"
                    min={100}
                    max={1000000}
                    value={bill}
                    onChange={(e) => { setBill(Number(e.target.value)); setCalculated(false) }}
                    className="w-full px-12 py-2 rounded-lg bg-background border border-border/60 text-sm text-foreground
                      focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/40 transition-all"
                  />
                </div>
              </div>

              {/* Estimated improvement */}
              <div>
                <label className="text-xs sm:text-sm font-medium text-muted-foreground mb-1.5 block">
                  {t('roi.improvement')}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={improvement}
                    onChange={(e) => { setImprovement(Number(e.target.value)); setCalculated(false) }}
                    className="flex-1 accent-primary h-1.5 rounded-full appearance-none bg-border cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <span className="text-sm sm:text-base font-bold font-mono text-primary min-w-[3ch] text-center tabular-nums">
                    {improvement}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-5 sm:mt-6">
              <button
                onClick={handleCalculate}
                className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium
                  hover:bg-primary/90 active:scale-[0.98] transition-all"
              >
                {t('roi.calculate')}
              </button>
              <button
                onClick={handleReset}
                className="px-3 py-2.5 rounded-lg bg-card border border-border/50 text-muted-foreground text-sm
                  hover:text-foreground hover:border-border/70 active:scale-[0.98] transition-all"
                aria-label="Reset"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
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
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-5"
                >
                  {/* Annual savings — primary metric */}
                  <div className="text-center py-3 sm:py-4 px-3 rounded-xl bg-chart-3/5 border border-chart-3/15">
                    <div className="text-[9px] sm:text-[10px] data-text text-chart-3/70 tracking-wider uppercase mb-1">
                      {t('roi.result.annual')}
                    </div>
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono text-chart-3"
                    >
                      {currencySymbol}{annualSavings.toLocaleString()}
                    </motion.div>
                    <div className="text-[10px] sm:text-xs text-chart-3/60 mt-0.5">
                      {language === 'fa' ? `${monthlySavings.toLocaleString()} ${currencySymbol} در ماه` : `≈ ${currencySymbol}${monthlySavings.toLocaleString()}/month`}
                    </div>
                  </div>

                  {/* Secondary metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-1">
                        <DollarSign className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="text-xs sm:text-sm font-bold font-mono text-primary">{improvement}%</div>
                      <div className="text-[8px] sm:text-[9px] data-text text-muted-foreground/50 mt-0.5">
                        {t('roi.result.reduction')}
                      </div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-chart-3/5 border border-chart-3/15">
                      <div className="w-7 h-7 rounded-lg bg-chart-3/10 flex items-center justify-center mx-auto mb-1">
                        <Leaf className="w-3.5 h-3.5 text-chart-3" />
                      </div>
                      <div className="text-xs sm:text-sm font-bold font-mono text-chart-3">{co2Reduction}{language === 'fa' ? ' تن' : 't'}</div>
                      <div className="text-[8px] sm:text-[9px] data-text text-muted-foreground/50 mt-0.5">
                        {t('roi.result.co2')}
                      </div>
                    </div>
                  </div>

                  {/* ROI timeline */}
                  <div className="text-center">
                    <div className="text-[9px] sm:text-[10px] data-text text-muted-foreground/50 tracking-wider">
                      {language === 'fa' ? 'بازگشت سرمایه در' : language === 'ar' ? 'العائد على الاستثمار خلال' : 'ROI achieved in'}
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-foreground/90 font-mono">
                      {language === 'fa' ? `${roiMonths} ماه` : language === 'ar' ? `${roiMonths} أشهر` : `${roiMonths} months`}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center py-6 sm:py-8"
                >
                  <Calculator className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground/20 mb-3" />
                  <p className="text-xs sm:text-sm text-muted-foreground/50 max-w-xs leading-relaxed">
                    {t('roi.placeholder')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-[9px] sm:text-[10px] text-muted-foreground/30 data-text mt-4 sm:mt-5 max-w-xl mx-auto"
        >
          {t('roi.disclaimer')}
        </motion.p>
      </motion.div>
    </section>
  )
}
