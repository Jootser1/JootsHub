import { Prisma } from '@prisma/client';

export type Question = {
    id: string;
    groupId: string;
    locale: string;
    question: string;
}

export type QuestionOption = {
    id: string;
    text: string;
    questionId: string;
}

export type QuestionGroup = {
    id: string;
    type: number;
    isModerated: boolean;
    moderatedAt: Date | null;
    pinned: boolean;
    enabled: boolean;
    questions: Question[];
    options: QuestionOption[];
    categories: Category[];
}

export type Category = {
    id: string;
    label: string;
    description: string;
}

// Définir nos propres types pour les relations sans dépendre des types Prisma directement
export type QuestionGroupWithRelations = {
  id: string;
  type: number;
  authorId: string;
  createdAt: Date;
  isModerated: boolean;
  moderatedAt: Date | null;
  pinned: boolean;
  enabled: boolean;
  // Relations
  questions: Array<{
    id: string;
    groupId: string;
    locale: string;
    question: string;
  }>;
  categories: Array<{
    category: {
      translations: Array<{
        categoryId: number;
        locale: string;
        label: string;
      }>;
    };
  }>;
  options: Array<{
    id: string;
    groupId: string;
    locale: string;
    label: string;
    order: number;
  }>;
};
