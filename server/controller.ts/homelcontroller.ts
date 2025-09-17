import { Request, Response } from "express";
export const sendMessage = (req: Request,res:Response)=>{
        res.json({message: 'hello from the backend'})
}
