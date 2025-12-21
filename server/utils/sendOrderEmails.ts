import { Resend } from "resend";
import db from "./db";


export type OrderItem = {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    price_in_kobo: string;
    subtotal: string;
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
};

const resend = new Resend(process.env.RESEND_SECRET_KEY)

async function OrderEmails(orderItems: OrderItem[], orderId: string,total:number) {
    try {
        await resend.emails.send({
            from: 'Plug <onboarding@resend.dev>',
            to: ['delivered@resend.dev'],
            subject: 'Order Sent',
            html: `
<div style="font-family: 'Comfortaa', sans-serif; padding: 20px; background:black; width:100%; height:100%;">
  <div style="max-width:600px; margin:auto; background:rgb(18, 18, 18); border-radius:8px; padding:25px; border: 1px solid #FF7A00;">
    <h2 style="color:#FF7A00; font-family: 'Comfortaa', sans-serif; margin-bottom:10px;">Order Confirmed </h2>

    <p style="color:white; font-size:15px; font-family: 'Comfortaa', sans-serif;">
      Thank you for your order! Your payment has been received and your order is now being processed.
    </p>

    <div style="background:#333; border:1px solid #ddd; border-radius:6px; padding:15px; margin-top:15px;">
      <p style="color:white; font-size:14px;"><strong>Order ID:</strong> ${orderId}</p>      
      <p style="color:white; font-size:14px;">items:</p>

            ${orderItems.map((item) => `
                <p style="margin:5px 0; color:white; font-size:14px;"> Quantity:${item.quantity} Name: ${item.name} item price:₦  ${item.price} Total Amount : ₦ ${Number(item.subtotal)/100}</p>`)}

                      <p style="color:white; font-size:14px;"><strong>Amount Paid:</strong> ₦ ${total/100}</p>

    </div>

        <p style="margin-top:35px; color:white; font-size:13px;">
            If you have any questions, reply to this email.
    </p>
    </div>
                </div>`
        });
    } catch (error) {
        console.log('err uploading email ' + error)
    }

    // await resend.emails.send({
    //     from:'',
    //     to:'',
    //     subject:'',
    //     html:''
    // })
}
export default OrderEmails