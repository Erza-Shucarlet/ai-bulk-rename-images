import { useState } from 'react';
import { useI18n } from '../i18n';

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{question}</span>
        <svg
          className={`w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-700/30 border-t border-slate-100 dark:border-slate-700">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function InfoSection() {
  const { t } = useI18n();

  const advantages = [
    t('infoAdv1'), t('infoAdv2'), t('infoAdv3'),
    t('infoAdv4'), t('infoAdv5'), t('infoAdv6'),
  ];

  const faqs = [
    { q: t('infoFaq1Q'), a: t('infoFaq1A') },
    { q: t('infoFaq2Q'), a: t('infoFaq2A') },
    { q: t('infoFaq3Q'), a: t('infoFaq3A') },
    { q: t('infoFaq4Q'), a: t('infoFaq4A') },
    { q: t('infoFaq5Q'), a: t('infoFaq5A') },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 space-y-10">
      {/* What is */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">{t('infoWhatTitle')}</h2>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{t('infoWhatText')}</p>
      </section>

      {/* Advantages */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">{t('infoAdvTitle')}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {advantages.map((adv, i) => (
            <li key={i} className="flex items-start gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3">
              <span className="mt-0.5 w-5 h-5 shrink-0 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-300">{adv}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">{t('infoFaqTitle')}</h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <FaqItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </section>
    </div>
  );
}
