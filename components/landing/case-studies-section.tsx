'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { useLanguage } from '@/lib/i18n/language-context'
import { useScroll3D } from '@/hooks/use-scroll-3d'
import { BarChart3, TrendingDown, AlertTriangle, CheckCircle, ArrowUpRight, Building2, Building, Hotel } from 'lucide-react'
import { Button } from '@/components/ui/button'

const caseStudies = [
  {
    id: 'hotel-kish',
    icon: Hotel,
    company: { en: 'Kish Ocean Hotel', fa: 'هتل اقیانوس کیش', ar: 'فندق كيش أوشن' },
    location: { en: 'Kish Island, Iran', fa: 'جزیره کیش، ایران', ar: 'جزيرة كيش، إيران' },
    challenge: {
      en: 'The hotel was spending over $12,000/month on cooling across 18 chillers. Frequent compressor failures and no visibility into system performance made maintenance reactive and costly. Chiller health was a blind guess.',
      fa: 'هتل ماهانه بیش از ۳۵۰ میلیون تومان برای سرمایش ۱۸ چیلر هزینه می‌کرد. خرابی مکرر کمپرسور و عدم دید به عملکرد سیستم، نگهداری را واکنشی و پرهزینه کرده بود. سلامت چیلرها یک حدس کورکورانه بود.',
      ar: 'كان الفندق ينفق أكثر من ١٢,٠٠٠ دولار شهرياً على التبريد عبر ١٨ مبرداً. أعطال الضاغط المتكررة وعدم الرؤية في أداء النظام جعلت الصيانة تفاعلية ومكلفة. صحة المبرد كانت تخميناً أعمى.',
    },
    solution: {
      en: 'Deployed ArvandSmartControl across all 18 Danfoss MCX chillers via direct TCP/IP connection. Health Score system revealed 4 chillers below 40/100. Z-score anomaly detection caught 2 early-stage compressor failures. Predictive maintenance engine auto-scheduled PM tasks across all units.',
      fa: 'نصب ArvandSmartControl روی همه ۱۸ چیلر Danfoss MCX از طریق اتصال مستقیم TCP/IP. سیستم امتیاز سلامت ۴ چیلر با امتیاز زیر ۴۰/۱۰۰ را نشان داد. تشخیص ناهنجاری Z-Score ۲ خرابی اولیه کمپرسور را شناسایی کرد. موتور نگهداری پیش‌بینانه به طور خودکار وظایف PM را برای همه واحدها زمان‌بندی کرد.',
      ar: 'تم نشر ArvandSmartControl على جميع مبردات Danfoss MCX الـ ١٨ عبر اتصال TCP/IP مباشر. كشف نظام درجة الصحة ٤ مبردات تحت ٤٠/١٠٠. اكتشف كشف الشذوذ Z-Score عطلين مبكرين في الضاغط. قام محرك الصيانة التنبؤية بجدولة مهام الصيانة الوقائية تلقائياً لجميع الوحدات.',
    },
    results: [
      { icon: TrendingDown, label: { en: 'Energy Cost Reduction', fa: 'کاهش هزینه انرژی', ar: 'تخفيض تكلفة الطاقة' }, value: '32%', color: 'text-chart-3' },
      { icon: AlertTriangle, label: { en: 'Failures Prevented', fa: 'خرابی جلوگیری شده', ar: 'أعطال تم منعها' }, value: '2', color: 'text-primary' },
      { icon: BarChart3, label: { en: 'Annual Savings', fa: 'صرفه‌جویی سالانه', ar: 'توفير سنوي' }, value: '$46K', color: 'text-chart-3' },
      { icon: CheckCircle, label: { en: 'Avg Health Score', fa: 'میانگین امتیاز سلامت', ar: 'متوسط درجة الصحة' }, value: '78', color: 'text-chart-2' },
    ],
  },
  {
    id: 'hospital-pars',
    icon: Building,
    company: { en: 'Pars Medical Center', fa: 'مرکز درمانی پارس', ar: 'مركز بارس الطبي' },
    location: { en: 'Tehran, Iran', fa: 'تهران، ایران', ar: 'طهران، إيران' },
    challenge: {
      en: 'A 300-bed hospital with critical cooling for operating rooms and ICU. Legacy Carel pCO controllers provided no remote access, and manual rounds were error-prone. No historical data meant no trend analysis for predictive maintenance.',
      fa: 'بیمارستان ۳۰۰ تخته با سرمایش حیاتی برای اتاق‌های عمل و ICU. کنترلرهای قدیمی Carel pCO دسترسی از راه دور نداشتند و گشت‌های دستی خطا داشتند. بدون داده تاریخی، تحلیل روند برای نگهداری پیش‌بینانه غیرممکن بود.',
      ar: 'مستشفى بـ ٣٠٠ سرير مع تبريد حاسم لغرف العمليات والعناية المركزة. وحدات تحكم Carel pCO القديمة لم توفر وصولاً عن بعد، والدوريات اليدوية كانت عرضة للخطأ. لا بيانات تاريخية تعني عدم إمكانية تحليل الاتجاه للصيانة التنبؤية.',
    },
    solution: {
      en: 'Integrated ArvandSmartControl with 12 Carel pCO chillers via native TCP/IP. Deployed Health Score dashboard with real-time anomaly detection on supply/return temps and power consumption. Set up automated work order generation for PM tasks and webhook alerts for critical threshold breaches.',
      fa: 'یکپارچه‌سازی ArvandSmartControl با ۱۲ چیلر Carel pCO از طریق TCP/IP بومی. راه‌اندازی داشبورد امتیاز سلامت با تشخیص ناهنجاری لحظه‌ای روی دمای رفت/برگشت و مصرف برق. ایجاد خودکار دستور کار برای وظایف PM و هشدار Webhook برای نقض آستانه بحرانی.',
      ar: 'دمج ArvandSmartControl مع ١٢ مبرداً من Carel pCO عبر TCP/IP الأصلي. نشر لوحة تحكم درجة الصحة مع كشف الشذوذ اللحظي على درجات حرارة الإمداد/العودة واستهلاك الطاقة. إعداد إنشاء أوامر عمل تلقائي لمهام الصيانة الوقائية وتنبيهات Webhook لاختراقات العتبة الحرجة.',
    },
    results: [
      { icon: TrendingDown, label: { en: 'Energy Cost Reduction', fa: 'کاهش هزینه انرژی', ar: 'تخفيض تكلفة الطاقة' }, value: '28%', color: 'text-chart-3' },
      { icon: AlertTriangle, label: { en: 'Critical Alerts Caught', fa: 'هشدارهای بحرانی شناسایی', ar: 'تنبيهات حرجة تم اكتشافها' }, value: '47', color: 'text-primary' },
      { icon: BarChart3, label: { en: 'Overtime Saved (hrs/mo)', fa: 'صرفه‌جویی اضافه‌کاری (ساعت/ماه)', ar: 'توفير ساعات العمل الإضافي (شهرياً)' }, value: '120h', color: 'text-chart-3' },
      { icon: CheckCircle, label: { en: 'Health Score Avg', fa: 'میانگین امتیاز سلامت', ar: 'متوسط درجة الصحة' }, value: '85', color: 'text-chart-2' },
    ],
  },
  {
    id: 'tehran-mall',
    icon: Building2,
    company: { en: 'Tehran Grand Mall', fa: 'گرند مال تهران', ar: 'جراند مول طهران' },
    location: { en: 'Tehran, Iran', fa: 'تهران، ایران', ar: 'طهران، إيران' },
    challenge: {
      en: 'Large commercial complex with 34 mixed-brand chillers (Microtech UC, LG Multi V, Johnson Controls). No unified platform across 3 brands. Energy costs 40% above benchmark. Manual monitoring across different controller protocols was unsustainable.',
      fa: 'مجتمع تجاری بزرگ با ۳۴ چیلر برندهای مختلف (Microtech UC، LG Multi V، Johnson Controls). عدم وجود پلتفرم یکپارچه برای ۳ برند. هزینه انرژی ۴۰٪ بالاتر از استاندارد. نظارت دستی روی پروتکل‌های مختلف کنترلر غیرممکن بود.',
      ar: 'مجمع تجاري كبير بـ ٣٤ مبرداً مختلط العلامات (Microtech UC، LG Multi V، Johnson Controls). لا توجد منصة موحدة عبر ٣ علامات تجارية. تكاليف الطاقة أعلى بنسبة ٤٠٪ من المعيار. المراقبة اليدوية عبر بروتوكولات تحكم مختلفة كانت غير مستدامة.',
    },
    solution: {
      en: 'Deployed ArvandSmartControl across all 34 chillers via direct TCP/IP — no gateway needed despite 3 different brands. Unified Health Score dashboard showed compressor issues on 5 units. Energy analytics with tariff cost calculation identified peak-demand billing inefficiencies. Z-score detection caught 15 emerging anomalies.',
      fa: 'نصب ArvandSmartControl روی همه ۳۴ چیلر از طریق TCP/IP مستقیم — بدون نیاز به گیت‌وی با وجود ۳ برند مختلف. داشبورد یکپارچه امتیاز سلامت مشکلات کمپرسور در ۵ واحد را نشان داد. تحلیل انرژی با محاسبه هزینه تعرفه ناکارآمدی‌های صورتحساب پیک مصرف را شناسایی کرد. تشخیص Z-Score ۱۵ ناهنجاری در حال ظهور را کشف کرد.',
      ar: 'نشر ArvandSmartControl عبر جميع المبردات الـ ٣٤ عبر TCP/IP مباشر — بدون حاجة لبوابة رغم ٣ علامات تجارية مختلفة. أظهرت لوحة تحكم درجة الصحة الموحدة مشاكل ضاغط في ٥ وحدات. حدد تحليل الطاقة مع حساب تكلفة التعرفة أوجه قصور فوترة ذروة الطلب. كشف Z-Score عن ١٥ حالة شذوذ ناشئة.',
    },
    results: [
      { icon: TrendingDown, label: { en: 'Energy Cost Reduction', fa: 'کاهش هزینه انرژی', ar: 'تخفيض تكلفة الطاقة' }, value: '38%', color: 'text-chart-3' },
      { icon: AlertTriangle, label: { en: 'Anomalies Detected', fa: 'ناهنجاری کشف شده', ar: 'حالات شذوذ مكتشفة' }, value: '15', color: 'text-primary' },
      { icon: BarChart3, label: { en: 'Annual Savings', fa: 'صرفه‌جویی سالانه', ar: 'توفير سنوي' }, value: '$88K', color: 'text-chart-3' },
      { icon: CheckCircle, label: { en: 'Avg Health Score', fa: 'میانگین امتیاز سلامت', ar: 'متوسط درجة الصحة' }, value: '72→91', color: 'text-chart-2' },
    ],
  },
]

export function CaseStudiesSection() {
  const { ref: scrollRef, rotateX, scale, y } = useScroll3D({ rotateRange: 6, scaleRange: [0.97, 1] })
  const { t, language } = useLanguage()
  const [activeIdx, setActiveIdx] = useState(0)
  const study = caseStudies[activeIdx]

  return (
    <section id="case-studies" className="relative section-py px-4 overflow-hidden" ref={scrollRef}>
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
            <span className="text-foreground">{t('caseStudies.title.part1')}</span>{' '}
            <span className="text-primary block sm:inline">{t('caseStudies.title.part2')}</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-mono max-w-2xl mx-auto px-2 sm:px-0">
            {t('caseStudies.subtitle')}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
          {caseStudies.map((cs, i) => {
            const Icon = cs.icon
            return (
              <button
                key={cs.id}
                onClick={() => setActiveIdx(i)}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeIdx === i
                    ? 'bg-primary/10 border border-primary/30 text-primary'
                    : 'bg-card border border-border/40 text-muted-foreground hover:text-foreground hover:border-border/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {cs.company[language] || cs.company.en}
              </button>
            )
          })}
        </div>

        {/* Active Case Study */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-5 gap-5 sm:gap-6"
          >
            {/* Left: Story */}
            <div className="lg:col-span-3 card-command p-5 sm:p-6 sm:p-8 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs data-text text-muted-foreground/50 tracking-wider uppercase">
                  {study.company[language] || study.company.en}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
                <span className="text-xs text-muted-foreground/50">{study.location[language] || study.location.en}</span>
              </div>

              <div className="space-y-4 sm:space-y-5 flex-1">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold data-text tracking-wider text-destructive/80 mb-1.5">
                    {language === 'fa' ? 'چالش' : language === 'ar' ? 'التحدي' : 'The Challenge'}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                    {study.challenge[language] || study.challenge.en}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold data-text tracking-wider text-chart-3/80 mb-1.5">
                    {language === 'fa' ? 'راه‌حل' : language === 'ar' ? 'الحل' : 'The Solution'}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                    {study.solution[language] || study.solution.en}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border/30">
                <Button variant="outline" size="sm" className="text-xs border-primary/20 text-muted-foreground hover:text-foreground">
                  {t('caseStudies.readMore')}
                  <ArrowUpRight className="w-3 h-3 ms-1" />
                </Button>
              </div>
            </div>

            {/* Right: Results */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-3 sm:gap-4 content-start">
              {study.results.map((r, j) => {
                const RIcon = r.icon
                return (
                  <motion.div
                    key={r.label.en}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.4, delay: 0.2 + j * 0.1 }}
                    className="card-command p-4 sm:p-5 text-center flex flex-col items-center justify-center"
                  >
                    <RIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${r.color} mb-1.5`} />
                    <div className={`text-xl sm:text-2xl font-bold font-mono ${r.color}`}>{r.value}</div>
                    <div className="text-[9px] sm:text-[10px] data-text text-muted-foreground/50 mt-0.5 text-center leading-tight">
                      {r.label[language] || r.label.en}
                    </div>
                  </motion.div>
                )
              })}

              {/* Industry tags */}
              <div className="col-span-2 flex flex-wrap gap-1.5 justify-center mt-1">
                {['Hospitality', 'Healthcare', 'Commercial'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-md bg-secondary/50 text-[9px] sm:text-[10px] data-text text-muted-foreground/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
