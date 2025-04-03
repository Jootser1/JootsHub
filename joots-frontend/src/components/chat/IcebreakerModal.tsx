import React from 'react';
import { IcebreakerResponse } from '@/types/chat';

interface IcebreakerModalProps {
  isOpen: boolean;
  question: string;
  onClose: () => void;
  onResponse: (response: IcebreakerResponse) => void;
}

export const IcebreakerModal: React.FC<IcebreakerModalProps> = ({
  isOpen,
  question,
  onClose,
  onResponse,
}) => {
  if (!isOpen) return null;

  const handleResponse = (response: IcebreakerResponse) => {
    onResponse(response);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Question Icebreaker</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-gray-700 mb-6 text-lg">{question}</p>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => handleResponse('oui')}
            className="flex-1 py-3 px-4 bg-[#3CBF77] text-white rounded-lg hover:bg-[#3CBF77]/90 font-medium transition-colors"
          >
            Oui
          </button>
          <button
            onClick={() => handleResponse('non')}
            className="flex-1 py-3 px-4 bg-[#E59C45] text-white rounded-lg hover:bg-[#E59C45]/90 font-medium transition-colors"
          >
            Non
          </button>
          <button
            onClick={() => handleResponse('je ne sais pas')}
            className="flex-1 py-3 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium transition-colors"
          >
            Je ne sais pas
          </button>
        </div>
      </div>
    </div>
  );
}; 