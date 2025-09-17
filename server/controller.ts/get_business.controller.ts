import { Request, Response } from "express"
import db from "../utils/db"

const UploadBusinesses = async (req: Request, res: Response) => {
    console.log('hello from server')
    try {
        const [businesses] = await db.query('SELECT * FROM businesses JOIN businessinfo ON id = businessinfo.business_id')
        res.json({businesses})
    } catch (error) {
        res.status(500).json({ error: 'Database error' })
    }

}

export default UploadBusinesses