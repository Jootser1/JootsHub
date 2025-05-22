export interface Option {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  questions: Array<{
    question: string;
  }>;
  options: Option[];
  category?: {
    name: string;
  };
  categories?: {
    logo?: string;
  };
} 