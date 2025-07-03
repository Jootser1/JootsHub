


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

export type PollTranslation = {
    poll_translation_id: string;
    poll_id: string;
    locale: string;
    translation: string;
  };
  
  
  export type Poll = {
    poll_id: string;
    type: PollType;
    is_moderated: boolean;
    moderated_at: Date | null;
    is_pinned: boolean;
    is_enabled: boolean;
    questions: PollTranslation[];
    options: Option[];
    categories: Category[];
  };
  
  export type Category = {  //TODO: check if this is correct
    category_id: number;
    name: string;
  };
  
  
  export interface CategoryTranslation {
    id: number;
    fr: string;
    icon: string;
  }


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
      min_label?: string;
      max_label?: string;
    } | null;
  };

  export interface Option {
    id: string
    order: number
    translations: Array<{
      locale: string;
      translated_option_text: string;
    }>
  }
  
  export interface Question {
    id: string
    questions: Array<{
      question: string
    }>
    options: Option[]
    category?: {
      name: string
    }
    categories?: {
      logo?: string
    }
  }


