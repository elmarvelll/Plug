import { Response, Request } from "express";
import db from "../utils/db";
import { comparePassword } from "../utils/hash";
import { credential } from "./Login.controller";
import { Order } from "../routes/payment.route";

interface usertype {
    email: string,
    user_id: string,
    first_name: string,
    last_name: string,
    number: string,
    hall: string,
    room: string
    school_email: string
}
export interface OrderItem {
    id: string;                 // '51558452-f3fa-4693-b062-3bfe49f25b47'
    order_status: string
    quantity: number;           // '1'
    price_in_kobo: number;              // '20000000.00'
    delivery_date: string;         // '2025-12-23' (ISO date string)
    name: string;     // 'Laptop'
    BusinessName: string
    secure_url: string;          // Cloudinary URL
}

const getUserDetails = async (req: Request, res: Response) => {
    const userID = req.user?.userId
    const password = req.query.password as string
    const orderstatus = req.query.orderState as string
    if (password) {
        try {
            const [row] = await db.query('SELECT * FROM users WHERE user_id = ? ', [userID])
            const users = row as credential[]
            const passwordCheck = await comparePassword(password, users[0].password)
            console.log(passwordCheck)
            res.json({ status: passwordCheck })
        } catch (error) {
            console.log('error veryfiing password' + error)
        }
    }

    if (orderstatus) {
        try {
            const [row] = await db.query('SELECT orders.id,order_status,o.quantity,o.price_in_kobo,o.delivery_date,p.name,p.secure_url,b.BusinessName  FROM plug.orders JOIN plug.order_items o ON orders.id = o.order_id JOIN plug.products p  on product_id = p.id JOIN plug.businesses b ON business_id = b.id WHERE user_id = ? AND order_status = ? ', [userID, orderstatus])
            const [secondrow] = await db.query('SELECT * from plug.orders WHERE user_id = ? AND order_status = ? ', [userID, orderstatus])

            const Items = row as OrderItem[]
            const orders = secondrow as Order[]
            const orderTable = orders.map((order) => {
                return {
                    orderID: order.id,
                    order_status: order.order_status,
                    value: order.total_amount_in_kobo / 100,
                    created_at: new Date(order.created_at).toLocaleDateString()
                }
            })
            const orderItems = Items.map((order) => {
                const date = new Date(order.delivery_date + 'T23:00:00.000Z')
                return {
                    id: order.id,                // '51558452-f3fa-4693-b062-3bfe49f25b47'
                    order_status: order.order_status,
                    quantity: order.quantity,          // '1'
                    price: Number(order.price_in_kobo) / 100,              // '20000000.00'
                    delivery_date:  date.toLocaleDateString(),         // '2025-12-23' (ISO date string)
                    name: order.name,      // 'Laptop'
                    secure_url: order.secure_url,
                    BusinessName : order.BusinessName
                }
            })
            console.log(orderItems)
            res.json({ orders: orderTable, orderItems })
        } catch (error) {
            console.log('error veryfiing password' + error)
        }
    }

    else {

        try {
            const [row] = await db.query('SELECT * FROM users JOIN carts ON users.user_id = carts.user_id WHERE users.user_id = ? ', [userID])
            const users = row as usertype[]
            res.json({ users })
        } catch (error) {
            console.log('err getting user')
        }
    }


}
export default getUserDetails