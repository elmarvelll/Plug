
import { Response, Request } from "express";
import db from "../utils/db";
import { Business } from "../routes/Business.route";


const Getproduct = async (req: Request, res: Response) => {
    const user = req.user?.userId
    const { business, productID } = req.params
    try {
        const [rows] = await db.query('SELECT * FROM businesses WHERE owner_id = ? AND BusinessName =?',
            [user, business])
        const businesses = rows as Business[]
        const [product] = await db.query('SELECT * FROM products WHERE id = ? AND business_id = ?', [productID, businesses[0].id])
        res.json({ product })
    } catch (error) {
        console.log('error from Getproduct' + error)
    }

}

export default Getproduct