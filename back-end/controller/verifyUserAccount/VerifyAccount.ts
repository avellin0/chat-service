import { NextFunction, Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import { getRedis } from "../../redis.config";
const prisma = new PrismaClient()

export class verifyUserAccount {
    async handle(req: Request, res: Response) {
        const { email } = req.body

        const userRedis = await getRedis(`user-${email}`)

        try {
            if (!userRedis || typeof(userRedis) !== 'string') {
                const alreadyHaveAccount = await prisma.user.findFirst({
                    where: { email: email }
                })

                if (!alreadyHaveAccount) {
                    console.log('Usuario não encontrado');
                    res.status(404).json("usuario não encontrado")
                }

                res.status(200).send(alreadyHaveAccount)
                return
            }
            
            const user = JSON.parse(userRedis)

            res.status(200).json(user)
            
        } catch (err) {
            console.log("aconteceu algo inesperado");
            res.status(400).json({ message: err })
        }
    }
}