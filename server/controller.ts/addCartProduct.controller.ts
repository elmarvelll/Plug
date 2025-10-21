import { Response, Request } from "express";
import db from "../utils/db";
import { v4 as uuidv4 } from 'uuid';



type cartType = {
    id: string;
    user_id: string;
    created_at: string
}

const addCartProduct = async (req: Request, res: Response) => {
    const user = req.user?.userId
    const [carts] = await db.query('SELECT * FROM carts WHERE user_id = ?', [user])
    const cart = carts as cartType[]
    const { productId } = req.body
    const id = uuidv4()
    try {
        await db.query('INSERT INTO cart_items (id,cart_id,product_id) VALUES(?,?,?)', [id, cart[0].id, productId])
        const [products] = await db.query('SELECT * FROM cart_items JOIN products ON product_id = products.id WHERE cart_id = ? ', [cart[0].id])
        console.log(products)
        res.status(201).json({ message: 'added to cart successfully',products })
    }
    catch (e) {
        console.log('error inserting product to cart ' + e)
    }
}

export default addCartProduct

// import dotenv from 'dotenv';

// dotenv.config();
// export const AuthenticateUser = (req: Request, res: Response, next: NextFunction) => {

//   try {
//     const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET) as TokenPayload;
//     console.log('success from auth utils')
//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error('error from auth utils : ', error);
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// }