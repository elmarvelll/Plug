import { Response, Request } from "express";
import db from "../utils/db";
import timeAgo from "../utils/timeAgo";
export interface monthlyRevenue {
    revenue: string
}
export interface businessDetails {
    id: string;
    user_id: string;
    total_amount_in_kobo: string;
    payment_status: "paid" | "pending" | "failed" | string;
    order_status: "processing" | "completed" | "cancelled" | "pending" | string;
    paystack_reference: string;
    created_at: string | Date;
    updated_at: string | Date;

    order_id: string;
    product_id: string;

    quantity: number;
    price_in_kobo: string;
    subtotal: string;

    business_id: string;

    // Product fields
    name: string;
    description: string;
    price: number;
    stock: number;
    public_url: string;
    secure_url: string;
    status: string;
    public_id: string;

    // Business owner / business fields
    Number: string;
    Email: string;
    BusinessName: string;
    Category: string;
    BusinessDescription: string;
    delivery_date: Date;
    Hall: string;
    RoomNumber: string;
    owner_id: string;

    // Bank data
    Bank: string | null;
    account_number: string | null;

    first_name: string;
    last_name: string;
    username: string | null;
    email: string;
    password: string;
    school_email: string;
    number: string | number;
    room: string;
    hall: string;
}
export type ProductBusiness = {
    id: string;
    business_id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    public_url: string;
    secure_url: string;
    created_at: Date;
    updated_at: Date;
    status: string;
    Number: string;
    Email: string;
    BusinessName: string;
    Category: string;
    BusinessDescription: string;
    DeliveryTime: string;
    Hall: string;
    RoomNumber: string;
    owner_id: string;
    public_id: string;
    Bank: string | null;
    account_number: string | null;
};

const getBusinessStatistics = async (req: Request, res: Response) => {
    const name = req.params.business
    console.log(`hello ${name}`)
    try {
        const [query] = await db.query('SELECT orders.id,orders.user_id,orders.order_status,orders.total_amount_in_kobo,orders.created_at,o.delivery_date,o.quantity,u.first_name,u.last_name,p.name,o.price_in_kobo,u.room FROM plug.orders JOIN plug.order_items o ON orders.id = o.order_id JOIN plug.products p ON product_id = p.id JOIN plug.businesses b ON business_id = b.id JOIN plug.users u ON orders.user_id = plug.u.user_id WHERE BusinessName = ?', [name])
        const [second_query] = await db.query('SELECT SUM(subtotal) AS revenue from plug.orders JOIN plug.order_items ON orders.id = order_items.order_id JOIN plug.products ON product_id = products.id JOIN plug.businesses ON business_id = businesses.id WHERE MONTH(orders.created_at) = MONTH(CURDATE()) AND YEAR(orders.created_at) = YEAR(CURDATE()) AND BusinessName = ?', [name])
        const [third_query] = await db.query('SELECT * FROM plug.products JOIN plug.businesses ON business_id = businesses.id WHERE BusinessName = ?', [name])
        const total_products = third_query as ProductBusiness[]
        const value = second_query as monthlyRevenue[]
        const revenue = Number(value[0].revenue)
        const monthly_revenue = revenue / 100
        console.log(name, monthly_revenue)
        const fullbusinessStats = query as businessDetails[]
        const total_orders = fullbusinessStats.length
        const orderTable = fullbusinessStats.map((order) => {
            return {
                orderID: order.id,
                Customer: `${order.first_name} ${order.last_name}`,
                product: `${order.quantity} x ${order.name}`,
                value: Number(order.price_in_kobo) / 100,
                deliveryDate: order.delivery_date.toLocaleDateString()
            }
        })
        const pending_orders = fullbusinessStats.filter((order) => {
            return order.order_status === 'processing'
        })
        const completed_orders = fullbusinessStats.filter((order) => {
            return order.order_status === 'completed'
        })
        const notifications = fullbusinessStats.map((orders) => {
            return {
                quantity: orders.quantity,
                product_name: orders.name,
                Full_name: `${orders.first_name} ${orders.last_name}`,
                room: orders.room,
                created_at: timeAgo(orders.created_at)
            }
        })
        const total_customers = fullbusinessStats.reduce<businessDetails[]>((arr, order) => {
            if (!arr.some(x => x.user_id === order.user_id)) {
                arr.push(order)
            }
            return arr
        }, [])
        const total_revenue = fullbusinessStats.reduce((start, stats) => {
            let value = Number(stats.total_amount_in_kobo) / 100
            return value += start
        }, 0)
        const total_products_sold = fullbusinessStats.reduce((start, statistics) => {
            return statistics.quantity += start
        }, 0)
        console.log(monthly_revenue, total_customers.length, total_orders, completed_orders.length, pending_orders.length, total_products_sold, total_products.length, total_revenue)
        res.json({ monthly_revenue, total_customers: total_customers.length, total_orders, pending_orders: pending_orders.length, completed_orders: completed_orders.length, total_products_sold, total_products: total_products.length, total_revenue, notifications, orderTable })
    } catch (error) {
        console.log('error getting business statistics : ' + error)
    }

}
export default getBusinessStatistics