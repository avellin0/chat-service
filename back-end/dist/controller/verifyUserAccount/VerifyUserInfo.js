"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserInfo = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class verifyUserInfo {
    async handle(req, res) {
        const { name } = req.params;
        const alreadyHaveAccount = await prisma.user.findFirst({
            where: { username: name }
        });
        if (!alreadyHaveAccount) {
            console.log('Usuario não encontrado');
            res.status(404).json("usuario não encontrado");
        }
        res.status(200).send(alreadyHaveAccount);
    }
}
exports.verifyUserInfo = verifyUserInfo;
