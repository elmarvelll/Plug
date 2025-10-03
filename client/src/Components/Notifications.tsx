import styles from '../styles/mybusiness.module.css'

function Notifications() {
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
                    <div>
                        You currently have no notifications
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Notifications