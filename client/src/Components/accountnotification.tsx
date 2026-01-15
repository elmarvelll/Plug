import { useEffect, useState } from 'react'
import styles from '../styles/mybusiness.module.css'
import axios from 'axios'
import AccountNoti from './accountNoti';
export interface notitype {
    id: string;                     // UUID
    user_id: string;                 // ID of the user receiving the notification
    title: string;                   // Short heading, e.g., "Order Received"
    message: string;                 // Detailed message
    type: "order" | "payment" | "system"; // Type of notification
    related_order_id: string;  // Optional, link to order
    is_read: boolean;                 // Whether user has seen it
    created_at: string;             // ISO timestamp or Date string
}

function AccountNotifications() {
    const [notification, setnotification] = useState<notitype[]>([])
    useEffect(() => {
        axios.get(`http://localhost:3000/user/notifications`)
            .then(res => {
                setnotification(res.data.notifications)
            })
    }, [])

    return (

        <div className={styles.businessPage}>

            <div className={styles.title}>
                Notifications
            </div>

            <div className={styles.businessPage_data}>
                <div className={styles.notification_div}>
                    <h2>
                        Recent Activity
                    </h2>
                    <div style={{ overflow: 'scroll', height: '250px' }}>
                        {notification.length > 0 ? notification.map((noti, index) => {
                            return (
                                <AccountNoti key={index} order_id={noti.related_order_id} id={noti.id} created_at={noti.created_at} is_read={noti.is_read} />
                            )
                        })
                            :
                            <div>
                                <p>
                                    You currently have no notifications
                                </p>
                            </div>}

                    </div>
                </div>
            </div>

        </div>
    )
}
export default AccountNotifications