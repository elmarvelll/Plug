import { useSearchParams } from 'react-router-dom'
import styles from '../styles/mybusiness.module.css'
import { useEffect } from 'react'


function BusinessNavbar(props: { business: string | undefined, name: string }) {
    const [params, setparams] = useSearchParams()
    function Link(value: string) {
        setparams({ page: value })
    }
    useEffect(() => {
        setparams({ page: 'Dashboard' })
    }, [])



    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_header_container}>
                <div className={styles.navbar_header}>
                    {props.business}
                </div>
                <p className={styles.navbar_header_sub}>
                    Your Business Hub
                </p>
            </div>
            <div className={styles.navbar_links}>
                <div onClick={() => { Link('Dashboard') }} className={styles.navbar_link}>Dashboard</div>
                <div onClick={() => { Link('Orders') }} className={styles.navbar_link}>Orders</div>
                <div onClick={() => { Link('Notifications') }} className={styles.navbar_link}>Notifications</div>
                <div onClick={() => { Link('My Business') }} className={styles.navbar_link}>My Business</div>
                <div onClick={() => { Link('Products') }} className={styles.navbar_link}>Products</div>
            </div>
            <div className={styles.navbar_footer_container}>
                <div className={styles.navbar_footer}>
                    Ifezue Marvelous
                </div>
                <p className={styles.navbar_header_sub}>
                    Entrepreneur
                </p>
            </div>
        </div>
    )
}
export default BusinessNavbar