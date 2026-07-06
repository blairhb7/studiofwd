import '../../styles/legal.css';
import { LegalPage, LEGAL_PAGES } from '@/components/legal/page';

export default function DisclaimerPage() {
  return <LegalPage page={LEGAL_PAGES.disclaimer} />;
}
