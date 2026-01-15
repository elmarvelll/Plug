import { Response, Request } from "express";
import db from "../utils/db";
import jwt from 'jsonwebtoken';
import { TokenPayload } from "../utils/auth";

async function getBusinessNotifications(req: Request, res: Response) {
    const { accesstoken } = req.cookies
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'JWT secret not configured' });
    }
    try {
        const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET) as TokenPayload;
        const user = decoded.userId
        const [row] = await db.query('SELECT * FROM plug.business_notifications JOIN plug.businesses ON business_id = plug.businesses.id WHERE owner_id = ? AND is_read = ?', [user, false])
        res.json({ Notification: row })
    } catch (error) {
        console.log('couldnt get notifications ' + error)
        res.status(500).json({ message: "Server error" })
    }

}
export default getBusinessNotifications