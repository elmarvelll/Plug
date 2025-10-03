import { Request, Response } from "express"
import db from "../utils/db"
import { Business } from "../routes/Business.route"

const get_products = async (req: Request, res: Response) => {
    const user = req.user?.userId
    const businessName = req.params.business
    const { search } = req.query

    const [rows] = await db.query('SELECT * FROM businesses WHERE owner_id = ? AND BusinessName =?',
        [user, businessName])
    const businesses = rows as Business[]
    if (search) {
        const [business] = await db.query('SELECT * FROM products WHERE business_id = ? AND LOWER(name) LIKE ? ', [businesses[0].id,`%${search}%`])
        res.json(business)
        console.log(business)
    }
    else {
        const [business] = await db.query('SELECT * FROM products WHERE business_id = ?', [businesses[0].id])
        res.json(business)
    }

}

export default get_products