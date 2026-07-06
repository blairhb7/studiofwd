import '../../styles/home.css';
import '../../styles/legal.css';

import QuizModal from "@/components/quiz/quiz-modal-nextjs/QuizModal";
import { Nav } from '@/components/home/sections-a';
import { Footer } from '@/components/home/sections-b';

export const LEGAL_PAGES = {
  privacy: {
    kicker: 'Legal / 01',
    title: 'Privacy Policy',
    updated: 'Last updated: June 2, 2026',
    intro:
      'Studio/fwd respects your privacy. This policy explains what information we collect, how we use it, and the choices you have when working with us or visiting our website.',
    sections: [
      {
        title: 'Information we collect',
        body: [
          'We may collect personal information you choose to provide, including your name, email address, phone number, company name, project details, and messages submitted through contact forms.',
          'We may also collect basic technical information automatically, such as browser type, device information, pages visited, referral sources, approximate location, and general website usage data.'
        ],
      },
      {
        title: 'How we use your information',
        body: [
          'We use your information to respond to inquiries, provide design and development services, manage project communication, improve the website, send relevant updates when permitted, and protect the security of our website and services.'
        ],
      },
      {
        title: 'Sharing your information',
        body: [
          'We do not sell your personal information. We may share limited information with trusted service providers that help us operate the business, such as hosting platforms, form tools, analytics providers, payment processors, email tools, or project management systems.',
          'These providers only receive the information needed to perform their services.'
        ],
      },
      {
        title: 'Cookies and analytics',
        body: [
          'Our website may use cookies or similar technologies to understand website performance, improve user experience, and measure how visitors interact with pages.',
          'You can disable cookies through your browser settings, although some website features may not function as intended.'
        ],
      },
      {
        title: 'Data retention and security',
        body: [
          'We keep personal information only as long as needed to provide services, maintain records, resolve disputes, or meet legal obligations.',
          'We use reasonable technical and organizational safeguards to protect personal information. However, no method of internet transmission or electronic storage is completely secure.'
        ],
      },
      {
        title: 'Your rights',
        body: [
          'Depending on your location, you may have the right to request access, correction, deletion, or restriction of your personal information. You may also opt out of marketing communications at any time.',
          'California residents may have additional rights under applicable privacy laws, including the right to request details about personal information collected and request deletion where required by law.'
        ],
      },
      {
        title: 'Children’s privacy',
        body: [
          'Our website and services are not intended for children under 13. We do not knowingly collect personal information from children.'
        ],
      },
      {
        title: 'Contact',
        body: [
          'Questions about this Privacy Policy can be sent to: hello@studiofwd.com.'
        ],
      },
    ],
  },

  terms: {
    kicker: 'Legal / 02',
    title: 'Terms of Service',
    updated: 'Last updated: June 2, 2026',
    intro:
      'These Terms of Service govern your use of the Studio/fwd website, digital products, and client services. By using this website or working with Studio/fwd, you agree to these terms.',
    sections: [
      {
        title: 'Services overview',
        body: [
          'Studio/fwd provides website design, website development, Framer templates, digital products, and ongoing design or website support where agreed in writing.',
          'Project scope, pricing, deliverables, timelines, and payment terms will be outlined before work begins.'
        ],
      },
      {
        title: 'Client responsibilities',
        body: [
          'Clients are responsible for providing accurate information, project content, brand assets, images, copy, login access, feedback, and approvals needed to complete the work.',
          'Clients confirm that any materials provided to Studio/fwd do not violate the rights of any third party. Delays in feedback, content, or approvals may affect project timelines.'
        ],
      },
      {
        title: 'Payments and fees',
        body: [
          'Payment terms are agreed before each project begins. Projects may require a deposit, milestone payment, or full payment upfront depending on the service.',
          'Work may be paused or withheld if payments are late. Additional requests outside the original scope may be billed separately.'
        ],
      },
      {
        title: 'Revisions and scope',
        body: [
          'Each project includes the number of revision rounds listed in the proposal, invoice, or written agreement. Extra revisions, major direction changes, new pages, new features, or requests outside the original scope may require an additional fee.',
          'Studio/fwd will make reasonable efforts to communicate when a request is outside the agreed scope before additional work continues.'
        ],
      },
      {
        title: 'Ownership and intellectual property',
        body: [
          'After full payment is received, the client owns the final approved deliverables created specifically for their project, unless otherwise stated in writing.',
          'Studio/fwd retains ownership of internal processes, reusable systems, frameworks, draft concepts, unused designs, code snippets, and pre-existing materials used to produce the work.',
          'Studio/fwd may showcase completed work in portfolios, social media, case studies, and marketing materials unless a separate written agreement or NDA says otherwise.'
        ],
      },
      {
        title: 'Third-party tools and platforms',
        body: [
          'Projects may rely on third-party platforms or tools such as Framer, Next.js, hosting providers, form services, analytics tools, scheduling tools, payment providers, fonts, plugins, or integrations.',
          'Clients are responsible for third-party subscriptions, licenses, accounts, fees, and platform limitations. Studio/fwd is not responsible for outages, policy changes, bugs, or service issues caused by third-party providers.'
        ],
      },
      {
        title: 'Website performance and results',
        body: [
          'Studio/fwd designs and builds with care, usability, performance, and best practices in mind. However, we do not guarantee specific traffic, rankings, sales, leads, revenue, or conversion results.',
          'Business outcomes depend on many factors outside of our control, including offer quality, audience, pricing, marketing, sales process, and ongoing maintenance.'
        ],
      },
      {
        title: 'Cancellation',
        body: [
          'Either party may request to cancel a project. If a project is canceled after work has started, the client is responsible for payment for completed work, time reserved, and any agreed non-refundable fees.',
          'Completed work may be withheld until all outstanding balances are paid.'
        ],
      },
      {
        title: 'Limitation of liability',
        body: [
          'To the fullest extent permitted by law, Studio/fwd will not be liable for indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, revenue, business opportunities, or goodwill.',
          'Our total liability for any claim related to the website or services will not exceed the amount paid to Studio/fwd for the specific service giving rise to the claim.'
        ],
      },
      {
        title: 'Governing law',
        body: [
          'These terms are governed by the laws of the State of California, United States, unless another written agreement states otherwise.'
        ],
      },
      {
        title: 'Contact',
        body: [
          'Questions about these Terms can be sent to: hello@studiofwd.com.'
        ],
      },
    ],
  },

  refunds: {
    kicker: 'Legal / 03',
    title: 'Refund Policy',
    updated: 'Last updated: June 2, 2026',
    intro:
      'This Refund Policy explains how payments, cancellations, and refunds are handled for Studio/fwd services and digital products.',
    sections: [
      {
        title: 'Design and development services',
        body: [
          'Payments for design, development, strategy, and creative services are non-refundable once work has begun. This is because time, planning, project space, and resources are allocated immediately after kickoff.',
          'If a project is canceled before completion, the client is responsible for work completed up to that point.'
        ],
      },
      {
        title: 'Deposits',
        body: [
          'Deposits are non-refundable unless otherwise agreed in writing. Deposits reserve your project slot and cover early planning, communication, and preparation.'
        ],
      },
      {
        title: 'Digital products and templates',
        body: [
          'Due to the instant-access nature of templates, downloads, and digital products, all digital product purchases are final and non-refundable.'
        ],
      },
      {
        title: 'Project satisfaction',
        body: [
          'Studio/fwd aims to create a clear, collaborative process. If concerns come up during a project, we will make reasonable efforts to address them through feedback, revisions, and communication within the agreed project scope.'
        ],
      },
      {
        title: 'Chargebacks',
        body: [
          'Clients agree to contact Studio/fwd first to resolve billing concerns before initiating a chargeback or payment dispute.'
        ],
      },
    ],
  },

  disclaimer: {
    kicker: 'Legal / 04',
    title: 'Disclaimer',
    updated: 'Last updated: June 2, 2026',
    intro:
      'The information on this website is provided for general informational purposes and should not be treated as professional legal, financial, or business advice.',
    sections: [
      {
        title: 'No guarantees',
        body: [
          'Studio/fwd does not guarantee specific business results, revenue, website traffic, search rankings, conversion rates, or sales outcomes from using this website, our templates, or our services.'
        ],
      },
      {
        title: 'Website and service information',
        body: [
          'We do our best to keep website content accurate and current, but we make no warranties that all information is complete, reliable, error-free, or suitable for every situation.'
        ],
      },
      {
        title: 'Third-party links and tools',
        body: [
          'This website may reference or link to third-party platforms, tools, products, or websites. Studio/fwd is not responsible for third-party content, performance, pricing, privacy practices, or policies.'
        ],
      },
      {
        title: 'Use at your own risk',
        body: [
          'Your use of this website, templates, resources, and services is at your own risk. All materials are provided “as is” and “as available.”'
        ],
      },
    ],
  },

  cookies: {
    kicker: 'Legal / 05',
    title: 'Cookie Policy',
    updated: 'Last updated: June 2, 2026',
    intro:
      'This Cookie Policy explains how Studio/fwd may use cookies and similar technologies to improve website functionality and understand visitor behavior.',
    sections: [
      {
        title: 'What cookies are',
        body: [
          'Cookies are small files stored on your device when you visit a website. They help websites remember preferences, improve performance, and understand how visitors use a site.'
        ],
      },
      {
        title: 'How we use cookies',
        body: [
          'We may use cookies to support website functionality, measure site performance, analyze page usage, remember preferences, and improve the visitor experience.'
        ],
      },
      {
        title: 'Managing cookies',
        body: [
          'You can block, delete, or disable cookies through your browser settings. Some website features may not work properly if cookies are disabled.'
        ],
      },
      {
        title: 'Third-party cookies',
        body: [
          'Some third-party services used on this website may set their own cookies. These services are governed by their own privacy and cookie policies.'
        ],
      },
    ],
  },
};

export function LegalPage({ page }) {
  return (
    <>
      <Nav />
      <main className="legal-page">
      <section className="legal-hero">
        <div className="legal-grid" aria-hidden="true"></div>
        <div className="wrap legal-hero-inner">
          <div className="legal-kicker">{page.kicker}</div>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
          <span className="legal-updated">{page.updated}</span>
        </div>
      </section>

      <section className="legal-body-section">
        <div className="wrap legal-layout">
          <aside className="legal-aside">
            <span className="legal-aside-label">Studio/fwd</span>
            <nav aria-label="Legal pages">
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
              <a href="/refunds">Refunds</a>
              <a href="/disclaimer">Disclaimer</a>
              <a href="/cookies">Cookies</a>
            </nav>
          </aside>

          <div className="legal-card">
            {page.sections.map((section, index) => (
              <article className="legal-section" key={section.title}>
                <span className="legal-num">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{section.title}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
