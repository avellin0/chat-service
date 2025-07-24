"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFriends = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CreateFriends {
    async handle(req, res) {
        const { user_id, friend_name, } = req.body;
        try {
            const response = await prisma.friends.create({ data: {
                    username: friend_name,
                    User: { connect: { username: user_id } }
                } });
            res.status(200).json(response);
        }
        catch (err) {
            console.log("this is the error:", err);
            res.status(400).json({ message: "Erro imprevisto na criação" });
        }
    }
}
exports.CreateFriends = CreateFriends;
