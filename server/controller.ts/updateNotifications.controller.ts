import { Response, Request } from "express";
import db from "../utils/db";
const UpdateNotifications = async (req: Request, res: Response) => {
    const {id} = req.body
    console.log(id)
    try {
            await db.query(
                `UPDATE business_notifications SET is_read = ? WHERE id = ?`,
                [true, id]
            )
            res.status(201).json({success:'success'})
    } catch (error) {
        console.log('error updating notifications ' + error)
    }


}
export default UpdateNotifications