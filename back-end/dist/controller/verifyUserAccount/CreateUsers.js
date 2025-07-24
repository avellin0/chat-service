"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
const client_1 = require("@prisma/client");
const redis_config_1 = require("../../redis.config");
const prisma = new client_1.PrismaClient();
class CreateUser {
    async handle(req, res) {
        const { id, username, email, password } = req.body;
        try {
            const response = await prisma.user.create({
                data: {
                    id,
                    username,
                    email,
                    password
                }
            });
            await (0, redis_config_1.setRedis)(`user-${email}`, JSON.stringify(response));
            res.status(200).json(response);
            // return res.status(200).json(response)
        }
        catch (error) {
            console.log("aconteceu algo inesperado");
            res.status(400).json({ message: error });
        }
    }
}
exports.CreateUser = CreateUser;
