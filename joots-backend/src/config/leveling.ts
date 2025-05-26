export const XP_CONFIG = {
  // Points d'XP par type d'action
  QUESTION_ANSWERED: 10,
  CONVERSATION_STARTED: 5,
  MESSAGE_SENT: 2,

  // Points d'XP par difficulté de question
  QUESTION_DIFFICULTY: {
    HARDCORE: 2.5,
    INTERMEDIATE: 10,
    EASY: 20,
  },
} as const;
