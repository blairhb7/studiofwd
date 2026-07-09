import { notFound } from 'next/navigation';
import { FREE_TEMPLATES, getFreeTemplate } from '@/lib/free-templates';
import TemplateCaptureForm from '@/components/free/TemplateCaptureForm';
import '../../../styles/free-template.css';

export function generateStaticParams() {
  return FREE_TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const t = getFreeTemplate(slug);
  if (!t) return {};
  return {
    title: `${t.name} — free Framer template · Studio/fwd`,
    description: t.subhead,
  };
}

const WHAT_YOU_GET = [
  { n: '01', title: 'The full template', body: 'The complete site, ready to remix in Framer — every section, style, and layout.' },
  { n: '02', title: 'Responsive & documented', body: 'Fully responsive, CMS-wired, components named the way a real dev would name them.' },
  { n: '03', title: 'Lifetime updates', body: 'Improvements and fixes land in your remix — the template keeps getting better.' },
];

export default function FreeTemplatePage({ params }) {
  const { slug } = params;
  const t = getFreeTemplate(slug);
  if (!t) notFound();

  return (
    <main className="ft-page">
      <section className="ft-wrap">
        <p className="ft-eyebrow">
          {t.index} · <span className="ft-eyebrow-strong">Free template</span>
        </p>

        <h1 className="ft-headline">
          <span className="ft-headline-name">{t.name}</span> — {t.headline}
        </h1>

        <p className="ft-subhead">{t.subhead}</p>
        <p className="ft-audience">{t.audience}</p>

        <div className="ft-list">
          {WHAT_YOU_GET.map((item) => (
            <div className="ft-list-row" key={item.n}>
              <span className="ft-list-num">{item.n}</span>
              <div>
                <h2 className="ft-list-title">{item.title}</h2>
                <p className="ft-list-body">{item.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="ft-capture">
          <TemplateCaptureForm slug={t.slug} />
        </div>

        <p className="ft-epilogue">
          Rather skip the weekend? I&rsquo;ll set it up with your brand, photos, and
          booking link — done in under a week, flat rate.{' '}
          <a className="ft-epilogue-link" href="/quiz">Ask about the Launch Package →</a>
        </p>
      </section>
    </main>
  );
}
