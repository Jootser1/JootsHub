export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  groupId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionOption {
  id: string;
  text: string;
  questionId: string;
}

export interface QuestionGroup {
  id: string;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionResponse {
  userId: string;
  questionGroupId: string;
  optionId: string;
  conversationId?: string;
} 