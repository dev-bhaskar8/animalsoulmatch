import { Question, AnimalType } from './questions';

// Helper function to calculate total score for each animal type
export const calculateAnimalScores = (answers: { questionId: number; optionId: string }[], questions: Question[]): Record<AnimalType, number> => {
  const scores: Record<AnimalType, number> = {
    cat: 0, rabbit: 0, deer: 0, fox: 0, owl: 0,
    dolphin: 0, wolf: 0, panda: 0, swan: 0, hamster: 0,
    bee: 0, lion: 0, butterfly: 0, turtle: 0, peacock: 0,
    dragon: 0, penguin: 0, squirrel: 0, flamingo: 0, koala: 0
  };

  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;

    const option = question.options.find(opt => opt.id === answer.optionId);
    if (!option) return;

    // Add the scores for each animal type
    Object.entries(option.score).forEach(([animal, score]) => {
      scores[animal as AnimalType] += score;
    });
  });

  return scores;
};

// Helper function to determine the dominant animal type
export const getDominantAnimal = (scores: Record<AnimalType, number>): AnimalType => {
  let maxScore = -1;
  let dominantAnimal: AnimalType = 'cat'; // default

  Object.entries(scores).forEach(([animal, score]) => {
    if (score > maxScore) {
      maxScore = score;
      dominantAnimal = animal as AnimalType;
    }
  });

  return dominantAnimal;
};

// Helper function to get secondary animal types (for mixed personalities)
export const getSecondaryAnimals = (scores: Record<AnimalType, number>, count: number = 2): AnimalType[] => {
  const sortedAnimals = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([animal]) => animal as AnimalType);

  return sortedAnimals.slice(1, count + 1);
};

// Helper function to validate answer format
export const validateAnswer = (answer: { questionId: number; optionId: string }, questions: Question[]): boolean => {
  const question = questions.find(q => q.id === answer.questionId);
  if (!question) return false;

  return question.options.some(opt => opt.id === answer.optionId);
};

// Helper function to get percentage match for each animal type
export const getAnimalMatchPercentages = (scores: Record<AnimalType, number>): Record<AnimalType, number> => {
  const maxPossibleScore = 18; // Max score per question is 3 and we have 6 questions
  const percentages: Record<AnimalType, number> = {} as Record<AnimalType, number>;

  Object.entries(scores).forEach(([animal, score]) => {
    percentages[animal as AnimalType] = Math.round((score / maxPossibleScore) * 100);
  });

  return percentages;
};

// Helper function to get personality traits based on top animals
export const getPersonalityTraits = (dominantAnimal: AnimalType, secondaryAnimals: AnimalType[]): string[] => {
  const traits = new Set<string>();
  
  // Add traits from dominant animal
  traits.add(`Primary: ${dominantAnimal} personality`);
  
  // Add traits from secondary animals
  secondaryAnimals.forEach((animal, index) => {
    traits.add(`Secondary ${index + 1}: ${animal} influence`);
  });

  return Array.from(traits);
}; 