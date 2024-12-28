import { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from './styles/theme';
import { Question, AnimalType, animalResults } from './data/questions';
import { getRandomQuestions } from './data/questionBank';
import { ComingSoon } from './components/ComingSoon/ComingSoon';
import html2canvas from 'html2canvas';

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

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}15`};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => `${theme.colors.primary}20`};
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
    top: 25%;
    left: 15%;
    transform: translateZ(0);
  }

  &:after {
    bottom: 25%;
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
  color: #000;
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

const AnimalEmoji = styled.span`
  font-size: 3.5rem;
  margin: 0;
  display: block;
  text-align: center;
`;

const RestartButton = styled(ShareButton)`
  background: ${({ theme }) => theme.colors.secondary};
  
  &:hover {
    background: ${({ theme }) => `${theme.colors.secondary}dd`};
  }
`;

const ImageShareButton = styled(ShareButton)`
  background: #FFB7C5;
  
  &:hover {
    background: #FFB7C5dd;
  }
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

  useEffect(() => {
    setQuizQuestions(getRandomQuestions(6));
  }, []);

  const handleAnswer = (option: Question['options'][0]) => {
    const newScores = { ...scores };
    Object.entries(option.score).forEach(([animal, score]) => {
      newScores[animal as AnimalType] += score;
    });
    setScores(newScores);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const result = Object.entries(newScores).reduce((a, b) => 
        a[1] > b[1] ? a : b
      )[0] as AnimalType;
      setResult(result);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScores(initialScores);
    setResult(null);
    setQuizQuestions(getRandomQuestions(6));
  };

  const handleSaveAndShare = async () => {
    const element = document.getElementById('shareable-result');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: theme.colors.white,
        scale: 3,
        useCORS: true,
        allowTaint: true,
      });

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob!);
        }, 'image/png', 1.0);
      });

      const url = URL.createObjectURL(blob);
      
      window.open(url, '_blank');
      
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      
      setShowShareMenu(false);
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
