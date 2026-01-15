import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from '../styles/mybusiness.module.css'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { businessSettings } from '../Pages/mybusiness'


function BusinessNavbar(props: { business: string | undefined, name: string }) {
    const [params, setparams] = useSearchParams()
    const business_setting = businessSettings()
    if(!business_setting) throw new Error('no verif_state provided')
    const { unread_notifications } = business_setting
    const navigate = useNavigate()
    function Link(value: string) {
        setparams({ page: value })
    }
    useEffect(() => {
        setparams({ page: 'Dashboard' })
    }, [])



    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_header_container}>
                <p className={styles.navbar_back_button} onClick={() => navigate('/', { replace: true })}><FontAwesomeIcon icon={faArrowLeft} /> Back</p>
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
                <div onClick={() => { Link('Notifications') }} className={styles.navbar_link} style={{ display: 'flex', justifyContent: 'space-between' }}><span>Notifications</span> {unread_notifications.length > 0 && <span style={{ fontSize: 'small', paddingRight: '5px' }}>{unread_notifications.length}</span>}</div>
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