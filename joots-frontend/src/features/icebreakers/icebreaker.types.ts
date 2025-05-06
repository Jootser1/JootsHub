export type IcebreakerResponse = {
    questionGroupId: string;
    optionId: string;
    answeredAt: string;
}


export type IcebreakerActions = {
    setIcebreakerQuestion: (conversationId: string, question: string) => void;
    submitIcebreakerResponse: (
      conversationId: string, 
      isCurrentUser: boolean, 
      response: IcebreakerResponse) => void;
    resetIcebreakerStatus: (conversationId: string) => void;
    fetchRandomQuestion: (conversationId: string) => void;
}

export type IcebreakerStore = IcebreakerActions;

