import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../../redis/redis.service';
export declare class UserContactsService {
    private prisma;
    private redis;
    private readonly logger;
    constructor(prisma: PrismaService, redis: RedisService);
    getUserContacts(userId: string): Promise<{
        contact: {
            user_id: string;
            username: string;
            avatar: string | null;
        };
    }[]>;
    getContactsIds(userId: string): Promise<any>;
    isUserContact(userId: string, contactId: string): Promise<boolean>;
    getOnlineContactsFromRedis(userId: string, contactsIds: string[]): Promise<string[] | undefined>;
    addUserContactinBDD(userId: string, contactId: string): Promise<void>;
    removeUserContact(userId: string, contactId: string): Promise<void>;
}
