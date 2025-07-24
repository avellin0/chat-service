"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.latestMessages = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class latestMessages {
    async handle(req, res) {
        const { name } = req.params;
        try {
            const response = await prisma.message.findMany({ where: {
                    OR: [
                        { remetentId: name },
                        { destinatarioId: name }
                    ]
                } });
            res.status(200).json(response);
        }
        catch (err) {
            res.status(400).json({ message: "Erro desconhecido ao buscar usuario" });
        }
    }
}
exports.latestMessages = latestMessages;
