import { useEffect } from 'react'
import styles from '../styles/mybusiness.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'




function Dashboard(props:{monthly_revenue:number,total_customers:number,total_products_sold:number,pending_orders:number}) {
    const {business} = useParams()
    return (
        <div className={styles.businessPage}>
            <div className={styles.title}>
                Dashboard
            </div>
            <div className={styles.businessPage_data}>
                <div className={styles.businessPage_intro}>
                    <h2>
                        Business Dashboard
                    </h2>
                    <p>
                        Welcome back! Here's how your student business is performing.
                    </p>
                </div>
                <div className={styles.dashboard_datasection}>
                    <div className={styles.dashboard_datadiv}>
                        <h4>Monthly Revenue</h4>
                        <p> ₦ {props.monthly_revenue}</p>
                    </div>
                    <div className={styles.dashboard_datadiv}>
                        <h4>Pending Orders</h4>
                        <p>{props.pending_orders} </p>
                    </div>
                    <div className={styles.dashboard_datadiv}>
                        <h4>Total Customers</h4>
                        <p>{props.total_customers}</p>
                    </div>
                    <div className={styles.dashboard_datadiv}>
                        <h4>Total Sales</h4>
                        <p>{props.total_products_sold} </p>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Dashboard