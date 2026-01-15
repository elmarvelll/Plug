import { Response, Request } from "express";
import db from "../utils/db";
import { comparePassword } from "../utils/hash";
import { credential } from "./Login.controller";
import { Order } from "../routes/payment.route";
import timeAgo from "../utils/timeAgo";


const getUserNotifications = async (req: Request, res: Response) => {
    try {
        const user = req.user?.userId
        const [row] = await db.query('SELECT * FROM user_notifications WHERE user_id = ?', [user])
        const query = row as notitype[]
        const notifications = query.map((value) => {
            return {
                id: value.id,
                user_id: value.user_id,
                title: value.title,
                related_order_id:value.related_order_id,
                is_read: value.is_read,
                created_at: timeAgo(value.created_at)
            }
        })
        console.log(notifications)
        res.json({ notifications })
    } catch (error) {
        console.log('error getting notifications ' + error)
    }


}
export default getUserNotifications


export interface notitype {
    id: string;                     // UUID
    user_id: string;                 // ID of the user receiving the notification
    title: string;                   // Short heading, e.g., "Order Received"
    message: string;                 // Detailed message
    type: "order" | "payment" | "system"; // Type of notification
    related_order_id?: string | null;  // Optional, link to order
    is_read: boolean;                 // Whether user has seen it
    created_at: string;               // ISO timestamp or Date string
}