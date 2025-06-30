import Redis from "ioredis";

const redisClient = new Redis();

function getRedis(key: string) {
    return redisClient.get(key); 
}

function setRedis(key: string, value: string) {
    return redisClient.set(key, value); 
}

export { redisClient, getRedis, setRedis };
