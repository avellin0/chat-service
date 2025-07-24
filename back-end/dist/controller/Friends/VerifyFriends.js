"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyFriends = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class verifyFriends {
    async handle(req, res) {
        const { name } = req.body;
        const verifyFriendsAccount = await prisma.user.findFirst({
            where: { username: name },
            select: { friends: true }
        });
        res.status(200).send(verifyFriendsAccount);
    }
}
exports.verifyFriends = verifyFriends;
