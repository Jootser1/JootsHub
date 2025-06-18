import { PollType } from '@prisma/client';

export type CurrentPollWithRelations = {
  poll_id: string;
  type: PollType;
  author_id: string;
  created_at: Date;
  is_moderated: boolean;
  is_pinned: boolean;
  is_enabled: boolean;
  poll_translations: Array<{
    poll_translation_id: string;
    poll_id: string;
    locale: string;
    translation: string;
  }>;
  categories: Array<{
    category_id: number;
    name: string;
  }>;
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