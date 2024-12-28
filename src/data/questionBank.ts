import { Question } from './questions';
import { questions as updatedQuestions } from './updatedQuestions';

// Helper function to get random questions
export const getRandomQuestions = (count: number): Question[] => {
  const allQuestions = [...updatedQuestions];
  const selected: Question[] = [];
  
  while (selected.length < count && allQuestions.length > 0) {
    const randomIndex = Math.floor(Math.random() * allQuestions.length);
    selected.push(allQuestions[randomIndex]);
    allQuestions.splice(randomIndex, 1);
  }
  
  return selected;
}; 