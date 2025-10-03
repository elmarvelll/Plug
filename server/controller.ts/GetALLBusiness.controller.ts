import { Request, Response } from "express"
import db from "../utils/db"


const get_all_Business = async (req: Request, res: Response) => {
    console.log(req.user?.userId)
    const user = req.user?.userId
    const [business] = await db.query('SELECT * FROM businesses WHERE owner_id = ?',[user])
    console.log(business)
    res.json(business)
}

export default get_all_Business