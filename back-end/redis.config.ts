import Redis from "ioredis";
import {config} from "dotenv"
config()

const redisClient = new Redis(process.env.REDIS_URL || "")

function getRedis(key: string) {
    return redisClient.get(key); 
}

function setRedis(key: string, value: string) {
    return redisClient.set(key, value); 
}

export { redisClient, getRedis, setRedis };
