import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { setRedis } from "../../redis.config";
const prisma = new PrismaClient()

export class CreateUser {
    async handle(req: Request, res: Response) {
        const { id, username,email,password} = req.body

        try {
            const response = await prisma.user.create({
                data: {
                    id,
                    username,
                    email,
                    password
                }
            })

            await setRedis(`user-${email}`, JSON.stringify(response))

            return res.status(200).json(response)

        } catch (error) {
            console.log("aconteceu algo inesperado");
            res.status(400).json({ message: error })
        }
    }
}