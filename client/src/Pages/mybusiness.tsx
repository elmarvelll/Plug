import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import styles from '../styles/mybusiness.module.css'
import BusinessNavbar from "../Components/BusinessNavbar";
import Dashboard from "../Components/Dashboard";
import Order from "../Components/Order";
import BusinessProfile from "../Components/BusinessProfile";
import Products from "../Components/Products";
import Notifications from "../Components/Notifications";
import { createContext, useContext, useEffect, useState, type SetStateAction } from "react";
import Addproduct from "../Components/Addproduct";
import axios from "axios";
export interface notiType {
    quantity: number,
    product_name: string,
    Full_name: string,
    room: string,
    created_at: string
}
export interface orderType {
    orderID: string,
    Customer: string,
    product: string,
    value: Number,
    deliveryDate: string
}
interface statsType {
    monthly_revenue: number,
    total_customers: number,
    total_orders: number,
    pending_orders: number,
    completed_orders: number,
    total_products_sold: number,
    total_products: number
    total_revenue: number
    notifications: notiType[]
    orderTable: orderType[]
}

function isNotiType(obj: any): obj is notiType {
    return (
        obj &&
        typeof obj.quantity === "number" &&
        typeof obj.product_name === "string" &&
        typeof obj.Full_name === "string" &&
        typeof obj.room === "string" &&
        typeof obj.created_at === "string"
    );
}
function isOrderType(obj: any): obj is notiType {
    return (
        obj &&
        typeof obj.orderID === "string" &&
        typeof obj.Customer === "string" &&
        typeof obj.product === "string" &&
        typeof obj.value === "number" &&
        typeof obj.deliveryDate === "string"
    );
}
function isStatType(obj: any): obj is statsType {
    return (
        obj !== null &&
        typeof obj === "object" &&
        typeof obj.monthly_revenue === "number" &&
        typeof obj.total_customers === "number" &&
        typeof obj.total_orders === "number" &&
        typeof obj.pending_orders === "number" &&
        typeof obj.completed_orders === "number" &&
        typeof obj.total_products_sold === "number" &&
        typeof obj.total_products === "number" &&
        typeof obj.total_revenue === "number" &&
        Array.isArray(obj.notifications) &&
        obj.notifications.every(isNotiType) &&
        Array.isArray(obj.orderTable) &&
        obj.orderTable.every(isOrderType)
    );
}
interface BusinessContexttype {
    unread_notifications: BusinessNotification[]
    setunread_notifications: React.Dispatch<React.SetStateAction<BusinessNotification[]>>
}
const businessContext = createContext<BusinessContexttype | null>(null)
function mybusiness() {
    const { business } = useParams<{ business: string }>();
    const [notifications, setnotifications] = useState<BusinessNotification[]>([])
    const [unread_notifications, setunread_notifications] = useState<BusinessNotification[]>([])
    const [addProduct, setaddProduct] = useState<boolean>(false)
    const [initStats, setInitstats] = useState({})
    const [stats, setstats] = useState<statsType>({
        monthly_revenue: 0,
        total_customers: 0,
        total_orders: 0,
        pending_orders: 0,
        completed_orders: 0,
        total_products_sold: 0,
        total_products: 0,
        total_revenue: 0,
        notifications: [],
        orderTable: []
    })
    const changeaddProductState = () => setaddProduct(buttonState => !buttonState)
    const [params, setparams] = useSearchParams()
    const navigate = useNavigate()
    const page = params.get('page')
    useEffect(() => {
        axios.get(`http://localhost:3000/business/mybusiness/${business}/get_business_stats`)
            .then(res => setInitstats(res.data))
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:3000/business/mybusiness/${business}/notifications`)
            .then(res => {
                setnotifications(res.data.Notification)
                setunread_notifications(res.data.Notification.filter((noti: BusinessNotification) => {
                    return boolean(noti.is_read) === false
                }))
            })
    }, [])
    useEffect(() => {
        if (isStatType(initStats)) {
            setstats(initStats)
        }
    }, [initStats])
    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            navigate('/', { replace: true });
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    return (
        <businessContext.Provider value={{unread_notifications,setunread_notifications}}>
            <section className={styles.My_business_section}>
                <BusinessNavbar business={business} name="Ifezue Marvelous" />
                {page === 'Dashboard' && <Dashboard monthly_revenue={stats.monthly_revenue} total_customers={stats.total_customers} total_products_sold={stats.total_products_sold} pending_orders={stats.pending_orders} />}
                {page === 'Orders' && <Order total_orders={stats.total_orders} pending_orders={stats.pending_orders} completed_orders={stats.completed_orders} orders={stats.orderTable} />}
                {page === 'My Business' && <BusinessProfile businessName={business} />}
                {page === 'Notifications' && <Notifications notifications={notifications} />}
                {page === 'Products' &&
                    <Products
                        addProduct={addProduct}
                        changeaddProductState={changeaddProductState}
                        businessName={business}
                        total_products={stats.total_products}
                        total_sold={stats.total_products_sold}
                        total_revenue={stats.total_revenue}
                    />}
                {addProduct &&
                    <Addproduct
                        removepage={() => setaddProduct(false)}
                        businessName={business}
                    />
                }
            </section >
        </businessContext.Provider>
    )
}
export const businessSettings = () => useContext(businessContext)
export default mybusiness




export interface BusinessNotification {
    id: string;
    business_id: string;

    title: string;
    type: "order" | "payment" | "system"; // extensible
    related_order_id: string;
    related_payment_reference: string | null;
    is_read: number // map 0/1 → boolean in backend or frontend
    created_at: string; // MySQL DATETIME
}
export function boolean(num: number) {
    if (num === 0) return false
    if (num === 1) return true
}