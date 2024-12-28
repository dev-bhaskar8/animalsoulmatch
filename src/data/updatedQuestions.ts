import { Question } from './questions';

export const questions: Question[] = [
  {
    id: 1,
    text: "How do you prefer to spend your weekend?",
    options: [
      {
        id: "1a",
        text: "Curled up with a good book",
        score: {
          cat: 3, rabbit: 1, deer: 1, fox: 0, owl: 2, dolphin: 0,
          wolf: 1, panda: 2, swan: 1, hamster: 0, bee: 1, lion: 0,
          butterfly: 1, turtle: 2, peacock: 0, dragon: 1, penguin: 1,
          squirrel: 1, flamingo: 0, koala: 2
        }
      },
      {
        id: "1b",
        text: "Going on nature walks",
        score: {
          cat: 0, rabbit: 2, deer: 3, fox: 1, owl: 1, dolphin: 1,
          wolf: 2, panda: 2, swan: 2, hamster: 1, bee: 1, lion: 1,
          butterfly: 2, turtle: 1, peacock: 1, dragon: 1, penguin: 1,
          squirrel: 2, flamingo: 2, koala: 2
        }
      },
      {
        id: "1c",
        text: "Hanging out with friends",
        score: {
          cat: 1, rabbit: 3, deer: 2, fox: 2, owl: 0, dolphin: 3,
          wolf: 2, panda: 1, swan: 1, hamster: 3, bee: 2, lion: 2,
          butterfly: 2, turtle: 0, peacock: 2, dragon: 1, penguin: 3,
          squirrel: 2, flamingo: 2, koala: 1
        }
      },
      {
        id: "1d",
        text: "Learning something new",
        score: {
          cat: 1, rabbit: 0, deer: 1, fox: 2, owl: 3, dolphin: 2,
          wolf: 1, panda: 1, swan: 1, hamster: 2, bee: 3, lion: 1,
          butterfly: 2, turtle: 2, peacock: 1, dragon: 2, penguin: 1,
          squirrel: 2, flamingo: 1, koala: 2
        }
      }
    ]
  },
  {
    id: 2,
    text: "What's your ideal weather?",
    options: [
      {
        id: "2a",
        text: "Warm and sunny",
        score: {
          cat: 2, rabbit: 3, deer: 2, fox: 1, owl: 0, dolphin: 3,
          wolf: 1, panda: 1, swan: 2, hamster: 3, bee: 3, lion: 3,
          butterfly: 3, turtle: 1, peacock: 3, dragon: 2, penguin: 0,
          squirrel: 2, flamingo: 3, koala: 1
        }
      },
      {
        id: "2b",
        text: "Cool and rainy",
        score: {
          cat: 3, rabbit: 0, deer: 1, fox: 1, owl: 2, dolphin: 1,
          wolf: 2, panda: 2, swan: 1, hamster: 0, bee: 0, lion: 0,
          butterfly: 0, turtle: 2, peacock: 0, dragon: 1, penguin: 1,
          squirrel: 1, flamingo: 0, koala: 3
        }
      },
      {
        id: "2c",
        text: "Crisp autumn day",
        score: {
          cat: 1, rabbit: 2, deer: 3, fox: 2, owl: 1, dolphin: 1,
          wolf: 2, panda: 2, swan: 2, hamster: 2, bee: 2, lion: 2,
          butterfly: 2, turtle: 2, peacock: 2, dragon: 2, penguin: 2,
          squirrel: 3, flamingo: 2, koala: 2
        }
      },
      {
        id: "2d",
        text: "Quiet winter night",
        score: {
          cat: 1, rabbit: 1, deer: 0, fox: 2, owl: 3, dolphin: 0,
          wolf: 2, panda: 2, swan: 2, hamster: 0, bee: 0, lion: 1,
          butterfly: 0, turtle: 2, peacock: 1, dragon: 2, penguin: 3,
          squirrel: 1, flamingo: 1, koala: 2
        }
      }
    ]
  },
  {
    id: 3,
    text: "How do you approach challenges?",
    options: [
      {
        id: "3a",
        text: "Carefully analyze all possibilities",
        score: {
          cat: 1, rabbit: 0, deer: 1, fox: 2, owl: 3, dolphin: 1,
          wolf: 1, panda: 1, swan: 1, hamster: 0, bee: 2, lion: 1,
          butterfly: 0, turtle: 3, peacock: 0, dragon: 2, penguin: 1,
          squirrel: 3, flamingo: 0, koala: 2
        }
      },
      {
        id: "3b",
        text: "Trust my instincts and adapt",
        score: {
          cat: 2, rabbit: 1, deer: 2, fox: 3, owl: 1, dolphin: 2,
          wolf: 2, panda: 1, swan: 1, hamster: 3, bee: 1, lion: 3,
          butterfly: 2, turtle: 0, peacock: 2, dragon: 2, penguin: 1,
          squirrel: 2, flamingo: 2, koala: 1
        }
      },
      {
        id: "3c",
        text: "Seek advice from friends",
        score: {
          cat: 0, rabbit: 3, deer: 2, fox: 1, owl: 1, dolphin: 2,
          wolf: 2, panda: 2, swan: 1, hamster: 2, bee: 2, lion: 1,
          butterfly: 1, turtle: 1, peacock: 1, dragon: 0, penguin: 3,
          squirrel: 1, flamingo: 2, koala: 2
        }
      },
      {
        id: "3d",
        text: "Take my time and observe",
        score: {
          cat: 2, rabbit: 1, deer: 3, fox: 0, owl: 2, dolphin: 1,
          wolf: 1, panda: 3, swan: 2, hamster: 0, bee: 1, lion: 0,
          butterfly: 1, turtle: 3, peacock: 1, dragon: 1, penguin: 1,
          squirrel: 2, flamingo: 1, koala: 3
        }
      }
    ]
  },
  {
    id: 4,
    text: "What's your ideal evening activity?",
    options: [
      {
        id: "4a",
        text: "Stargazing and contemplating",
        score: {
          cat: 2, rabbit: 0, deer: 2, fox: 1, owl: 3, dolphin: 1,
          wolf: 2, panda: 2, swan: 2, hamster: 0, bee: 0, lion: 1,
          butterfly: 2, turtle: 2, peacock: 1, dragon: 3, penguin: 1,
          squirrel: 0, flamingo: 2, koala: 3
        }
      },
      {
        id: "4b",
        text: "Cozy movie marathon",
        score: {
          cat: 3, rabbit: 2, deer: 1, fox: 1, owl: 1, dolphin: 1,
          wolf: 1, panda: 3, swan: 1, hamster: 2, bee: 0, lion: 0,
          butterfly: 1, turtle: 2, peacock: 1, dragon: 1, penguin: 2,
          squirrel: 1, flamingo: 1, koala: 3
        }
      },
      {
        id: "4c",
        text: "Game night with friends",
        score: {
          cat: 0, rabbit: 3, deer: 1, fox: 2, owl: 0, dolphin: 3,
          wolf: 2, panda: 1, swan: 1, hamster: 3, bee: 2, lion: 2,
          butterfly: 2, turtle: 0, peacock: 2, dragon: 1, penguin: 3,
          squirrel: 2, flamingo: 2, koala: 1
        }
      },
      {
        id: "4d",
        text: "Creative projects",
        score: {
          cat: 1, rabbit: 1, deer: 2, fox: 3, owl: 2, dolphin: 2,
          wolf: 1, panda: 1, swan: 2, hamster: 2, bee: 3, lion: 1,
          butterfly: 3, turtle: 1, peacock: 3, dragon: 2, penguin: 1,
          squirrel: 2, flamingo: 3, koala: 1
        }
      }
    ]
  },
  {
    id: 5,
    text: "What quality do others admire most in you?",
    options: [
      {
        id: "5a",
        text: "Your independence",
        score: {
          cat: 3, rabbit: 0, deer: 1, fox: 2, owl: 1, dolphin: 1,
          wolf: 2, panda: 0, swan: 1, hamster: 1, bee: 1, lion: 2,
          butterfly: 2, turtle: 1, peacock: 2, dragon: 3, penguin: 0,
          squirrel: 2, flamingo: 2, koala: 1
        }
      },
      {
        id: "5b",
        text: "Your kindness",
        score: {
          cat: 1, rabbit: 3, deer: 2, fox: 0, owl: 1, dolphin: 2,
          wolf: 1, panda: 3, swan: 2, hamster: 2, bee: 2, lion: 1,
          butterfly: 2, turtle: 2, peacock: 1, dragon: 0, penguin: 2,
          squirrel: 1, flamingo: 1, koala: 3
        }
      },
      {
        id: "5c",
        text: "Your wisdom",
        score: {
          cat: 1, rabbit: 0, deer: 1, fox: 1, owl: 3, dolphin: 1,
          wolf: 2, panda: 1, swan: 2, hamster: 0, bee: 1, lion: 2,
          butterfly: 1, turtle: 3, peacock: 0, dragon: 3, penguin: 1,
          squirrel: 1, flamingo: 1, koala: 3
        }
      },
      {
        id: "5d",
        text: "Your creativity",
        score: {
          cat: 1, rabbit: 1, deer: 2, fox: 3, owl: 0, dolphin: 2,
          wolf: 0, panda: 1, swan: 2, hamster: 2, bee: 2, lion: 1,
          butterfly: 3, turtle: 0, peacock: 3, dragon: 2, penguin: 1,
          squirrel: 2, flamingo: 3, koala: 0
        }
      }
    ]
  },
  {
    id: 6,
    text: "What's your dream home environment?",
    options: [
      {
        id: "6a",
        text: "Cozy urban apartment",
        score: {
          cat: 3, rabbit: 1, deer: 0, fox: 2, owl: 1, dolphin: 1,
          wolf: 0, panda: 1, swan: 1, hamster: 2, bee: 2, lion: 1,
          butterfly: 1, turtle: 1, peacock: 2, dragon: 1, penguin: 2,
          squirrel: 1, flamingo: 2, koala: 1
        }
      },
      {
        id: "6b",
        text: "Cottage in the woods",
        score: {
          cat: 1, rabbit: 2, deer: 3, fox: 1, owl: 2, dolphin: 0,
          wolf: 3, panda: 2, swan: 1, hamster: 1, bee: 1, lion: 1,
          butterfly: 2, turtle: 2, peacock: 1, dragon: 2, penguin: 0,
          squirrel: 3, flamingo: 1, koala: 3
        }
      },
      {
        id: "6c",
        text: "Bustling community",
        score: {
          cat: 0, rabbit: 3, deer: 1, fox: 2, owl: 0, dolphin: 3,
          wolf: 1, panda: 1, swan: 1, hamster: 3, bee: 3, lion: 2,
          butterfly: 2, turtle: 0, peacock: 2, dragon: 1, penguin: 3,
          squirrel: 2, flamingo: 3, koala: 1
        }
      },
      {
        id: "6d",
        text: "Treehouse sanctuary",
        score: {
          cat: 1, rabbit: 0, deer: 2, fox: 1, owl: 3, dolphin: 1,
          wolf: 2, panda: 2, swan: 2, hamster: 2, bee: 1, lion: 1,
          butterfly: 3, turtle: 1, peacock: 2, dragon: 2, penguin: 1,
          squirrel: 2, flamingo: 2, koala: 2
        }
      }
    ]
  }
]; 