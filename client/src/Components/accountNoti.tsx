import axios from 'axios'
import styles from '../styles/mybusiness.module.css'
import { useEffect, useState } from 'react'
import { cartSettings } from '../utils/cartProvider'

function AccountNoti(props: { order_id: string,id: string, created_at: string, is_read: boolean }) {
    const [readState, setreadState] = useState(false)
    const settings = cartSettings()
    if (!settings) throw new Error('no cart_state provided')
    const { setnotifications } = settings
    useEffect(() => {
        setreadState(props.is_read)
    }, [])
    function isRead(id: string) {
        setnotifications(prevObj => {
            return prevObj
            .filter((noti) => {
                return noti.id !== props.id
            })
        })
        axios.put(`http://localhost:3000/user/notifications`, {
            id
        })
            .then(() => setreadState(true))
    }
    return (
        <div className={styles.notification}>
            <h3>
                Payment Successful!
            </h3>
            <p style={{ margin: '0px 0px 10px', fontSize: 'small' }}>
                Your order{props.order_id} is being Processed
            </p>
            <p style={{ margin: '0px', fontSize: 'small' }}>
                View Order tab for more detatils
            </p>
            <p style={{ position: 'absolute', fontSize: 'x-small', right: '0', bottom: '0', margin: '0px', padding: '10px' }}>
                {props.created_at}
            </p>
            <div style={{ display: 'flex', position: 'absolute', top: 0, right: 0, padding: '10px' }}>
                {!readState && <button onClick={() => isRead(props.id)} style={{ backgroundColor: '#4F8CFF', color: 'white', fontSize: 'x-small', padding: '5px', borderRadius: '10px', margin: '0px 5px' }} >
                    Mark as read
                </button>}
                <p style={{ padding: '5px', margin: '0px', borderRadius: '10px', fontSize: 'x-small', color:readState ? 'black' : 'white', backgroundColor: readState ? '#F5F7FA' : '#2A3E66' }}>{readState ? 'Read' : 'Unread'}</p>
            </div>
        </div>
    )
}
export default AccountNoti