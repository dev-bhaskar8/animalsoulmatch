# 🌸 Animal Soul Match

A delightful personality quiz that matches you with your spirit animal based on your choices and personality traits. Built with React, TypeScript, and Framer Motion for smooth animations.

## ✨ Features

- **Personality Assessment**: Answer thoughtfully crafted questions to discover your animal match
- **20 Unique Animals**: Each with distinct personality traits, communication styles, and relationship patterns
- **Beautiful Animations**: Smooth transitions and engaging interactions using Framer Motion
- **Responsive Design**: Works perfectly on both desktop and mobile devices
- **Share Results**: Easily share your animal match on social media or copy to clipboard
- **Accessibility**: Keyboard navigation and screen reader friendly

## 🦊 Available Animal Matches

Find out if you're a:
- 🐱 Cat - The Independent Spirit
- 🐰 Rabbit - The Social Butterfly
- 🦌 Deer - The Gentle Soul
- 🦊 Fox - The Clever Innovator
- 🦉 Owl - The Wise Observer
- 🐬 Dolphin - The Playful Guide
- 🐺 Wolf - The Loyal Leader
- 🐼 Panda - The Peaceful Soul
- 🦢 Swan - The Graceful Artist
- 🐹 Hamster - The Energetic Friend
- 🐝 Bee - The Productive Organizer
- 🦁 Lion - The Confident Leader
- 🦋 Butterfly - The Free Spirit
- 🐢 Turtle - The Wise Sage
- 🦚 Peacock - The Expressive Artist
- 🐲 Dragon - The Mystical Visionary
- 🐧 Penguin - The Social Harmonizer
- 🐿️ Squirrel - The Prepared Planner
- 🦩 Flamingo - The Elegant Socialite
- 🐨 Koala - The Relaxed Dreamer

## 🛠 Quiz Mechanics & Scoring System

### Scoring Structure
- Each quiz session presents 6 randomly selected questions
- Every question has 4 options
- Each option assigns scores (0-3) to all 20 animals
- Maximum possible score per question: 3 points
- Total possible score range per animal: 0-18 points (6 questions)

### Animal Appearance Likelihood
Animals are designed with different likelihood of appearing as results, based on trait distinctiveness:

High Probability:
1. Cat (Independent traits)
2. Owl (Intellectual traits)
3. Rabbit (Social traits)
4. Lion (Leadership traits)
5. Fox (Strategic traits)

Medium Probability:
6. Dolphin
7. Dragon
8. Wolf
9. Butterfly
10. Peacock
11. Penguin
12. Bee
13. Squirrel

Lower Probability:
14. Deer
15. Swan
16. Flamingo
17. Panda
18. Turtle
19. Hamster
20. Koala

### Scoring Mechanics
- No animal can be completely missed in a quiz session
- Every option provides at least some points to multiple animals
- Questions are designed with balanced scoring
- Results capture personality nuances rather than binary traits
- Similar animals (e.g., Cat & Owl, Rabbit & Dolphin) often have correlated scores

### Design Features
- Questions cover diverse scenarios and traits
- Scoring system ensures inclusive personality matching
- Each animal has unique high-scoring scenarios
- Results consider trait combinations rather than individual characteristics

## 🛠 Detailed Quiz Analysis

### Question Categories
- **Lifestyle**: Daily activities and preferences
- **Environmental**: Weather and location preferences
- **Social**: Group vs. individual interactions
- **Decision-Making**: Problem-solving approaches
- **Self-Perception**: Personal qualities and traits
- **Values**: Core priorities and preferences

### Trait Correlations
- **Independence-Social Spectrum**: Cat/Owl ↔ Rabbit/Dolphin
- **Active-Passive Spectrum**: Hamster/Bee ↔ Koala/Panda
- **Analytical-Intuitive**: Owl/Turtle ↔ Fox/Butterfly
- **Creative-Practical**: Peacock/Dragon ↔ Squirrel/Bee
- **Leadership-Support**: Lion/Wolf ↔ Deer/Swan

### Score Distribution Patterns
- **High Contrast**: Questions with clear 3-0 scoring splits
- **Balanced**: Questions with 2-1 distributions
- **Neutral**: Questions with even 1-1-1-1 patterns
- **Complementary**: Animals with correlated high scores

### Question Impact Levels
- **High Impact**: Clear personality differentiators
- **Balanced**: Subtle trait indicators
- **Decisive**: Key personality determinants
- **Neutral**: General preference indicators

### Personality Dimensions
- **Social Energy**: Introversion ↔ Extroversion
- **Problem Solving**: Analytical ↔ Creative
- **Group Role**: Leadership ↔ Support
- **Activity Level**: Active ↔ Contemplative
- **Approach**: Traditional ↔ Unconventional

## 🛠️ Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Styled Components
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Deployment**: Cloudflare Pages

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/animal-soul-match.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 🎨 Customization

The quiz is highly customizable:
- Add new questions in `src/data/questionBank.ts`
- Modify animal personalities in `src/data/questions.ts`
- Adjust styling themes in `src/styles/theme.ts`

## 📱 Mobile App

A mobile app version is coming soon! Look for the phone icon in the bottom right corner of the web app for updates.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new questions
- Improve animations
- Enhance accessibility
- Fix bugs
- Add new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🌟 Credits

Created with ❤️ by [Your Name]
