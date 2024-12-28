import { Question, AnimalType } from '../data/questions';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const validateQuestions = (questions: Question[]): ValidationResult => {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  };

  // Check for duplicate IDs
  const ids = new Set<number>();
  questions.forEach(q => {
    if (ids.has(q.id)) {
      result.errors.push(`Duplicate question ID found: ${q.id}`);
      result.isValid = false;
    }
    ids.add(q.id);
  });

  // Check for duplicate option IDs within each question
  questions.forEach(q => {
    const optionIds = new Set<string>();
    q.options.forEach(opt => {
      if (optionIds.has(opt.id)) {
        result.errors.push(`Duplicate option ID found in question ${q.id}: ${opt.id}`);
        result.isValid = false;
      }
      optionIds.add(opt.id);
    });
  });

  // Check score distributions
  questions.forEach(q => {
    // Each question should have exactly 4 options
    if (q.options.length !== 4) {
      result.errors.push(`Question ${q.id} has ${q.options.length} options, expected 4`);
      result.isValid = false;
    }

    // Check if all animal types are scored
    q.options.forEach(opt => {
      const scoredAnimals = Object.keys(opt.score);
      const allAnimalTypes: AnimalType[] = [
        'cat', 'rabbit', 'deer', 'fox', 'owl', 'dolphin', 'wolf', 'panda', 'swan',
        'hamster', 'bee', 'lion', 'butterfly', 'turtle', 'peacock', 'dragon',
        'penguin', 'squirrel', 'flamingo', 'koala'
      ];

      allAnimalTypes.forEach(animal => {
        if (!scoredAnimals.includes(animal)) {
          result.errors.push(`Missing score for ${animal} in question ${q.id}, option ${opt.id}`);
          result.isValid = false;
        }
      });

      // Check score values are between 0 and 3
      Object.entries(opt.score).forEach(([animal, score]) => {
        if (score < 0 || score > 3) {
          result.errors.push(`Invalid score value ${score} for ${animal} in question ${q.id}, option ${opt.id}`);
          result.isValid = false;
        }
      });
    });

    // Check if scores are balanced across options
    const totalScores: Record<AnimalType, number> = {} as Record<AnimalType, number>;
    q.options.forEach(opt => {
      Object.entries(opt.score).forEach(([animal, score]) => {
        totalScores[animal as AnimalType] = (totalScores[animal as AnimalType] || 0) + score;
      });
    });

    // Check if any animal type is overly favored or neglected
    Object.entries(totalScores).forEach(([animal, total]) => {
      if (total > 8) {
        result.warnings.push(`High total score (${total}) for ${animal} in question ${q.id}`);
      }
      if (total < 2) {
        result.warnings.push(`Low total score (${total}) for ${animal} in question ${q.id}`);
      }
    });
  });

  return result;
}; 