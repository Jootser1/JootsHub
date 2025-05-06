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


export type QuestionGroupWithRelations = Prisma.QuestionGroupGetPayload<{
  include: {
    questions: true;
    categories: {
      include: {
        category: {
          include: {
            translations: true;
          };
        };
      };
    };
    options: true;
  };
}>;