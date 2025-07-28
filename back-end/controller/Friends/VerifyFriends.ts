import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export class verifyFriends{
    async handle(req:Request, res: Response){
        const {name} = req.body
        
       try{ 
        const verifyFriendsAccount = await prisma.user.findFirst({
            where: {username: name},
            select: {friends: true}
        })
     
        res.status(200).send(verifyFriendsAccount)
       }
       catch(err){
        console.log("Erro ao buscar amigos");
        res.status(404).json({message: err})
       }
    }
}