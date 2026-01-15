import axios from 'axios'
import styles from '../styles/mybusiness.module.css'
import { useEffect, useState } from 'react'
import { boolean, businessSettings } from '../Pages/mybusiness';


function BusinessNoti(props: { order_id: string, id: string, is_read: number; created_at: string }) {
    const [readState, setreadState] = useState<boolean | undefined>(false)
    const business_setting = businessSettings()
    if (!business_setting) throw new Error('no verif_state provided')
    const { setunread_notifications,unread_notifications } = business_setting
    useEffect(() => {
        console.log(unread_notifications)
        setreadState(boolean(props.is_read))
    },[])

    function isRead(id: string) {
        console.log(props.id)
        setunread_notifications(prevObj => {
            return prevObj
                .filter((noti) => {
                    return noti.id !== props.id
                })
        })
        axios.put(`http://localhost:3000/business/mybusiness/:business/notifications`, {
            id
        })
            .then(() => setreadState(true))
    }
    return (
        <div className={styles.notification}>
            <h3>
                New Order!
            </h3>
            <p style={{ margin: '0px 0px 10px', fontSize: 'small' }}>
                A new order with id {props.order_id} has been made
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
                <p style={{ padding: '5px', margin: '0px', borderRadius: '10px', fontSize: 'x-small', color: readState ? 'black' : 'white', backgroundColor: readState ? '#F5F7FA' : '#2A3E66' }}>{readState ? 'Read' : 'Unread'}</p>
            </div>
        </div>
    )
}
export default BusinessNoti

