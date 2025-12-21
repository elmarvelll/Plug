import { Response, Request } from "express";
import db from "../utils/db";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { cartType, Order } from "../routes/payment.route";
import OrderEmails, { OrderItem } from "../utils/sendOrderEmails";
const verifyPayments = async (req: Request, res: Response) => {
    const { reference, orderId, email, cart_id, user_id, total, cart } = req.body
    const new_orderId = uuidv4()
    const products = cart as cartType[]
    console.log(products)
    await db.query('DELETE FROM cart_items WHERE cart_id = ?', [cart_id])
    const [rows] = await db.query('INSERT INTO orders(id, user_id, total_amount_in_kobo, payment_status, order_status, paystack_reference) VALUES (?,?,?,?,?,?)', [new_orderId, user_id, total, 'pending', 'processing', reference])
    products.forEach(async (product) => {
        const date = new Date(product.DeliveryTime)
        console.log(date)
        const db_date = date.toISOString().split('T')[0]
        await db.query('INSERT INTO order_items(order_id, product_id, quantity, price_in_kobo,delivery_date) VALUES (?,?,?,?,?)', [new_orderId, product.product_id, product.quantity, product.price * 100,db_date])
    });
    try {
        const paystackRes = await axios.get(
            `https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`,
                }, 
            }
        )
        try {
            if (paystackRes.data.data.status === 'success') {
                await db.query('UPDATE orders SET payment_status = ? WHERE paystack_reference = ?', ['paid', reference])
                products.forEach(async (product) => {
                    await db.query('UPDATE products SET stock = stock - ? WHERE id = ?',[product.quantity,product.product_id])
                });
                const [order] = await db.query('SELECT * FROM order_items JOIN products ON product_id = products.id WHERE order_id = ? ', [new_orderId])
                const orderItems = order as OrderItem[]
                await OrderEmails(orderItems, new_orderId, total)
            }
        } catch (err) {
            console.log('err updating order table' + err)
        }


        // update the status from pending to paid
        res.status(201).json({ status: 'success' })
    }
    catch (err) {
        console.log('error verifying payments' + err)
    }
}

export default verifyPayments