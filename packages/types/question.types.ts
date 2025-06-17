/**
 * Représente les différents types de sondages disponibles dans l'application.
 * @enum {string}
 */
export enum PollType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  STEP_LABELED = 'STEP_LABELED',
  YES_NO_IDK = 'YES_NO_IDK',
  OPEN = 'OPEN',
  CONTINUOUS = 'CONTINUOUS'
}

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
    poll_id: string;
    type: PollType;
    is_moderated: boolean;
    moderated_at: Date | null;
    is_pinned: boolean;
    is_enabled: boolean;
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
  export type CurrentPollWithRelations = {
    poll_id: string;
    type: PollType;
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
        category_id: number;
        name: string;
      }
    >;
    options: Array<{
      poll_option_id: string;
      order: number;
      translations: Array<{
        locale: string;
        translated_option_text: string;
      }>;
    }>;
    poll_scale_constraints: {
      constraint_id: string;
      min_value: number;
      max_value: number;
      step: number;
    } | null;
  };