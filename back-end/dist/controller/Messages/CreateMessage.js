"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessage = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CreateMessage {
    async handle(req, res) {
        const { id, message, sendTo } = req.body;
        try {
            const response = await prisma.message.create({ data: {
                    conteudo: message,
                    remetente: { connect: { username: id } },
                    destinatario: { connect: { username: sendTo } }
                } });
            res.status(200).json(response);
        }
        catch (err) {
            console.log("this is the error:", err);
            res.status(400).json({ message: "Erro imprevisto na criação" });
        }
    }
}
exports.CreateMessage = CreateMessage;
