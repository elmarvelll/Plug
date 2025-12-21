import axios from "axios"
import { useEffect, useState } from "react"
import type { Axios_Req_With_Url } from "../utils/config/axios_config"
import { cartSettings } from "../utils/cartLayout"
import CheckoutProduct from "./CheckoutProduct"
import PayoutButton from "./Payout"
import getDeliverydate from "../utils/getDeliverydate"
// const publicKey = 'pk_live_e3552cf8e5428a028a14324205e9e4a2fee8fdc9'
const publicKey = 'pk_test_d8a4253dfcff9309410078e66d9312dbcbba368f'


function CheckoutPage() {
    const [email, setemail] = useState<string | undefined>()
    const [orderID, setorderID] = useState<string | undefined>()
    const [user, setuser] = useState<string | undefined>()
    useEffect(() => {
        axios.get('http://localhost:3000/user', { Link: '/' } as Axios_Req_With_Url)
            .then((res) => {
                setemail(res.data[0].email)
                setorderID(res.data[0].id)
                setuser(res.data[0].user_id)
            })
    }, [])

    const settings = cartSettings()
    if (!settings) throw new Error('no cart state provided')
    const { cart, total } = settings
    const updatedCart = cart.map((product) => {
        return { ...product, DeliveryTime: getDeliverydate(product.DeliveryTime) }
    })
    return (
        <div style={{ width: '70%', height: '90%', padding: '20px', boxSizing: 'border-box', backgroundColor: 'black', borderRadius: '10px', position: 'relative' }}>
            <section style={{ overflow: 'auto', height: '400px' }}>
                {updatedCart.map((product) => {
                    return [<CheckoutProduct key={product.id} quantity={product.quantity} product_id={product.product_id} name={product.name} description={product.description} price={product.price} businessId={product.business_id} image={product.secure_url} stock={product.stock} cart_id={product.cart_id} deliverydate={product.DeliveryTime } />]
                })}
                {email && orderID && user &&
                    <PayoutButton user={user} updated_cart={updatedCart} cart_id={cart[0].cart_id} paystack_key={publicKey} total={total} email={email} orderId={orderID} />
                }
            </section>
        </div>
    )
}

export default CheckoutPage
