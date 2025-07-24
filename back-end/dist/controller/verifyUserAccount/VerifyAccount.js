"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserAccount = void 0;
const client_1 = require("@prisma/client");
const redis_config_1 = require("../../redis.config");
const prisma = new client_1.PrismaClient();
class verifyUserAccount {
    async handle(req, res) {
        const { email } = req.body;
        const userRedis = await (0, redis_config_1.getRedis)(`user-${email}`);
        try {
            if (!userRedis || typeof (userRedis) !== 'string') {
                const alreadyHaveAccount = await prisma.user.findFirst({
                    where: { email: email }
                });
                if (!alreadyHaveAccount) {
                    console.log('Usuario não encontrado');
                    res.status(404).json("usuario não encontrado");
                }
                res.status(200).send(alreadyHaveAccount);
                return;
            }
            const user = JSON.parse(userRedis);
            res.status(200).json(user);
            // return res.status(200).send(user)
        }
        catch (err) {
            console.log("aconteceu algo inesperado");
            res.status(400).json({ message: err });
        }
    }
}
exports.verifyUserAccount = verifyUserAccount;
