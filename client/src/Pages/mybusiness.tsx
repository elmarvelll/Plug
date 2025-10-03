import { useLocation, useParams, useSearchParams } from "react-router-dom"
import styles from '../styles/mybusiness.module.css'
import BusinessNavbar from "../Components/BusinessNavbar";
import Dashboard from "../Components/Dashboard";
import Order from "../Components/Order";
import BusinessProfile from "../Components/BusinessProfile";
import Products from "../Components/Products";
import Notifications from "../Components/Notifications";
import { useEffect, useState } from "react";
import Addproduct from "../Components/Addproduct";
function mybusiness() {
    const { business } = useParams<{ business: string }>();
    const [addProduct, setaddProduct] = useState<boolean>(false)
    const changeaddProductState = () => setaddProduct(buttonState => !buttonState)
    const [params, setparams] = useSearchParams()
    const page = params.get('page')

    return (
        <section className={styles.My_business_section}>
            <BusinessNavbar business={business} name="Ifezue Marvelous" />
            {page === 'Dashboard' && <Dashboard />}
            {page === 'Orders' && <Order />}
            {page === 'My Business' && <BusinessProfile businessName={business} />}
            {page === 'Notifications' && <Notifications />}
            {page === 'Products' &&
                <Products
                    addProduct={addProduct}
                    changeaddProductState={changeaddProductState}
                    businessName={business}
                />}
            {addProduct &&
                <Addproduct
                    removepage={() => setaddProduct(false)}
                    businessName={business}
                />
            }
        </section >
    )
}
export default mybusiness