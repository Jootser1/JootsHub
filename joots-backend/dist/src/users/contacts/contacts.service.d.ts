import { PrismaService } from '../../../prisma/prisma.service';
export declare class UserContactsService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserContacts(userId: string): Promise<{
        contact: {
            id: string;
            username: string;
            avatar: string | null;
            isOnline: boolean;
        };
    }[]>;
    isUserContact(userId: string, contactId: string): Promise<boolean>;
    addUserContact(userId: string, contactId: string): Promise<void>;
    removeUserContact(userId: string, contactId: string): Promise<void>;
}
