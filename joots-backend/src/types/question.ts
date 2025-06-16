
export type Question = {
  id: string;
  groupId: string;
  locale: string;
  question: string;
};

export type QuestionOption = {
  id: string;
  text: string;
  questionId: string;
};

export type Poll = {
  id: string;
  type: number;
  isModerated: boolean;
  moderatedAt: Date | null;
  pinned: boolean;
  enabled: boolean;
  questions: Question[];
  options: QuestionOption[];
  categories: Category[];
};

export type Category = {
  id: string;
  label: string;
  description: string;
};

// Définir nos propres types pour les relations sans dépendre des types Prisma directement
export type PollWithRelations = {
  poll_id: string;
  type: string;
  author_id: string;
  created_at: Date;
  is_moderated: boolean;
  is_pinned: boolean;
  is_enabled: boolean;
  // Relations
  poll_translations: Array<{
    poll_translation_id: string;
    poll_id: string;
    locale: string;
    translation: string;
  }>;
  categories: Array<{
    category: {
      category_id: number;
      name: string;
    }
  }>;
    options: Array<{
    poll_option_id: string;
    poll_id: string;
    order: number;
    translations: Array<{
      option_id: string;
      locale: string;
      translated_option_text: string;
    }>;
  }>;
};
