import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from '../styles/mybusiness.module.css'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'


function AccountNavbar(props: { name: string, number: number }) {
    const [params, setparams] = useSearchParams()
    const navigate = useNavigate()
    function Link(value: string) {
        setparams({ page: value })
    }
    useEffect(() => {
        setparams({ page: 'Profile' })
    }, [])

    function LogOut() {
        axios.post(`http://localhost:3000/user/logout`)
            .then(() => window.location.href = '/')
    }
    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_header_container}>
                <p className={styles.navbar_back_button} onClick={() => navigate('/', { replace: true })}><FontAwesomeIcon icon={faArrowLeft} /> Back</p>
                <h3 className={styles.navbar_header_sub}>
                    Manage account
                </h3>
            </div>
            <div className={styles.navbar_links}>
                <div onClick={() => { Link('Profile') }} className={styles.navbar_link}>Profile</div>
                <div onClick={() => { Link('Orders') }} className={styles.navbar_link}>Orders/Activity</div>
                <div onClick={() => { Link('Notifications') }} className={styles.navbar_link} style={{ display: 'flex', justifyContent: 'space-between' }}><span>Notifications</span> {props.number > 0 && <span style={{ fontSize: 'small', paddingRight: '5px' }}>{props.number}</span>}</div>
                <div onClick={LogOut} className={styles.navbar_link}>Logout</div>
            </div>
            <div className={styles.navbar_footer_container}>
                <div className={styles.navbar_footer}>
                    {props.name}
                </div>
            </div>
        </div>
    )
}
export default AccountNavbar