import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient()

export class latestMessages {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        try {
            const response = await prisma.user_message.findMany({ where: { id: id } })

            res.status(200).json(response)
        } catch (err) {
            res.status(400).json({message: "Erro desconhecido ao buscar usuario"})
        }
    }
}