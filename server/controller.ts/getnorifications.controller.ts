import { Response, Request } from "express";
import db from "../utils/db";

async function getNotifications(req: Request, res: Response) {
    const name = req.params.business
    try {
        const [row] = await db.query('SELECT bn.id,bn.created_at,bn.is_read,bn.related_order_id FROM plug.business_notifications bn JOIN plug.businesses b ON business_id = b.id WHERE BusinessName = ?', [name])
        res.json({ Notification: row })
    } catch (error) {
        console.log('couldnt get notifications ' + error)
        res.status(500).json({ message: "Server error" })
    }

}
export default getNotifications