import axios from "axios"
import React, { createContext, useContext, useEffect, useState } from "react"
import type { Axios_Req_With_Url } from "./config/axios_config"
import type { Product } from "./types/product.types";

export interface cartType extends Product {
    added_at: string;
    cart_id: string;
    id: string;
    product_id: string;
    quantity: number;
    DeliveryTime: string
}

export interface notitype {
    id: string;                     // UUID
    user_id: string;                 // ID of the user receiving the notification
    title: string;                   // Short heading, e.g., "Order Received"
    message: string;                 // Detailed message
    type: "order" | "payment" | "system"; // Type of notification
    related_order_id?: string | null;  // Optional, link to order
    is_read: boolean;                 // Whether user has seen it
    created_at: string;               // ISO timestamp or Date string
}
type cartContextType = {
    add_to_cart: (productId: string, price: number) => void
    cart: cartType[]
    setcart: React.Dispatch<React.SetStateAction<cartType[]>>
    notifications: notitype[]
    setnotifications: React.Dispatch<React.SetStateAction<notitype[]>>
    businessnotifications: notitype[]
    setbusinessnotifications: React.Dispatch<React.SetStateAction<notitype[]>>
    viewCart: boolean | null;
    setviewcart: React.Dispatch<React.SetStateAction<boolean | null>>;
    setscrollHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
    scrollheight: number | undefined
    settotal: React.Dispatch<React.SetStateAction<number>>;
    total: number
}

export const cartContext = createContext<cartContextType | null>(null)

function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setcart] = useState<cartType[]>([])
    const [notifications, setnotifications] = useState<notitype[]>([])
    const [businessnotifications, setbusinessnotifications] = useState<notitype[]>([])
    const [viewCart, setviewcart] = useState<boolean | null>(false)
    const [scrollheight, setscrollHeight] = useState<number | undefined>(0)
    const [total, settotal] = useState<number>(0)

    useEffect(() => {
        settotal(cart.reduce((sum, item) => {
            return sum + (item.price * item.quantity)
        }, 0))
    }, [cart])


    const add_to_cart = async (productId: string, price: number) => {
        const postreq = await axios.post('http://localhost:3000/cart/addProduct', { productId, price }, { Link: '/' } as Axios_Req_With_Url)
        const { products } = postreq.data
        setcart(products)
        console.log(products)
    }


    return (
        <cartContext.Provider value={{ add_to_cart, cart, setcart, notifications, setnotifications, businessnotifications,setbusinessnotifications,viewCart, setviewcart, scrollheight, setscrollHeight, total, settotal }}>
            {children}
        </cartContext.Provider>
    )
}
export const cartSettings = () => useContext(cartContext)
export default CartProvider