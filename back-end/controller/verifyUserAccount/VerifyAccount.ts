import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getRedis } from "../../redis.config";
const prisma = new PrismaClient()

export class verifyUserAccount {
    async handle(req: Request, res: Response) {
        const { email } = req.body

        const userRedis = await getRedis(`user-${email}`)

        if (!userRedis) {
            const alreadyHaveAccount = await prisma.user.findFirst({
                where: { email: email }
            })

            if (!alreadyHaveAccount) {
                console.log('Usuario não encontrado');
                res.status(404).json("usuario não encontrado")
            }

            return res.status(200).send(alreadyHaveAccount)
        }

        const user = JSON.parse(userRedis)

        return res.status(200).send(user)

    }
}