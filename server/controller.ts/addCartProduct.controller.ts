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
    const { productId,price } = req.body
    const id = uuidv4()
    console.log(cart[0])
    try {
        await db.query('INSERT INTO cart_items (id,cart_id,product_id,price) VALUES(?,?,?,?)', [id, cart[0].id, productId,price])
        const [products] = await db.query('SELECT c.cart_id,c.added_at,c.id,c.product_id,c.quantity,b.DeliveryTime,p.name,p.secure_url,p.price FROM plug.cart_items c JOIN plug.products p ON product_id = p.id JOIN plug.businesses b ON business_id = b.id WHERE cart_id = ? ', [cart[0].id])
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