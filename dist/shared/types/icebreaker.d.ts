export declare type IcebreakerResponse = 'oui' | 'non' | 'je ne sais pas';
export declare type IcebreakerActions = {
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
export declare type IcebreakerStore = IcebreakerState & IcebreakerActions;
