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
}

type cartContextType = {
    add_to_cart: (productId: string) => void
    cart: cartType[]
    setcart: React.Dispatch<React.SetStateAction<cartType[]>>
    viewCart: boolean | null;
    setviewcart: React.Dispatch<React.SetStateAction<boolean | null>>;
    setscrollHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
    scrollheight: number | undefined
}

export const cartContext = createContext<cartContextType | null>(null)

function CartLayout({ children }: { children: React.ReactNode }) {
    const [cart, setcart] = useState<cartType[]>([])
    const [viewCart, setviewcart] = useState<boolean | null>(false)
    const [scrollheight, setscrollHeight] = useState<number | undefined>(0)



    const add_to_cart = async (productId: string) => {
        const postreq = await axios.post('http://localhost:3000/cart/addProduct', { productId }, { Link: '/' } as Axios_Req_With_Url)
        const { products } = postreq.data
        setcart(products)

    }


    return (
        <cartContext.Provider value={{ add_to_cart, cart, setcart, viewCart, setviewcart, scrollheight, setscrollHeight }}>
            {children}
        </cartContext.Provider>
    )
}
export const cartSettings = () => useContext(cartContext)
export default CartLayout