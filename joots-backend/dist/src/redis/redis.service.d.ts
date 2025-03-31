export declare class RedisService {
    private readonly redis;
    constructor();
    sadd(key: string, ...members: string[]): Promise<number>;
    srem(key: string, ...members: string[]): Promise<number>;
    smembers(key: string): Promise<string[]>;
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttl?: number): Promise<"OK">;
    del(key: string): Promise<number>;
}
