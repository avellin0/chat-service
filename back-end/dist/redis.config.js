"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
exports.getRedis = getRedis;
exports.setRedis = setRedis;
const ioredis_1 = __importDefault(require("ioredis"));
const redisClient = new ioredis_1.default();
exports.redisClient = redisClient;
function getRedis(key) {
    return redisClient.get(key);
}
function setRedis(key, value) {
    return redisClient.set(key, value);
}
