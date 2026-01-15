import axios from "axios"
import { useEffect, useState } from "react"
import type { Axios_Req_With_Url } from "../utils/config/axios_config"
import { cartSettings } from "../utils/cartProvider"
import CheckoutProduct from "./CheckoutProduct"
import PayoutButton from "./Payout"
import getDeliverydate from "../utils/getDeliverydate"
import { useNavigate } from "react-router-dom"
import DeliveryInfo from "./DeliveryInfo"
// const publicKey = 'pk_live_e3552cf8e5428a028a14324205e9e4a2fee8fdc9'
const publicKey = 'pk_test_d8a4253dfcff9309410078e66d9312dbcbba368f'
export interface userCred {
    Name: string,
    Email: string,
    Number: string,
    Address: string
}

function CheckoutPage() {
    const [email, setemail] = useState<string | undefined>()
    const [usercred, setusercred] = useState<userCred>({
        Name: '',
        Email: '',
        Number: '',
        Address: ''
    })
    const navigate = useNavigate()

    const [orderID, setorderID] = useState<string | undefined>()
    const [user, setuser] = useState<string | undefined>()
    useEffect(() => {
        axios.get('http://localhost:3000/user', { Link: '/' } as Axios_Req_With_Url)
            .then((res) => {
                setusercred(prev => {
                    return {
                        ...prev,
                        Name: `${res.data[0].last_name} ${res.data[0].first_name}`,
                        Email: res.data[0].email,
                        Number: res.data[0].number,
                        Address: `${res.data[0].hall} ${res.data[0].room}`
                    }
                })
                setemail(res.data[0].email)
                setorderID(res.data[0].id)
                setuser(res.data[0].user_id)
            })
    }, [])
    function Update(name: string, value: string) {
        setusercred(prevVal => {
            return ({ ...prevVal, [name]: value })
        })
    }

    const settings = cartSettings()
    if (!settings) throw new Error('no cart state provided')
    const { cart, total } = settings
    const updatedCart = cart.map((product) => {
        return { ...product, DeliveryTime: getDeliverydate(product.DeliveryTime) }
    })
    if (cart.length === 0) {
        navigate(0)
    }
    return (
        <div style={{ width: '70%', height: '90%', padding: '20px', boxSizing: 'border-box', border: '1px solid #2A2F3A', backgroundColor: '#0F1115', borderRadius: '10px', position: 'relative' }}>
            <h1 style={{ color: '#F5F7FA' }}>Checkout</h1>
            <div style={{ display: 'flex', height: '100%' }}>
                <section style={{ overflow: 'auto', flex: '1', margin: '10px', padding: '0px 10px' }}>
                    <h3>Delivery Information</h3>
                    <DeliveryInfo user={usercred} update={Update} />
                </section>

                <section style={{ overflow: 'auto', flex: '1', position: 'relative', margin: '10px' }}>
                    <h3>Order Summary</h3>
                    <div style={{height:'200px',overflow:'auto'}}>
                        {updatedCart.length !== 0 && updatedCart.map((product) => {
                            return <CheckoutProduct key={product.id} quantity={product.quantity} product_id={product.product_id} name={product.name} description={product.description} price={product.price} businessId={product.business_id} image={product.secure_url} stock={product.stock} cart_id={product.cart_id} deliverydate={product.DeliveryTime} />
                        })}
                    </div>
                    {updatedCart.length !== 0 && email && orderID && user &&
                        <PayoutButton user={user} updated_cart={updatedCart} cart_id={cart[0].cart_id} paystack_key={publicKey} total={total} email={email} orderId={orderID} />
                    }
                </section>
            </div >

        </div >
    )
}

export default CheckoutPage
