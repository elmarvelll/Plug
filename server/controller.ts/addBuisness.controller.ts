import { Request, Response } from "express";
import db from "../utils/db";

export const addBuisness = async(req: Request, res: Response) => {
    const user = req.user
    const [rows] = await db.query('SELECT * FROM plug.users WHERE user_id = ?', [user?.userId])
    console.log(rows)
}  