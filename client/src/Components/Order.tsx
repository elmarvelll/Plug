import { useState } from 'react'
import styles from '../styles/mybusiness.module.css'


function Order() {
    const [name, setName] = useState('All Orders')
    return (
        <div className={styles.businessPage}>
            <div className={styles.title}>
                Orders
            </div>
            <div className={styles.businessPage_data}>
                <div className={styles.businessPage_intro}>
                    <h2>
                        My Orders
                    </h2>
                    <p>
                        Track and manage your business orders with delivery milestones.
                    </p>
                </div>
                <div className={styles.order_datasection}>
                    <div className={styles.order_datadiv} onClick={() => setName('All Orders')}>
                        <h4>All Orders</h4>
                        <p>42 </p>
                    </div>
                    <div className={styles.order_datadiv} onClick={() => setName('Pending Orders')}>
                        <h4>Pending Orders</h4>
                        <p>29</p>
                    </div>
                    <div className={styles.order_datadiv} onClick={() => setName('Completed Orders')}>
                        <h4>Completed Orders</h4>
                        <p>13 </p>
                    </div>
                </div>
                <div className={styles.order_overview}>
                    <h2 >{name}</h2>
                    <div className={styles.order_ordermenu}>
                        <div>
                            <span>Order ID</span>
                            <span>Customer</span>
                            <span>product</span>
                            <span>Value</span>
                            <span>Due date</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Order