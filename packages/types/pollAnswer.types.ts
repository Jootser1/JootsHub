export type PollAnswer = {
    poll_answer_id: string;
    poll_id: string;
    user_id: string;
    source_id: string;
    poll_option_id: string;
    option_text?: string;
    numeric?: number;
    answered_at: Date;
    comment?: string;
    is_flagged?: boolean;
  };