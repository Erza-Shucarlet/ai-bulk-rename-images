import { useEffect } from 'react';
import { useI18n } from '../i18n';

export default function PrivacyPolicy() {
  const { t } = useI18n();

  useEffect(() => {
    // 设置隐私页独立 title，避免与主页重复
    document.title = 'Privacy Policy - AI Bulk Rename Images & Files';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Privacy Policy for AI Bulk Rename Images & Files. All file operations are performed locally in your browser — no files are ever uploaded to any server.');
    }
    return () => {
      // 离开时还原主页 title
      document.title = 'AI Bulk Rename Images & Files - Rename Online Fast';
      if (metaDesc) {
        metaDesc.setAttribute('content', 'Bulk rename images and files instantly in your browser. No login, no file uploads, and 100% privacy-friendly. Rename images online fast and securely!');
      }
    };
  }, []);

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
