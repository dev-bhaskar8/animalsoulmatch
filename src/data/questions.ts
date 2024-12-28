export type AnimalType = 'cat' | 'rabbit' | 'deer' | 'fox' | 'owl' | 'dolphin' | 'wolf' | 'panda' | 'swan' | 'hamster' | 'bee' | 'lion' | 'butterfly' | 'turtle' | 'peacock' | 'dragon' | 'penguin' | 'squirrel' | 'flamingo' | 'koala';

export interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
    score: Record<AnimalType, number>;
  }[];
}

export interface AnimalResult {
  title: string;
  description: string;
  traits: string[];
  values: string[];
  communication: string[];
  relationships: string[];
}

export const animalResults: Record<AnimalType, AnimalResult> = {
  cat: {
    title: "The Independent Spirit",
    description: "Like a cat, you value your independence and personal space. You're graceful, self-reliant, and comfortable in your own company.",
    traits: ["Independent", "Graceful", "Observant", "Self-assured"],
    values: ["Personal space", "Comfort", "Self-reliance", "Quiet moments"],
    communication: ["Direct", "Selective", "Clear boundaries", "Thoughtful responses"],
    relationships: ["Values quality over quantity", "Needs personal space", "Loyal to chosen few", "Independent yet affectionate"]
  },
  rabbit: {
    title: "The Social Butterfly",
    description: "Like a rabbit, you're social, gentle, and bring joy to those around you. You thrive in community and have a natural charm.",
    traits: ["Friendly", "Gentle", "Social", "Adaptable"],
    values: ["Community", "Harmony", "Connection", "Peace"],
    communication: ["Warm", "Inclusive", "Diplomatic", "Encouraging"],
    relationships: ["Nurturing", "Community-oriented", "Supportive", "Harmonious"]
  },
  deer: {
    title: "The Gentle Soul",
    description: "Like a deer, you're graceful, sensitive, and in tune with your surroundings. You move through life with elegance and awareness.",
    traits: ["Graceful", "Alert", "Sensitive", "Peaceful"],
    values: ["Harmony", "Nature", "Gentleness", "Awareness"],
    communication: ["Gentle", "Thoughtful", "Careful", "Considerate"],
    relationships: ["Caring", "Protective", "Intuitive", "Loyal"]
  },
  fox: {
    title: "The Clever Innovator",
    description: "Like a fox, you're clever, adaptable, and resourceful. You find creative solutions and think outside the box.",
    traits: ["Clever", "Adaptable", "Quick-thinking", "Creative"],
    values: ["Innovation", "Resourcefulness", "Adaptability", "Intelligence"],
    communication: ["Strategic", "Witty", "Persuasive", "Charming"],
    relationships: ["Dynamic", "Engaging", "Independent", "Adventurous"]
  },
  owl: {
    title: "The Wise Observer",
    description: "Like an owl, you're wise, observant, and thoughtful. You see what others miss and offer deep insights.",
    traits: ["Wise", "Observant", "Patient", "Analytical"],
    values: ["Knowledge", "Wisdom", "Understanding", "Truth"],
    communication: ["Thoughtful", "Precise", "Insightful", "Measured"],
    relationships: ["Deep connections", "Intellectual bonds", "Meaningful exchanges", "Loyal friendships"]
  },
  dolphin: {
    title: "The Playful Explorer",
    description: "Like a dolphin, you're playful, intelligent, and social. You bring joy and energy to every situation.",
    traits: ["Playful", "Intelligent", "Social", "Energetic"],
    values: ["Joy", "Connection", "Adventure", "Learning"],
    communication: ["Enthusiastic", "Engaging", "Expressive", "Friendly"],
    relationships: ["Collaborative", "Supportive", "Energetic", "Fun-loving"]
  },
  wolf: {
    title: "The Loyal Leader",
    description: "Like a wolf, you're loyal, strategic, and protective of your pack. You're a natural leader who values strong bonds.",
    traits: ["Loyal", "Strategic", "Protective", "Strong"],
    values: ["Loyalty", "Family", "Strength", "Unity"],
    communication: ["Direct", "Honest", "Protective", "Clear"],
    relationships: ["Deep bonds", "Pack mentality", "Protective", "Loyal"]
  },
  panda: {
    title: "The Peaceful Dreamer",
    description: "Like a panda, you're easy-going, gentle, and bring calm to those around you. You enjoy life's simple pleasures.",
    traits: ["Peaceful", "Gentle", "Easy-going", "Content"],
    values: ["Peace", "Simplicity", "Contentment", "Balance"],
    communication: ["Calm", "Gentle", "Soothing", "Kind"],
    relationships: ["Peaceful", "Steady", "Reliable", "Comforting"]
  },
  swan: {
    title: "The Elegant Artist",
    description: "Like a swan, you're elegant, graceful, and have a natural artistic flair. You bring beauty to everything you do.",
    traits: ["Elegant", "Artistic", "Graceful", "Refined"],
    values: ["Beauty", "Grace", "Expression", "Refinement"],
    communication: ["Elegant", "Articulate", "Refined", "Thoughtful"],
    relationships: ["Devoted", "Graceful", "Romantic", "Loyal"]
  },
  hamster: {
    title: "The Energetic Enthusiast",
    description: "Like a hamster, you're energetic, enthusiastic, and always ready for action. You bring excitement to everyday life.",
    traits: ["Energetic", "Enthusiastic", "Resourceful", "Adaptable"],
    values: ["Fun", "Activity", "Adventure", "Energy"],
    communication: ["Lively", "Enthusiastic", "Quick", "Engaging"],
    relationships: ["Active", "Fun-loving", "Energetic", "Social"]
  },
  bee: {
    title: "The Productive Collaborator",
    description: "Like a bee, you're hardworking, collaborative, and contribute to the greater good. You thrive in organized environments.",
    traits: ["Productive", "Organized", "Collaborative", "Dedicated"],
    values: ["Productivity", "Community", "Organization", "Purpose"],
    communication: ["Efficient", "Clear", "Cooperative", "Purposeful"],
    relationships: ["Collaborative", "Supportive", "Team-oriented", "Reliable"]
  },
  lion: {
    title: "The Natural Leader",
    description: "Like a lion, you're confident, strong, and naturally take charge. You inspire and protect those around you.",
    traits: ["Confident", "Strong", "Leadership", "Protective"],
    values: ["Leadership", "Strength", "Courage", "Protection"],
    communication: ["Authoritative", "Clear", "Inspiring", "Direct"],
    relationships: ["Protective", "Leading", "Loyal", "Strong"]
  },
  butterfly: {
    title: "The Free Spirit",
    description: "Like a butterfly, you're free-spirited, transformative, and bring beauty wherever you go. You inspire change and growth.",
    traits: ["Free-spirited", "Creative", "Transformative", "Inspiring"],
    values: ["Freedom", "Beauty", "Change", "Growth"],
    communication: ["Inspiring", "Creative", "Light", "Uplifting"],
    relationships: ["Free-spirited", "Inspiring", "Transformative", "Uplifting"]
  },
  turtle: {
    title: "The Wise Sage",
    description: "Like a turtle, you're wise, patient, and steady. You take life at your own pace and offer deep wisdom.",
    traits: ["Wise", "Patient", "Steady", "Enduring"],
    values: ["Wisdom", "Patience", "Stability", "Longevity"],
    communication: ["Patient", "Thoughtful", "Wise", "Measured"],
    relationships: ["Steady", "Reliable", "Deep", "Long-lasting"]
  },
  peacock: {
    title: "The Creative Performer",
    description: "Like a peacock, you're creative, expressive, and naturally stand out. You bring color and beauty to life.",
    traits: ["Creative", "Expressive", "Confident", "Unique"],
    values: ["Beauty", "Expression", "Creativity", "Uniqueness"],
    communication: ["Expressive", "Colorful", "Confident", "Artistic"],
    relationships: ["Expressive", "Creative", "Inspiring", "Unique"]
  },
  dragon: {
    title: "The Mystical Visionary",
    description: "Like a dragon, you're powerful, mysterious, and have a unique perspective. You inspire awe and wonder.",
    traits: ["Powerful", "Mysterious", "Visionary", "Unique"],
    values: ["Power", "Mystery", "Vision", "Uniqueness"],
    communication: ["Powerful", "Mysterious", "Inspiring", "Profound"],
    relationships: ["Deep", "Mysterious", "Powerful", "Transformative"]
  },
  penguin: {
    title: "The Social Coordinator",
    description: "Like a penguin, you're social, organized, and thrive in community. You bring people together with grace.",
    traits: ["Social", "Organized", "Adaptable", "Resilient"],
    values: ["Community", "Organization", "Adaptability", "Unity"],
    communication: ["Social", "Organized", "Clear", "Inclusive"],
    relationships: ["Community-oriented", "Organized", "Supportive", "Loyal"]
  },
  squirrel: {
    title: "The Resourceful Planner",
    description: "Like a squirrel, you're resourceful, prepared, and always thinking ahead. You make the most of every opportunity.",
    traits: ["Resourceful", "Prepared", "Quick", "Strategic"],
    values: ["Preparation", "Resources", "Efficiency", "Planning"],
    communication: ["Quick", "Practical", "Efficient", "Strategic"],
    relationships: ["Practical", "Resourceful", "Supportive", "Prepared"]
  },
  flamingo: {
    title: "The Graceful Performer",
    description: "Like a flamingo, you're graceful, unique, and naturally eye-catching. You bring style and flair to everything you do.",
    traits: ["Graceful", "Unique", "Stylish", "Social"],
    values: ["Grace", "Style", "Uniqueness", "Balance"],
    communication: ["Graceful", "Stylish", "Expressive", "Social"],
    relationships: ["Graceful", "Social", "Stylish", "Unique"]
  },
  koala: {
    title: "The Relaxed Philosopher",
    description: "Like a koala, you're relaxed, contemplative, and bring calm wisdom to those around you. You appreciate life's peaceful moments.",
    traits: ["Relaxed", "Wise", "Peaceful", "Content"],
    values: ["Peace", "Wisdom", "Contentment", "Simplicity"],
    communication: ["Calm", "Thoughtful", "Peaceful", "Wise"],
    relationships: ["Peaceful", "Steady", "Wise", "Calming"]
  }
};

export const getAnimalEmoji = (animal: AnimalType): string => {
  const emojiMap: Record<AnimalType, string> = {
    cat: '🐱',
    rabbit: '🐰',
    deer: '🦌',
    fox: '🦊',
    owl: '🦉',
    dolphin: '🐬',
    wolf: '🐺',
    panda: '🐼',
    swan: '🦢',
    hamster: '🐹',
    bee: '🐝',
    lion: '🦁',
    butterfly: '🦋',
    turtle: '🐢',
    peacock: '🦚',
    dragon: '🐲',
    penguin: '🐧',
    squirrel: '🐿️',
    flamingo: '🦩',
    koala: '🐨'
  };
  return emojiMap[animal];
}; 