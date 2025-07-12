import axios from 'axios';
import { Question, QuestionGroup, QuestionResponse } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const questionsApi = {
   getQuestions: async(): Promise<QuestionGroup> => {
  const response = await axios.get('/api/questions')
  return response.data;
},
  getQuestionGroup: async (groupId: string): Promise<QuestionGroup> => {
    const response = await axios.get(`${API_URL}/questions/group/${groupId}`);
    return response.data;
  },

  getRandomQuestionGroup: async (): Promise<QuestionGroup> => {
    const response = await axios.get(`${API_URL}/questions/random`);
    return response.data;
  },

  submitAnswer: async (answer: QuestionResponse): Promise<void> => {
    await axios.post(`${API_URL}/questions/response`, answer);
  },

  getQuestionsByConversation: async (conversationId: string): Promise<Question[]> => {
    const response = await axios.get(`${API_URL}/questions/conversation/${conversationId}`);
    return response.data;
  }
}; 