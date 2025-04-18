import { UserContactsService } from './contacts.service';
export declare class UserContactsController {
    private userContactsService;
    constructor(userContactsService: UserContactsService);
    getContacts(req: any): Promise<{
        contact: {
            id: string;
            username: string;
            avatar: string | null;
            isOnline: boolean;
        };
    }[]>;
    addContact(req: any, body: {
        contactId: string;
    }): Promise<{
        success: boolean;
    }>;
    removeContact(req: any, contactId: string): Promise<{
        success: boolean;
    }>;
    checkContact(req: any, contactId: string): Promise<{
        isContact: boolean;
    }>;
}
