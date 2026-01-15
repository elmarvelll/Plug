import { Response, Request } from "express";
import db from "../utils/db";
import { v4 as uuidv4 } from 'uuid';



type cartType = {
    id: string;
    user_id: string;
    created_at: string
}

const deleteCartproducts = async (req: Request, res: Response) => {
    console.log('deleting')
    const { product_id, cart_id } = req.query
    try {
        console.log('empty')
        await db.query('DELETE FROM cart_items WHERE cart_id = ? AND product_id = ? ', [cart_id, product_id])
        res.status(201).json({ message: 'deleted successfully' })
    }
    catch (e) {
        console.log('error updating cart ' + e)
    }
}

export default deleteCartproducts
