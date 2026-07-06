import '../../styles/legal.css';
import { LegalPage, LEGAL_PAGES } from '@/components/legal/page';

export default function PrivacyPage() {
  return <LegalPage page={LEGAL_PAGES.privacy} />;
}
