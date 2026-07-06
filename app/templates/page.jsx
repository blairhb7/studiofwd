import '../../styles/home.css';
import '../../styles/templates.css';
import { TemplatesApp } from '@/components/templates/templates-app';

export const metadata = {
  title: 'Templates — Studio/fwd',
  description: 'Production-ready Framer templates for founders, studios and operators.',
};

export default function TemplatesPage() {
  return <TemplatesApp />;
}
