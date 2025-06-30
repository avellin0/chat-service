import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export class verifyFriends{
    async handle(req:Request, res: Response){
        const {name} = req.body
        
        const verifyFriendsAccount = await prisma.user.findFirst({
            where: {username: name},
            select: {friends: true}
        })
     
        res.status(200).send(verifyFriendsAccount)
    }
}