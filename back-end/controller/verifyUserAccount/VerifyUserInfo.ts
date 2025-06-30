import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export class verifyUserInfo{
    async handle(req:Request, res: Response){
        const {name} = req.params
        

        const alreadyHaveAccount = await prisma.user.findFirst({
            where: {username: name}
        })

        if(!alreadyHaveAccount){
            console.log('Usuario não encontrado');
            res.status(404).json("usuario não encontrado")
        } 
        
        res.status(200).send(alreadyHaveAccount)
    }
}