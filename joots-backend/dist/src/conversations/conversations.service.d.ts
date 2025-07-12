import { PrismaService } from '../../prisma/prisma.service';
import { UserGateway } from '../gateways/user.gateway';
import { UserContactsService } from '../users/contacts/contacts.service';
export declare class ConversationsService {
    private readonly prisma;
    private readonly userGateway;
    private readonly userContactsService;
    constructor(prisma: PrismaService, userGateway: UserGateway, userContactsService: UserContactsService);
    private readonly userSelect;
    findAll(userId: string): Promise<{
        conversation_id: string;
        created_at: Date;
        updated_at: Date;
        locale: import(".prisma/client").$Enums.LocaleCode;
        xp_point: number;
        difficulty: import(".prisma/client").$Enums.Difficulty;
        current_poll_id: string | null;
    }[]>;
    findOne(id: string, userId: string): Promise<{
        conversation_id: string;
        created_at: Date;
        updated_at: Date;
        locale: import(".prisma/client").$Enums.LocaleCode;
        xp_point: number;
        difficulty: import(".prisma/client").$Enums.Difficulty;
        current_poll_id: string | null;
    }>;
    findConversation(userId: string, receiverId: string): Promise<{
        conversation_id: string;
        created_at: Date;
        updated_at: Date;
        locale: import(".prisma/client").$Enums.LocaleCode;
        xp_point: number;
        difficulty: import(".prisma/client").$Enums.Difficulty;
        current_poll_id: string | null;
    }>;
    create(userId: string, receiverId: string): Promise<{
        conversation_id: string;
        created_at: Date;
        updated_at: Date;
        locale: import(".prisma/client").$Enums.LocaleCode;
        xp_point: number;
        difficulty: import(".prisma/client").$Enums.Difficulty;
        current_poll_id: string | null;
    }>;
    findMessages(conversationId: string, userId: string): Promise<{
        conversation_id: string;
        created_at: Date;
        message_id: string;
        sender_id: string;
        content: string;
        status: import(".prisma/client").$Enums.MessageStatus;
    }[]>;
}
