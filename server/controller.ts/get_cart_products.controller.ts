import { Response, Request } from "express";
import db from "../utils/db";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TokenPayload } from "../utils/auth";

type cartType = {
    id: string;
    user_id: string;
    created_at: string
}

const getCarts = async (req: Request, res: Response) => {
    const { accesstoken } = req.cookies
    const { productID } = req.query
    console.log(productID)
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'JWT secret not configured' });
    }
    const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET) as TokenPayload;
    const user = decoded.userId
    const [carts] = await db.query('SELECT * FROM carts WHERE user_id = ?', [user])
    const cart = carts as cartType[]
    if (productID) {
        const [products] = await db.query('SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ? ', [cart[0].id, productID])
        res.json({ products })
        console.log('hello')
        return
    }
    const [products] = await db.query('SELECT c.cart_id,c.added_at,c.id,c.product_id,c.quantity,b.DeliveryTime,p.name,p.secure_url,p.price FROM cart_items c JOIN products p ON product_id = p.id JOIN businesses b ON business_id = b.id  WHERE cart_id = ? ', [cart[0].id])
    res.json({ products })
}

export default getCarts




