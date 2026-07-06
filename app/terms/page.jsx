import '../../styles/legal.css';
import { LegalPage, LEGAL_PAGES } from '@/components/legal/page';

export default function TermsPage() {
  return <LegalPage page={LEGAL_PAGES.terms} />;
}
