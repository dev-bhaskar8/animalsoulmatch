import { useState, useEffect } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from './styles/theme';
import { Question, AnimalType, animalResults } from './data/questions';
import { getRandomQuestions } from './data/questionBank';
import { ComingSoon } from './components/ComingSoon/ComingSoon';

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
  padding: 2rem;
`;

const ResultTitle = styled(motion.h2)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

const ResultDescription = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ResultDetails = styled(motion.div)`
  margin: 2rem 0;
  padding: 1.5rem;
  background: ${({ theme }) => `${theme.colors.accent}10`};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const DetailSection = styled(motion.div)`
  margin: 1.5rem 0;
  text-align: left;
`;

const DetailTitle = styled.h4`
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const DetailContent = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  line-height: 1.6;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  
  /* Add spacing between words when they're concatenated */
  & > span:not(:last-child)::after {
    content: " • ";
    margin: 0 0.5rem;
  }
`;

const TraitsContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
`;

const Trait = styled(motion.span)`
  background: ${({ theme }) => theme.colors.accent}40;
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 500;
`;

const ShareButton = styled(motion.button)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  padding: 1rem 2rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 2rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const RestartButton = styled(ShareButton)`
  background: ${({ theme }) => theme.colors.secondary};
  margin-left: 1rem;
`;

const AnimalEmoji = styled(motion.div)`
  font-size: 5rem;
  margin: 1rem 0;
`;

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

  useEffect(() => {
    // Get 6 random questions when the component mounts
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
    // Get new random questions for the next round
    setQuizQuestions(getRandomQuestions(6));
  };

  const handleShare = () => {
    if (result) {
      const text = `I found my Animal Soul Match! I'm ${animalResults[result].title} 🌸\n${animalResults[result].description}\nFind your match too!`;
      if (navigator.share) {
        navigator.share({
          title: 'My Animal Soul Match Result',
          text: text,
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(text);
        alert('Result copied to clipboard!');
      }
    }
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
                <AnimalEmoji
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  {getAnimalEmoji(result)}
                </AnimalEmoji>
                <ResultTitle
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {animalResults[result].title}
                </ResultTitle>
                <ResultDescription
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {animalResults[result].description}
                </ResultDescription>
                <ResultDetails
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <DetailSection>
                    <DetailTitle>Core Values</DetailTitle>
                    <DetailContent>
                      {animalResults[result].values.join(' • ')}
                    </DetailContent>
                  </DetailSection>
                  <DetailSection>
                    <DetailTitle>Communication Style</DetailTitle>
                    <DetailContent>
                      {animalResults[result].communication.map((item, index) => (
                        <span key={index}>{item}</span>
                      ))}
                    </DetailContent>
                  </DetailSection>
                  <DetailSection>
                    <DetailTitle>Relationships</DetailTitle>
                    <DetailContent>
                      {animalResults[result].relationships.map((item, index) => (
                        <span key={index}>{item}</span>
                      ))}
                    </DetailContent>
                  </DetailSection>
                </ResultDetails>
                <TraitsContainer>
                  {animalResults[result].traits.map((trait, index) => (
                    <Trait
                      key={trait}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      {trait}
                    </Trait>
                  ))}
                </TraitsContainer>
                <motion.div>
                  <ShareButton
                    onClick={handleShare}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Share Result
                  </ShareButton>
                  <RestartButton
                    onClick={handleRestart}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Take Quiz Again
                  </RestartButton>
                </motion.div>
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
