'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useLanguage } from '@/lib/i18n/language-context'
import { useScroll3D } from '@/hooks/use-scroll-3d'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: { en: 'Do I need a gateway or additional hardware?', fa: 'آیا به گیت‌وی یا سخت‌افزار اضافی نیاز دارم؟', ar: 'هل أحتاج إلى بوابة أو أجهزة إضافية؟' },
    a: { en: 'No. ArvandSmartControl connects directly to your chiller controllers via TCP/IP over your existing Ethernet network. No gateway, no extra hardware, no configuration headaches. Just plug your controller into the network and you are online.', fa: 'خیر. ArvandSmartControl مستقیماً از طریق TCP/IP به کنترلرهای چیلر شما متصل می‌شود. بدون گیت‌وی، بدون سخت‌افزار اضافه، بدون دردسر تنظیمات. کافیست کنترلر خود را به شبکه وصل کنید و آنلاین شوید.', ar: 'لا. يتصل ArvandSmartControl مباشرة بوحدات تحكم المبردات عبر TCP/IP على شبكة Ethernet الحالية. بدون بوابة، بدون أجهزة إضافية، بدون متاعب تكوين. فقط قم بتوصيل وحدة التحكم بالشبكة وستكون متصلاً.' },
  },
  {
    q: { en: 'Which chiller brands and controllers are supported?', fa: 'کدام برندها و کنترلرهای چیلر پشتیبانی می‌شوند؟', ar: 'ما هي العلامات التجارية ووحدات تحكم المبردات المدعومة؟' },
    a: { en: 'We support Carel (pCO series), Danfoss (MCX, EKF), Microtech (UC, EC), Siemens (Climatix, Synco), Honeywell (Spyder, WEB), Johnson Controls (Metasys, FX), Schneider (EcoStruxure), and LG (Multi V, VRF). If your controller speaks Modbus, BACnet, or TCP/IP, it will work.', fa: 'ما از Carel (سری pCO)، Danfoss (MCX, EKF)، Microtech (UC, EC)، Siemens (Climatix, Synco)، Honeywell (Spyder, WEB)، Johnson Controls (Metasys, FX)، Schneider (EcoStruxure) و LG (Multi V, VRF) پشتیبانی می‌کنیم. اگر کنترلر شما Modbus، BACnet یا TCP/IP پشتیبانی می‌کند، کار خواهد کرد.', ar: 'نحن ندعم Carel (سلسلة pCO)، Danfoss (MCX, EKF)، Microtech (UC, EC)، Siemens (Climatix, Synco)، Honeywell (Spyder, WEB)، Johnson Controls (Metasys, FX)، Schneider (EcoStruxure) و LG (Multi V, VRF). إذا كانت وحدة التحكم لديك تدعم Modbus أو BACnet أو TCP/IP، فستعمل.' },
  },
  {
    q: { en: 'How long does installation take?', fa: 'نصب چقدر طول می‌کشد؟', ar: 'كم من الوقت يستغرق التثبيت؟' },
    a: { en: 'Most installations are completed within 2-4 hours per site. For a typical facility with 5-10 chillers, the entire setup including configuration takes less than a day. Our team handles everything remotely — no on-site visit needed.', fa: 'بیشتر نصب‌ها در ۲-۴ ساعت برای هر سایت تکمیل می‌شوند. برای یک تأسیسات معمولی با ۵-۱۰ چیلر، کل راه‌اندازی شامل تنظیمات کمتر از یک روز طول می‌کشد. تیم ما همه چیز را از راه دور انجام می‌دهد — بدون نیاز به حضور در محل.', ar: 'يكتمل معظم عمليات التثبيت في غضون ٢-٤ ساعات لكل موقع. لمنشأة نموذجية بها ٥-١٠ مبردات، يستغرق الإعداد الكامل بما في ذلك التهيئة أقل من يوم. فريقنا يدير كل شيء عن بعد — دون الحاجة لزيارة الموقع.' },
  },
  {
    q: { en: 'What happens if my internet connection goes down?', fa: 'اگر اتصال اینترنت من قطع شود چه اتفاقی می‌افتد؟', ar: 'ماذا يحدث إذا انقطع اتصالي بالإنترنت؟' },
    a: { en: 'Your chillers continue operating normally — ArvandSmartControl is a monitoring and optimization platform, not a critical control system. Data is buffered locally and syncs automatically when the connection is restored. You will never lose historical data.', fa: 'چیلرهای شما به طور عادی به کار خود ادامه می‌دهند — ArvandSmartControl یک پلتفرم نظارت و بهینه‌سازی است، نه یک سیستم کنترل حیاتی. داده‌ها به صورت محلی ذخیره و هنگام بازگشت اتصال به طور خودکار همگام‌سازی می‌شوند. هرگز داده‌های تاریخی را از دست نخواهید داد.', ar: 'تستمر مبرداتك في العمل بشكل طبيعي — ArvandSmartControl هي منصة مراقبة وتحسين، وليس نظام تحكم حاسماً. يتم تخزين البيانات محلياً وتتم المزامنة تلقائياً عند استعادة الاتصال. لن تفقد أي بيانات تاريخية أبداً.' },
  },
  {
    q: { en: 'Is my data secure?', fa: 'آیا داده‌های من امن هستند؟', ar: 'هل بياناتي آمنة؟' },
    a: { en: 'Yes. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We are SOC 2 compliant and follow industry best practices for access control and audit logging. Your data is stored on secure cloud infrastructure with 99.99% uptime SLA.', fa: 'بله. تمام داده‌ها در حال انتقال (TLS 1.3) و در حالت ذخیره (AES-256) رمزنگاری می‌شوند. ما مطابق با SOC 2 هستیم و از بهترین روش‌های صنعت برای کنترل دسترسی و ثبت رویدادها پیروی می‌کنیم. داده‌های شما در زیرساخت ابری امن با SLA ۹۹.۹۹٪ ذخیره می‌شود.', ar: 'نعم. جميع البيانات مشفرة أثناء النقل (TLS 1.3) وعند التخزين (AES-256). نحن متوافقون مع SOC 2 ونتبع أفضل ممارسات الصناعة للتحكم في الوصول وتدقيق السجلات. يتم تخزين بياناتك على بنية تحتية سحابية آمنة مع SLA بنسبة ٩٩.٩٩٪.' },
  },
  {
    q: { en: 'Can I try before buying?', fa: 'آیا می‌توانم قبل از خرید امتحان کنم؟', ar: 'هل يمكنني التجربة قبل الشراء؟' },
    a: { en: 'Absolutely. We offer a 14-day free trial with full access to all features — no credit card required. We will set up a demo environment connected to your chillers so you can see the results firsthand. Contact our sales team to get started.', fa: 'حتماً. ما یک دوره آزمایشی رایگان ۱۴ روزه با دسترسی کامل به همه امکانات ارائه می‌دهیم — بدون نیاز به کارت اعتباری. یک محیط دمو متصل به چیلرهای شما راه‌اندازی می‌کنیم تا نتایج را از نزدیک ببینید. با تیم فروش ما تماس بگیرید.', ar: 'بالتأكيد. نقدم نسخة تجريبية مجانية لمدة ١٤ يوماً مع وصول كامل لجميع الميزات — بدون حاجة لبطاقة ائتمان. سنقوم بإعداد بيئة تجريبية متصلة بمبرداتك لتتمكن من رؤية النتائج بنفسك. اتصل بفريق المبيعات لدينا للبدء.' },
  },
  {
    q: { en: 'Can I customize the dashboard with my company branding?', fa: 'آیا می‌توانم داشبورد را با برند شرکت خود شخصی‌سازی کنم؟', ar: 'هل يمكنني تخصيص لوحة التحكم بعلامتي التجارية؟' },
    a: { en: 'Yes. Our Enterprise plan includes full white-label customization — custom domain, company logo, brand colors, and custom dashboard layouts. The platform adapts to your company identity, not the other way around.', fa: 'بله. پلن سازمانی ما شامل شخصی‌سازی کامل برند سفید است — دامنه اختصاصی، لوگوی شرکت، رنگ‌های برند و چیدمان داشبورد سفارشی. پلتفرم با هویت سازمان شما تطبیق می‌یابد، نه برعکس.', ar: 'نعم. تشملي خطتنا المؤسسية تخصيصاً كاملاً للعلامة البيضاء — نطاق مخصص وشعار الشركة وألوان العلامة التجارية وتخطيطات لوحة تحكم مخصصة. المنصة تتكيف مع هوية شركتك، وليس العكس.' },
  },
  {
    q: { en: 'What kind of support do you offer?', fa: 'چه نوع پشتیبانی ارائه می‌دهید؟', ar: 'ما نوع الدعم الذي تقدمونه؟' },
    a: { en: 'All plans include email support with a 4-hour response time. Professional plans add priority support with 1-hour response. Enterprise plans include a dedicated account manager and 24/7 phone support. We also have comprehensive documentation and API reference.', fa: 'همه پلن‌ها شامل پشتیبانی ایمیلی با زمان پاسخ ۴ ساعت هستند. پلن حرفه‌ای پشتیبانی اولویت‌دار با پاسخ ۱ ساعته اضافه می‌کند. پلن سازمانی شامل مدیر حساب اختصاصی و پشتیبانی تلفنی ۲۴/۷ است. ما همچنین مستندات جامع و مرجع API داریم.', ar: 'جميع الخطط تتضمن دعماً عبر البريد الإلكتروني مع وقت استجابة ٤ ساعات. الخطط الاحترافية تضيف دعماً ذا أولوية مع استجابة خلال ساعة. الخطط المؤسسية تتضمن مدير حساب مخصص ودعماً هاتفياً على مدار الساعة. لدينا أيضاً وثائق شاملة ومرجع API.' },
  },
]

export function FAQSection() {
  const { ref: scrollRef, rotateX, scale, y } = useScroll3D({ rotateRange: 5, scaleRange: [0.97, 1] })
  const { t, language } = useLanguage()
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const toggleIdx = (i: number) => setOpenIdx(openIdx === i ? null : i)

  return (
    <section id="faq" className="relative section-py px-4 overflow-hidden" ref={scrollRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background pointer-events-none" />
      <div className="section-alt absolute inset-0 pointer-events-none" />

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
            <span className="text-foreground">{t('faq.title.part1')}</span>{' '}
            <span className="text-primary block sm:inline">{t('faq.title.part2')}</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground/80 leading-relaxed font-mono max-w-2xl mx-auto px-2 sm:px-0">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        {/* FAQ accordion */}
        <div className="max-w-3xl mx-auto space-y-2 sm:space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
                className={`card-command overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-primary/20 shadow-sm shadow-primary/5' : ''
                }`}
              >
                {/* Question (clickable) */}
                <button
                  onClick={() => toggleIdx(i)}
                  className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 sm:py-4 text-left rtl:text-right"
                  aria-expanded={isOpen}
                >
                  <span className={`text-sm sm:text-base font-medium transition-colors ${isOpen ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                    {faq.q[language] || faq.q.en}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex-shrink-0 ${isOpen ? 'text-primary' : 'text-muted-foreground/50'}`}
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
                        <div className="border-t border-border/30 pt-3">
                          <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                            {faq.a[language] || faq.a.en}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
