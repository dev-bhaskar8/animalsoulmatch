import ReactGA from 'react-ga4';
import { AnimalType } from '../data/questions';

// Initialize GA4
ReactGA.initialize('G-3H0F5SS8ES');

// Track page views
export const trackPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

// Track quiz start
export const trackQuizStart = () => {
  ReactGA.event({
    category: 'Quiz',
    action: 'Start',
  });
};

// Track question answer
export const trackQuestionAnswer = (questionId: number, selectedOption: string) => {
  ReactGA.event({
    category: 'Quiz',
    action: 'Answer',
    label: `Q${questionId}: ${selectedOption}`,
  });
};

// Track quiz completion
export const trackQuizCompletion = (result: AnimalType) => {
  ReactGA.event({
    category: 'Quiz',
    action: 'Complete',
    label: result,
  });
};

// Track share actions
export const trackShare = (method: 'image' | 'text') => {
  ReactGA.event({
    category: 'Share',
    action: method === 'image' ? 'Share Image' : 'Share Text',
  });
};
