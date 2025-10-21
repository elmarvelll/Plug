import axios from "axios"
import { useEffect } from "react"
import type { Axios_Req_With_Url } from "../utils/config/axios_config"
import { cartSettings } from "../utils/cartLayout"
import CheckoutProduct from "./CheckoutProduct"


function CheckoutPage() {

    function Payout() {
        console.log('payout button was clicked')
    }

    const settings = cartSettings()
    if (!settings) throw new Error('no cart state provided')
    const { cart } = settings
    return (
        <div style={{ width: '70%', height: '90%', padding: '20px', boxSizing: 'border-box', backgroundColor: 'black', borderRadius: '10px', position: 'relative' }}>
            <section style={{ overflow: 'auto', height: '400px' }}>
                {cart.map((product) => {
                    return [<CheckoutProduct key={product.id} name={product.name} description={product.description} price={product.price} businessId={product.business_id} image={product.secure_url} />]
                })}
                <div style={{ position: 'absolute', bottom: 0, width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <button className="AddButton" style={{ fontSize: 'medium', width: '80%', boxSizing: 'border-box', marginBottom: '20px' }} onClick={Payout}>Proceed To Pay</button>
                </div>
            </section>
        </div>
    )
}

export default CheckoutPage