import { Request, Response } from "express"
import db from "../utils/db"


const get_all_Business = async (req: Request, res: Response) => {
    console.log(req.user?.userId)
    const user = req.user?.userId
    const [business] = await db.query('SELECT b.BusinessName, count(bn.is_read) AS unread FROM plug.businesses b LEFT JOIN plug.business_notifications bn ON b.id = bn.business_id AND bn.is_read= ? WHERE owner_id = ? GROUP BY bn.is_read,b.BusinessName',[false,user])
    console.log(business)
    res.json(business)
}

export default get_all_Business