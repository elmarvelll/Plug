import { Response, Request } from "express";
import db from "../utils/db";
import { v4 as uuidv4 } from 'uuid';
import { Business } from "../routes/Business.route";
export async function addProduct(req: Request, res: Response) {
    const user = req.user?.userId
    const data = req.body.productInfo
    const img = req.body.img
    const businessName = req.params.business
    try {
        const [rows] = await db.query('SELECT * FROM businesses WHERE owner_id = ? AND BusinessName =?',
            [user, businessName])
        const businesses = rows as Business[]
        await db.query('INSERT INTO products (business_id, name, description, price, stock, public_url, secure_url, status)  VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [businesses[0].id, data.name, data.description, data.price, data.stock, img.public_id, img.secure_url, 'active']);
        res.status(201).json({ message: 'added successfully' })
        console.log('product uploaded successfully')
    }
    catch (err) {
        console.log('error uploading product')
        console.log(err)
    }
}