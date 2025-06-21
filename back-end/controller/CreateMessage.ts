import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export class CreateMessage {
    async handle(req: Request, res: Response) {
        const { id, message, sendTo } = req.body

        try {

            const response = await prisma.message.create({data: {
                conteudo: message,
                remetente: {connect: {id}},
                destinatario: {connect: {id: sendTo}}
            }})

            res.status(200).json(response)

        } catch (err) {
            console.log("this is the error:",err);
            res.status(400).json({ message: "Erro imprevisto na criação" })
        }
    }
}