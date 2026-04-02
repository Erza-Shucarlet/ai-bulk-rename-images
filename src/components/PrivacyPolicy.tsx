import { useI18n } from '../i18n';

export default function PrivacyPolicy() {
  const { t } = useI18n();

  const sections = [
    { title: t('privacyIntroTitle'), text: t('privacyIntroText') },
    { title: t('privacyDataTitle'), text: t('privacyDataText') },
    { title: t('privacyLocalTitle'), text: t('privacyLocalText') },
    { title: t('privacyAdsTitle'), text: t('privacyAdsText') },
    { title: t('privacyAnalyticsTitle'), text: t('privacyAnalyticsText') },
    { title: t('privacyCookiesTitle'), text: t('privacyCookiesText') },
    { title: t('privacyContactTitle'), text: t('privacyContactText') },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <a
          href="/"
          className="inline-flex items-center text-sm text-blue-500 hover:text-blue-700 mb-8 transition-colors"
        >
          {t('privacyBackHome')}
        </a>

        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t('privacyTitle')}</h1>
        <p className="text-sm text-slate-400 dark:text-slate-500 mb-10">{t('privacyLastUpdated')}</p>

        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">{s.title}</h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{s.text}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
