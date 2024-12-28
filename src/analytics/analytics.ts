import ReactGA from 'react-ga4';
import { AnimalType } from '../data/questions';

// Initialize GA4
ReactGA.initialize('G-3H0F5SS8ES');

// Track page views
export const trackPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

// Track quiz start with source info
export const trackQuizStart = () => {
  ReactGA.event('quiz_start', {
    category: 'engagement',
    source: document.referrer || 'direct'
  });
};

// Track question answer with more details
export const trackQuestionAnswer = (questionId: number, selectedOption: string) => {
  ReactGA.event('question_answer', {
    category: 'engagement',
    question_id: questionId,
    selected_option: selectedOption,
    question_number: questionId + 1
  });
};

// Track quiz completion with more metrics
export const trackQuizCompletion = (result: AnimalType) => {
  ReactGA.event('quiz_completion', {
    animal_result: result,
    category: 'engagement',
    event_label: result,
    completion_time: Math.floor((Date.now() - window.performance.timing.navigationStart) / 1000)
  });
};

// Track share actions with platform info
export const trackShare = (method: 'image' | 'text') => {
  ReactGA.event('share', {
    category: 'engagement',
    share_method: method,
    platform: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
  });
};

// Track retakes
export const trackRetake = () => {
  ReactGA.event('quiz_retake', {
    category: 'engagement'
  });
};

// Track time spent on result page
export const trackResultView = (timeSpentSeconds: number) => {
  ReactGA.event('result_view', {
    category: 'engagement',
    time_spent: timeSpentSeconds
  });
};

// Track button clicks
export const trackButtonClick = (buttonName: string) => {
  ReactGA.event('button_click', {
    category: 'engagement',
    button_name: buttonName
  });
};
