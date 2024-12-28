import { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from './styles/theme';
import { Question, AnimalType, animalResults } from './data/questions';
import { getRandomQuestions } from './data/questionBank';
import { ComingSoon } from './components/ComingSoon/ComingSoon';
import html2canvas from 'html2canvas';
import { trackPageView, trackQuizStart, trackQuestionAnswer, trackQuizCompletion, trackShare } from './analytics/analytics';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Quicksand:wght@400;500;600&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const QuizContainer = styled.div`
  max-width: 800px;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  padding: 2rem;
  margin-top: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: 2rem;
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 2.5rem;
`;

const QuestionText = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Option = styled.button<{ selected?: boolean }>`
  padding: 1.2rem;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  border: 2px solid ${({ theme }) => `${theme.colors.primary}40`};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1.1rem;
  font-weight: 500;
  width: 100%;
  text-align: left;
  position: relative;
  overflow: hidden;

  @media (hover: hover) {
    &:hover {
      background: ${({ theme }) => `${theme.colors.primary}15`};
      border-color: ${({ theme }) => theme.colors.primary};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px ${({ theme }) => `${theme.colors.primary}20`};
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: ${({ theme }) => theme.colors.secondary}40;
  border-radius: 5px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const Progress = styled.div<{ width: number }>`
  width: ${({ width }) => width}%;
  height: 100%;
  background: ${({ theme }) => theme.colors.secondary};
  transition: width 0.3s ease;
`;

const ResultContainer = styled(motion.div)`
  text-align: center;
  width: 100%;
  padding: 0.5rem;
  margin: 0 auto;
`;

const ShareableResult = styled(motion.div)`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  position: relative;
  color: #000;
  isolation: isolate;

  &:before, &:after {
    content: '🌸';
    position: absolute;
    font-size: 5rem;
    opacity: 0.15;
    z-index: -1;
    pointer-events: none;
  }

  &:before {
    top: 30%;
    left: 15%;
    transform: translateZ(0);
  }

  &:after {
    bottom: 30%;
    right: 15%;
    transform: translateZ(0);
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  @media (min-width: 600px) {
    background: ${({ theme }) => theme.colors.white};
    width: 500px;
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: 0 4px 12px ${({ theme }) => `${theme.colors.primary}20`};
    border: 2px solid ${({ theme }) => `${theme.colors.primary}30`};
    margin: 1rem auto;
  }
`;

const ResultTitle = styled.h2`
  color: inherit;
  font-size: 1.75rem;
  margin: 0;
  font-weight: 600;
  text-align: center;
`;

const ResultDescription = styled.p`
  color: inherit;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  text-align: center;
`;

const SectionTitle = styled.h3`
  color: inherit;
  font-size: 1.2rem;
  margin: 0;
  font-weight: 600;
  text-align: left;
  padding: 0 0.5rem;
`;

const SectionContent = styled.div`
  color: inherit;
  font-size: 0.9rem;
  line-height: 1.4;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.5rem;
  padding: 0 0.5rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0;
  
  @media (max-width: 599px) {
    &:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => `${theme.colors.primary}30`};
    }
  }

  @media (min-width: 600px) {
    border-bottom: 1px solid ${({ theme }) => `${theme.colors.primary}20`};
    &:last-child {
      border-bottom: none;
    }
  }
`;

const SectionItem = styled.span`
  display: inline-block;
  &:not(:last-child)::after {
    content: "•";
    margin: 0 0.25rem;
    opacity: 0.5;
  }
`;

const TraitsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0 0.5rem;
`;

const Trait = styled.span`
  background: ${({ theme }) => `${theme.colors.primary}15`};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
`;

const ShareButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  margin: 0 auto;
  width: 100%;
  
  @media (min-width: 600px) {
    max-width: 500px;
  }

  & > * {
    flex: 1 1 140px;
    max-width: 200px;
  }
`;

const ShareButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  
  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}dd`};
  }
`;

const RestartButton = styled(ShareButton)`
  background: ${({ theme }) => theme.colors.secondary};
  
  &:hover {
    background: ${({ theme }) => `${theme.colors.secondary}dd`};
  }
`;

const AnimalEmoji = styled.span`
  font-size: 3.5rem;
  margin: 0;
  display: block;
  text-align: center;
`;

const ShareMenu = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 1rem;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const ShareOption = styled(motion.button)`
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  border: none;
  background: ${({ theme }) => `${theme.colors.primary}15`};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}25`};
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const menuVariants = {
  hidden: { y: "100%" },
  visible: { y: 0 }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const initialScores: Record<AnimalType, number> = {
  cat: 0,
  rabbit: 0,
  deer: 0,
  fox: 0,
  owl: 0,
  dolphin: 0,
  wolf: 0,
  panda: 0,
  swan: 0,
  hamster: 0,
  bee: 0,
  lion: 0,
  butterfly: 0,
  turtle: 0,
  peacock: 0,
  dragon: 0,
  penguin: 0,
  squirrel: 0,
  flamingo: 0,
  koala: 0
};

const getAnimalEmoji = (animal: AnimalType): string => {
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

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [scores, setScores] = useState<Record<AnimalType, number>>(initialScores);
  const [result, setResult] = useState<AnimalType | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Shuffle array helper function
  const shuffleArray = <T extends any[]>(array: T): T => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray as T;
  };

  useEffect(() => {
    // Track page view when app loads
    trackPageView();
  }, []);

  useEffect(() => {
    // Get random questions and randomize their options
    const questions = getRandomQuestions(6).map(q => ({
      ...q,
      options: shuffleArray([...q.options])
    }));
    setQuizQuestions(questions);
    // Track quiz start
    trackQuizStart();
  }, []);

  const handleAnswer = (option: Question['options'][0]) => {
    // Track answer
    trackQuestionAnswer(quizQuestions[currentQuestion].id, option.text);
    
    const newScores = { ...scores };
    
    // Calculate total score for normalization
    const totalScore = Object.values(option.score).reduce((a, b) => a + b, 0);
    
    // Add normalized scores
    Object.entries(option.score).forEach(([animal, score]) => {
      // Normalize the score relative to other options
      const normalizedScore = score / (totalScore || 1); // Avoid division by zero
      newScores[animal as AnimalType] += normalizedScore;
    });
    
    setScores(newScores);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Add some randomness to tiebreakers
      const maxScore = Math.max(...Object.values(newScores));
      const topScorers = Object.entries(newScores)
        .filter(([_, score]) => Math.abs(score - maxScore) < 0.1); // Allow close scores
      
      // Randomly select from top scorers if there are multiple
      const winner = topScorers[Math.floor(Math.random() * topScorers.length)];
      const resultAnimal = winner[0] as AnimalType;
      setResult(resultAnimal);
      
      // Track quiz completion
      trackQuizCompletion(resultAnimal);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScores(initialScores);
    setResult(null);
    const questions = getRandomQuestions(6).map(q => ({
      ...q,
      options: shuffleArray([...q.options])
    }));
    setQuizQuestions(questions);
    // Track new quiz start
    trackQuizStart();
  };

  const handleSaveAndShare = async () => {
    const element = document.getElementById('shareable-result');
    if (!element) return;

    try {
      // Create a wrapper for Instagram-friendly aspect ratio
      const wrapper = document.createElement('div');
      wrapper.style.width = '1080px';
      wrapper.style.height = '1350px';
      wrapper.style.backgroundColor = theme.colors.white;
      wrapper.style.display = 'flex';
      wrapper.style.flexDirection = 'column';
      wrapper.style.alignItems = 'center';
      wrapper.style.justifyContent = 'space-between';
      wrapper.style.padding = '40px';
      
      // Add URL header
      const header = document.createElement('div');
      header.style.width = '100%';
      header.style.textAlign = 'center';
      header.style.fontFamily = theme.fonts.secondary;
      header.style.fontSize = '36px';
      header.style.color = theme.colors.primary;
      header.style.padding = '20px';
      header.style.borderRadius = '16px';
      header.style.backgroundColor = `${theme.colors.primary}15`;
      header.textContent = window.location.origin;
      wrapper.appendChild(header);
      
      // Clone the element to avoid modifying the original
      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.width = '1000px';
      clone.style.flex = '1';
      clone.style.display = 'flex';
      clone.style.flexDirection = 'column';
      clone.style.justifyContent = 'center';
      clone.style.padding = '40px 20px';

      // Increase text sizes in the clone
      const emoji = clone.querySelector('[class*="AnimalEmoji"]');
      if (emoji) {
        (emoji as HTMLElement).style.fontSize = '320px';  // Much larger size
      }
      
      const title = clone.querySelector('[class*="ResultTitle"]');
      if (title) {
        (title as HTMLElement).style.fontSize = '72px'; 
        (title as HTMLElement).style.margin = '40px 0';
      }
      
      const description = clone.querySelector('[class*="ResultDescription"]');
      if (description) {
        (description as HTMLElement).style.fontSize = '42px'; 
        (description as HTMLElement).style.lineHeight = '1.4';
        (description as HTMLElement).style.margin = '30px 0';
        (description as HTMLElement).style.maxWidth = '90%';
        (description as HTMLElement).style.alignSelf = 'center';
      }
      
      wrapper.appendChild(clone);
      
      // Add flowers only for desktop
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (!isMobile) {
        const flowers = ['🌸', '🌸', '🌸', '🌸'];
        flowers.forEach((flower, index) => {
          const flowerEl = document.createElement('div');
          flowerEl.style.position = 'absolute';
          flowerEl.style.fontSize = '80px';
          flowerEl.style.opacity = '0.15';
          flowerEl.textContent = flower;
          
          switch(index) {
            case 0: // top left
              flowerEl.style.top = '15%';
              flowerEl.style.left = '10%';
              flowerEl.style.transform = 'rotate(-15deg)';
              break;
            case 1: // top right
              flowerEl.style.top = '15%';
              flowerEl.style.right = '10%';
              flowerEl.style.transform = 'rotate(15deg)';
              break;
            case 2: // bottom left
              flowerEl.style.bottom = '15%';
              flowerEl.style.left = '10%';
              flowerEl.style.transform = 'rotate(-15deg)';
              break;
            case 3: // bottom right
              flowerEl.style.bottom = '15%';
              flowerEl.style.right = '10%';
              flowerEl.style.transform = 'rotate(15deg)';
              break;
          }
          clone.appendChild(flowerEl);
        });
      }
      
      // Add footer text
      const footer = document.createElement('div');
      footer.style.fontSize = '28px';
      footer.style.color = theme.colors.primary;
      footer.style.opacity = '0.8';
      footer.style.marginTop = '20px';
      footer.textContent = '✨ Take the quiz to find your animal soul match! ✨';
      wrapper.appendChild(footer);
      
      // Temporarily add to document (hidden), capture, then remove
      wrapper.style.position = 'absolute';
      wrapper.style.left = '-9999px';
      document.body.appendChild(wrapper);

      const canvas = await html2canvas(wrapper, {
        backgroundColor: theme.colors.white,
        scale: 1,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      // Clean up
      document.body.removeChild(wrapper);

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob!);
        }, 'image/png', 1.0);
      });

      // Check if it's a mobile device
      if (isMobile && navigator.share) {
        // Mobile sharing
        try {
          const file = new File([blob], 'animal-soul-match.png', { type: 'image/png' });
          await navigator.share({
            files: [file],
            title: '🌸 My Animal Soul Match 🌸',
            text: `I found my Animal Soul Match! Take the quiz to find yours!\n${window.location.origin}`
          });
        } catch (shareError) {
          // Fallback to URL method
          const url = URL.createObjectURL(blob);
          window.open(url, '_blank');
          setTimeout(() => URL.revokeObjectURL(url), 60000);
        }
      } else {
        // Desktop sharing - open in new tab
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 60000);
      }
      
      setShowShareMenu(false);
      trackShare('image');
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  const handleTextShare = () => {
    if (result) {
      const animalEmoji = getAnimalEmoji(result);
      const text = `I found my Animal Soul Match! I'm ${animalResults[result].title} ${animalEmoji}\n${animalResults[result].description}\nFind your match too!`;
      
      if (navigator.share) {
        navigator.share({
          title: '🌸 My Animal Soul Match Result 🌸',
          text: text,
          url: window.location.href,
        }).catch(err => {
          console.log('Error sharing:', err);
          navigator.clipboard.writeText(text);
        });
      } else {
        navigator.clipboard.writeText(text);
      }
      setShowShareMenu(false);
      // Track text share
      trackShare('text');
    }
  };

  const handleShareMenuClick = () => {
    setShowShareMenu(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Title as={motion.h1} 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          🌸 Animal Soul Match: Who Are You? 🌸
        </Title>
        <QuizContainer as={motion.div}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {result ? (
              <ResultContainer
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <ShareableResult id="shareable-result">
                  <AnimalEmoji>
                    {getAnimalEmoji(result)}
                  </AnimalEmoji>
                  <ResultTitle>
                    {animalResults[result].title}
                  </ResultTitle>
                  <ResultDescription>
                    {animalResults[result].description}
                  </ResultDescription>
                  
                  <Section>
                    <SectionTitle>Core Values</SectionTitle>
                    <SectionContent>
                      {animalResults[result].values.map((value, index) => (
                        <SectionItem key={index}>{value}</SectionItem>
                      ))}
                    </SectionContent>
                  </Section>

                  <Section>
                    <SectionTitle>Communication Style</SectionTitle>
                    <SectionContent>
                      {animalResults[result].communication.map((style, index) => (
                        <SectionItem key={index}>{style}</SectionItem>
                      ))}
                    </SectionContent>
                  </Section>

                  <Section>
                    <SectionTitle>Relationships</SectionTitle>
                    <SectionContent>
                      {animalResults[result].relationships.map((rel, index) => (
                        <SectionItem key={index}>{rel}</SectionItem>
                      ))}
                    </SectionContent>
                  </Section>

                  <TraitsContainer>
                    {animalResults[result].traits.map((trait) => (
                      <Trait key={trait}>{trait}</Trait>
                    ))}
                  </TraitsContainer>
                </ShareableResult>
                <ShareButtonsContainer>
                  <ShareButton
                    onClick={handleShareMenuClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Share to Social Media
                  </ShareButton>
                  <RestartButton
                    onClick={handleRestart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Take Quiz Again
                  </RestartButton>
                </ShareButtonsContainer>

                {showShareMenu && (
                  <>
                    <Overlay
                      variants={overlayVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      onClick={() => setShowShareMenu(false)}
                    />
                    <ShareMenu
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <ShareOption onClick={handleSaveAndShare}>
                        🖼️ Share as image
                      </ShareOption>
                      <ShareOption onClick={handleTextShare}>
                        📝 Share your result
                      </ShareOption>
                      <ShareOption onClick={() => setShowShareMenu(false)}>
                        ❌ Cancel
                      </ShareOption>
                    </ShareMenu>
                  </>
                )}
              </ResultContainer>
            ) : quizQuestions.length > 0 ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <ProgressBar>
                  <Progress width={(currentQuestion / quizQuestions.length) * 100} />
                </ProgressBar>
                <QuestionText>{quizQuestions[currentQuestion].text}</QuestionText>
                <OptionsGrid>
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <Option
                      as={motion.button}
                      key={option.id}
                      onClick={() => handleAnswer(option)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {option.text}
                    </Option>
                  ))}
                </OptionsGrid>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Loading questions...
              </motion.div>
            )}
          </AnimatePresence>
        </QuizContainer>
        <ComingSoon />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
