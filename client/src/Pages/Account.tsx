import { useNavigate, useSearchParams } from "react-router-dom"
import styles from '../styles/mybusiness.module.css'
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNavbar from "../Components/AccountNavbar";
import AccountProfile from "../Components/accountprofile";
import AccountOrder, { type OrderItem } from "../Components/accountorders";
import AccountNotifications from "../Components/accountnotification";
import ChangePassWord from "../Components/ChangePassword";
import Orderdetails from "../Components/Orderdetails";
import type { Axios_Req_With_Url } from "../utils/config/axios_config";
import { cartSettings } from "../utils/cartProvider";
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
export interface usertype {
    email: string,
    user_id: string,
    first_name: string,
    last_name: string,
    number: string,
    hall: string,
    room: string
    school_email: string
    secure_url: string
}
interface userStats {
    users: usertype[]
}

function user(obj: any): obj is notiType {
    return (
        obj &&
        typeof obj.email === "number" &&
        typeof obj.first_name === "string" &&
        typeof obj.last_name === "string" &&
        typeof obj.room === "string" &&
        typeof obj.hall === "string" &&
        typeof obj.school_email === "string" &&
        typeof obj.user_id === "string" &&
        typeof obj.secure_url === "string"

    );
}
function isUserType(obj: any): obj is userStats {
    return (
        obj !== null &&
        Array.isArray(obj.users) &&
        obj.users.every(user)
    );
}
function Account() {
    const settings = cartSettings()
    if (!settings) throw new Error('no cart_state provided')
    const { setnotifications,notifications } = settings

    const [changePassword, setchangePassword] = useState<boolean>(false)
    const [orderdetails, setorderdetails] = useState<boolean>(false)
    const [orderItems, setorderItems] = useState<OrderItem[]>([])
    const [userdetails, setuserdetails] = useState<userStats>({
        users: []
    })
    const changepasswordState = () => setchangePassword(buttonState => !buttonState)
    const viewOrderdetails = () => setorderdetails(buttonState => !buttonState)
    const updateOrderList = (params: OrderItem[]) => setorderItems(params)

    const [params, setparams] = useSearchParams()
    const navigate = useNavigate()
    const page = params.get('page')
    useEffect(() => {
        axios.get(`http://localhost:3000/user/user_details`, { Link: '/my_account?page=Profile' } as Axios_Req_With_Url)
            .then(res => setuserdetails(res.data))
    }, [])
    useEffect(() => {
        axios.get('http://localhost:3000/user/unread_notifications')
            .then((res) => {
                setnotifications(res.data.Notification)
            })
    }, [])
    useEffect(() => {
        if (isUserType(userdetails)) {
            setuserdetails(userdetails)
        }
    }, [userdetails])
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
        <section className={styles.My_business_section}>
            {
                userdetails.users.length !== 0 &&
                <>
                    <AccountNavbar number={notifications.length} name={`${userdetails.users[0].last_name} ${userdetails.users[0].first_name}`} />
                    {page === 'Profile' && <AccountProfile userId={userdetails.users[0].user_id} user={userdetails.users} changepasswordState={changepasswordState} />}
                    {page === 'Orders' && <AccountOrder viewOrderdetails={viewOrderdetails} updateOrderList={updateOrderList} />}
                    {page === 'Notifications' && <AccountNotifications />}
                    {/* {page === 'My Business' && <BusinessProfile businessName={business} />} */}
















                    {changePassword &&
                        <ChangePassWord
                            removepage={() => setchangePassword(false)}
                            userId={userdetails.users[0].user_id}
                        />
                    }
                    {orderdetails &&
                        <Orderdetails
                            removepage={() => setorderdetails(false)}
                            userId={userdetails.users[0].user_id}
                            orderItems={orderItems}
                        />

                    }
                </>
            }
        </section >
    )
}
export default Account