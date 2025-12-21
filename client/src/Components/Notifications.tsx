import type { notiType } from '../Pages/mybusiness'
import styles from '../styles/mybusiness.module.css'

function Notifications(props: { notifications: notiType[] }) {
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
                    <div style={{overflow:'scroll',height:'200px'}}>
                        You currently have no notifications
                        {props.notifications.map((noti,index) => {
                            return (
                                <div className={styles.notification}
                                key={index}>
                                    <h3>
                                        New Order!
                                    </h3>
                                    <p style={{ margin: '0px' }}>
                                        new order for {noti.quantity}x {noti.product_name} for {noti.Full_name} in {noti.room}
                                    </p>
                                    <p style={{position:'absolute',fontSize:'x-small',right:'0',bottom:'0',margin:'0px',padding:'10px'}}>
                                        {noti.created_at}
                                    </p>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>

        </div>
    )
}
export default Notifications