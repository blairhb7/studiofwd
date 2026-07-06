import '../../styles/finder.css';
import { TemplateFinder } from '@/components/finder/app';

export const metadata = {
  title: 'Template Finder — Studio/fwd',
  description: 'A 6-question quiz that matches you to the best-fit Framer template.',
};

export default function TemplateFinderPage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <TemplateFinder />
    </div>
  );
}
