import { Request, Response } from "express"
import db from "../utils/db"

const getBusinesses = async (req: Request, res: Response) => {
    const user = req.user?.userId
    console.log(req.params)
    const businessName = req.params.business
    console.log('hello from get_business')
    console.log(user, businessName)
    try {
        const [businesses] = await db.query('SELECT * FROM businesses WHERE owner_id = ? AND BusinessName =?',
            [user, businessName]
        )
        res.json({ businesses })
    } catch (error) {
        res.status(500).json({ error: 'Database error' })
    }
}

export default getBusinesses