export declare class RedisService {
    private readonly redis;
    constructor();
    sadd(key: string, ...members: string[]): Promise<number>;
    srem(key: string, ...members: string[]): Promise<number>;
    smembers(key: string): Promise<string[]>;
    sismember(key: string, member: string): Promise<number>;
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttl?: number): Promise<"OK">;
    del(key: string): Promise<number>;
    hset(key: string, field: string, value: string): Promise<number>;
    setUserOnline(userId: string, ttl?: number): Promise<boolean>;
    setUserOffline(userId: string): Promise<boolean>;
    getUserStatus(userId: string): Promise<'online' | 'offline'>;
    refreshUserStatus(userId: string, ttl?: number): Promise<boolean>;
}
