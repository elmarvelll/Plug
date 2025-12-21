import { Response, Request } from "express";
import db from "../utils/db";




const getUser = async (req: Request, res: Response) => {
    const userID = req.user?.userId
    try {
        const [user] = await db.query('SELECT * FROM users JOIN carts ON users.user_id = carts.user_id WHERE users.user_id = ? ', [userID])
        res.json(user)
    } catch (error) {
       console.log('err getting user')
    }

}
export default getUser