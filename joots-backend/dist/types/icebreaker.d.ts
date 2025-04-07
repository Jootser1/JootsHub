export type IcebreakerResponse = 'oui' | 'non' | 'je ne sais pas';
export type IcebreakerActions = {
    setIcebreakerReady: (conversationId: string, isCurrentUser: boolean) => void;
    setIcebreakerQuestion: (conversationId: string, question: string) => void;
    submitIcebreakerResponse: (conversationId: string, isCurrentUser: boolean, response: IcebreakerResponse) => void;
    resetIcebreakerStatus: (conversationId: string) => void;
};
export interface IcebreakerState {
    icebreakerData?: {
        question: string;
        senderResponse: IcebreakerResponse;
        receiverResponse: IcebreakerResponse;
    };
}
export type IcebreakerStore = IcebreakerState & IcebreakerActions;
