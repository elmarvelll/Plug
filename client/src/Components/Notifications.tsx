import { useState } from 'react'
import type { BusinessNotification, notiType } from '../Pages/mybusiness'
import styles from '../styles/mybusiness.module.css'
import BusinessNoti from './businessNoti'
import timeAgo from '../utils/timeAgo'

function Notifications(props: { notifications: BusinessNotification[] }) {
    
    return (

        <div className={styles.businessPage}>

            <div className={styles.title}>
                Notifications
            </div>

            <div className={styles.businessPage_data}>
                <div className={styles.businessPage_intro}>
                    <h2>
                        Notifications
                    </h2>
                    <p>
                        Check new notifications about your business
                    </p>
                </div>
                <div className={styles.notification_div}>
                    <h2>
                        Recent Activity
                    </h2>
                    <p>
                        Latest updates on your business
                    </p>
                    <div style={{ overflow: 'scroll', height: '200px' }}>
                        {props.notifications.length > 0 ? props.notifications.map((noti, index) => {
                            return (
                                <BusinessNoti key={index} id= {noti.id} order_id = {noti.related_order_id} is_read = {noti.is_read} created_at={timeAgo(noti.created_at)}  />
                            )
                        })
                            :
                            <p>
                                You currently have no notifications
                            </p>
                        }

                    </div>
                </div>
            </div>

        </div>
    )
}
export default Notifications