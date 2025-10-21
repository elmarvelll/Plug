
import { Response, Request } from "express";
import db from "../utils/db";
import { Business } from "../routes/Business.route";

const showProducts = async (req: Request, res: Response) => {
    const { businessID } = req.params
    const { search } = req.query
    console.log(search)
    console.log(businessID)
    // const [rows] = await db.query('SELECT * FROM businesses WHERE BusinessName =?',
    //     [business])
    // const businesses = rows as Business[]
    if (search || search !== '') {
        console.log(' available')
        const [product] = await db.query('SELECT * FROM products WHERE business_id = ? AND LOWER(name) LIKE ? ', [businessID, `%${search}%`])
        console.log('this is product' + product)
        res.json({ product })
    }
    else {
        console.log(' unavailable')
        const [product] = await db.query('SELECT * FROM products WHERE business_id = ?', [businessID])
        res.json({ product })
    }
}
export default showProducts