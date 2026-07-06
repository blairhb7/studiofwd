// quiz.css must load before quiz-layouts.css so the sidebar grid wins.
import '../../styles/quiz.css';
import '../../styles/quiz-layouts.css';
import { ClientQuiz } from '@/components/quiz/layouts';

export const metadata = {
  title: 'Client Quiz — Studio/fwd',
  description: 'A short project-intake quiz: goals, scope, timeline and budget.',
};

export default function QuizPage() {
  return (
    <div style={{ height: '100vh' }}>
      <ClientQuiz />
    </div>
  );
}
