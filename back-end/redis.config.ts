import Redis from "ioredis";
import { config } from "dotenv"
config()


let redisClient: Redis | null = null

if (process.env.REDIS_URL) {
    redisClient = new Redis(process.env.REDIS_URL)
} else {
    console.log("Redis desativado")
}

function getRedis(key: string) {
    if (!redisClient) return Promise.resolve(null)
    return redisClient.get(key)
}

function setRedis(key: string, value: string) {
    if (!redisClient) return Promise.resolve(null)
    return redisClient.set(key, value)
}

export { redisClient, getRedis, setRedis }
