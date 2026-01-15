import { Response, Request } from "express";
import db from "../utils/db";

async function getCategoryProducts(req: Request, res: Response) {
    const { category } = req.query
    try {
        const [products] = await db.query('SELECT p.id,p.name,p.description,p.price,p.business_id,p.stock,p.secure_url FROM products p JOIN businesses b ON business_id = b.id WHERE LOWER(category) = ?', [category])
        res.json({products})
    } catch (error) {
        console.log('error getting category products')
    }

}
export default getCategoryProducts