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

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'JWT secret not configured' });
    }
    const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET) as TokenPayload;
    const user = decoded.userId
    const [carts] = await db.query('SELECT * FROM carts WHERE user_id = ?', [user])
    const cart = carts as cartType[]
    const [products] = await db.query('SELECT * FROM cart_items JOIN products ON product_id = products.id WHERE cart_id = ? ', [cart[0].id])
    console.log(products)
    res.json({ products })
}

export default getCarts




