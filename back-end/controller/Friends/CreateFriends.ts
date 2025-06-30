import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export class CreateFriends{
    async handle(req: Request, res: Response) {
        const {user_id, friend_name,} = req.body

        try {


            const response = await prisma.friends.create({data: {
                username: friend_name,
                User: {connect: {username: user_id}}
            }})

            res.status(200).json(response)

        } catch (err) {
            console.log("this is the error:",err);
            res.status(400).json({ message: "Erro imprevisto na criação" })
        }
    }
}