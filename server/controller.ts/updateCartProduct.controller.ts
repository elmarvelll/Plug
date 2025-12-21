import { Response, Request } from "express";
import db from "../utils/db";
import { v4 as uuidv4 } from 'uuid';



type cartType = {
    id: string;
    user_id: string;
    created_at: string
}

const updateCartProduct = async (req: Request, res: Response) => {
    const { quantity, product_id, cart_id } = req.body
    try {
        await db.query('UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ? ', [quantity, cart_id, product_id])
        res.status(201).json({ message: 'updated successfully' })
    }
    catch (e) {
        console.log('error updating cart ' + e)
    }
}

export default updateCartProduct
