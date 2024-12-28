import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const IconContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 1000;
  font-size: 2rem;
  background: ${({ theme }) => theme.colors.white};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.boxShadow};
  
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const NotificationContainer = styled(motion.div)`
  position: fixed;
  bottom: 80px;
  right: 20px;
  background: ${({ theme }) => theme.colors.white};
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
  max-width: 300px;
  z-index: 1000;
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

export function ComingSoon() {
  const [isHovered, setIsHovered] = useState(false);
  const [hasSeenMessage, setHasSeenMessage] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHasSeenMessage(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsHovered(true);
      setHasSeenMessage(true);
    }
  };

  return (
    <>
      <IconContainer
        role="button"
        tabIndex={0}
        aria-label="Show mobile app notification"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyPress}
        animate={{
          x: hasSeenMessage ? 0 : [-1, 1, -1, 1, -1],
          rotate: hasSeenMessage ? 0 : [-1, 1, -1, 1, -1],
          transition: {
            duration: 0.15,
            repeat: hasSeenMessage ? 0 : Infinity,
            repeatType: "loop",
            ease: "linear"
          }
        }}
        whileHover={{ 
          scale: 1.1,
          rotate: 0,
          x: 0
        }}
      >
        📱
      </IconContainer>

      <AnimatePresence>
        {isHovered && (
          <NotificationContainer
            role="dialog"
            aria-labelledby="notification-title"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Title id="notification-title">Mobile App Coming Soon!</Title>
            <Description>
              Take the quiz on the go! Our mobile app is in development.
            </Description>
          </NotificationContainer>
        )}
      </AnimatePresence>
    </>
  );
}