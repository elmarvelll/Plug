import styles from '../styles/mybusiness.module.css'


function Dashboard() {
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
                        <p> N40000</p>
                    </div>
                    <div className={styles.dashboard_datadiv}>
                        <h4>Pending Orders</h4>
                        <p>15 </p>
                    </div>
                    <div className={styles.dashboard_datadiv}>
                        <h4>Total Customers</h4>
                        <p>29</p>
                    </div>
                    <div className={styles.dashboard_datadiv}>
                        <h4>Total Sales</h4>
                        <p>13 </p>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Dashboard