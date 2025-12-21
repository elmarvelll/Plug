import express from "express";
import verifyPayments from "../controller.ts/verifyPayments.controller";
const router = express.Router()

export interface Order {
    id: string; // CHAR(36)
    user_id: string; // CHAR(36)
    total_amount_in_kobo: number; // DECIMAL(10,2)
    payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
    order_status: 'processing' | 'completed' | 'failed';
    paystack_reference: string;
    created_at: Date;
    updated_at: Date;
}

export interface Product {
    id: string;                // UUID
    business_id: string;       // UUID of the business
    name: string;
    description: string;
    price: number;             // stored as number for calculations
    stock: number;
    public_url: string;        // from Cloudinary
    secure_url: string;        // from Cloudinary
    status: "active" | "inactive" // product state
    created_at: string;        // ISO date string from backend
    updated_at: string;        // ISO date string from backend
}
export interface cartType extends Product {
    added_at: string;
    cart_id: string;
    id: string;
    product_id: string;
    quantity: number;
    DeliveryTime:string
}

router.post('/verify_payments', verifyPayments)

export default router