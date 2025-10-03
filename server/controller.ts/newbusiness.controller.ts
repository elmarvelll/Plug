import { Response, Request } from "express";
import db from "../utils/db";
import { Business } from "../routes/Business.route";

const save_to_db = async (req: Request, res: Response) => {
    const owner_id = req.user?.userId
    const { Number, Email, BusinessName, Category, BusinessDescription, DeliveryTime, Hall, roomNumber } = req.body
    const [business_query] = await db.query('SELECT * FROM businesses WHERE BusinessName = ?', [BusinessName])
    const businesses = business_query as Business[]
    if (businesses.length !== 0) {
        res.json({ same_name_err:'business has same name' })
    }
    else {
        try {
            await db.query('INSERT INTO businesses(Number, Email, BusinessName, Category, BusinessDescription, DeliveryTime, Hall, RoomNumber, owner_id) VALUES(?,?,?,?,?,?,?,?,?)',
                [Number, Email, BusinessName, Category, BusinessDescription, DeliveryTime, Hall, roomNumber, owner_id]);
            res.status(200).json({ Success: 'uploaded successfully' })
        }
        catch (error) {
            console.log('error uploading business to the db')
            console.log(error)
        }
    }

}
export default save_to_db