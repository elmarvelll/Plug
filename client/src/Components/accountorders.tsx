import { useEffect, useState } from 'react'
import styles from '../styles/mybusiness.module.css'
import axios from 'axios'



function AccountOrder(props: { viewOrderdetails: () => void, updateOrderList: (params: OrderItem[]) => void }) {
    const [name, setName] = useState('All Orders')
    const [hover, sethover] = useState('pending')
    const [orderList, setorderList] = useState<OrderItem[]>([])
    const [orders, setorders] = useState<OrderWithItems[]>([])

    useEffect(() => {
        axios.get(`http://localhost:3000/user/user_details`, {
            params: {
                orderState: hover
            }
        })
            .then(res => {
                setorders(res.data.orders)
                setorderList(res.data.orderItems)
            })
    }, [hover])
    function filterOrder(id: string) {
        const items = orderList.filter(order => order.id === id)
        console.log(items)
        props.updateOrderList(items)
        props.viewOrderdetails()
    }

    return (
        <div className={styles.businessPage}>
            <div className={styles.title}>
                Orders
            </div>
            <div className={styles.businessPage_data}>
                <div className={styles.order_datasection}>
                    <div style={{ display: 'flex', cursor: 'pointer', borderRadius: '10px', border: '1px solid #2A2F3A' }}>
                        <p onClick={() => sethover('pending')} style={{ borderRadius: '10px 0px 0px 10px', backgroundColor: hover === 'pending' ? '#3B74E6' : 'transparent', color:'#F5F7FA', padding: '10px 5px' }}>Pending</p>
                        <p onClick={() => sethover('completed')} style={{ borderRadius: '0px 10px 10px 0px', backgroundColor: hover === 'completed' ? '#3B74E6' : 'transparent', color:'#F5F7FA', padding: '10px 5px' }}>Ongoing/Completed</p>
                    </div>
                </div>
                <div className={styles.order_overview}>
                    <div className={styles.order_ordermenu}>
                        <section style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'white', width: '150px', margin: '0px 10px', textWrap: 'nowrap', maxWidth: '150px', overflow: 'scroll', display: 'inline-block' }}>Order ID</span>
                            <span style={{ color: 'white', width: '150px', margin: '0px 10px', textWrap: 'nowrap', maxWidth: '180px', overflow: 'scroll', display: 'inline-block' }}>Value{'(₦)'}</span>
                            <span style={{ color: 'white', width: '150px', margin: '0px 10px', textWrap: 'nowrap', maxWidth: '100px', overflow: 'scroll', display: 'inline-block' }}>status</span>
                            <span style={{ color: 'white', width: '150px', margin: '0px 10px', textWrap: 'nowrap', maxWidth: '100px', overflow: 'scroll', display: 'inline-block' }}>Created At</span>
                        </section>
                        <div style={{height:'250px',overflow:'scroll'}}>
                            {orders.length > 0 && orders.map((order, index) => {
                                return (
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }} key={index} onClick={() => filterOrder(order.orderID)}>
                                        <span style={{ color: 'white', width: '150px', margin: '10px', textWrap: 'nowrap', maxWidth: '150px', overflow: 'scroll', display: 'inline-block' }}>{order.orderID}</span>
                                        <span style={{ color: 'white', width: '150px', margin: '10px', textWrap: 'nowrap', maxWidth: '80px', overflow: 'scroll', display: 'inline-block' }}>{`${order.value}`}</span>
                                        <span style={{ color: 'white', width: '150px', margin: '10px', textWrap: 'nowrap', maxWidth: '100px', overflow: 'scroll', display: 'inline-block' }}>{order.order_status}</span>
                                        <span style={{ color: 'white', width: '150px', margin: '10px', textWrap: 'nowrap', maxWidth: '100px', overflow: 'scroll', display: 'inline-block' }}>{order.created_at}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AccountOrder













export interface OrderWithItems {
    orderID: string;
    value: string;
    order_status: 'created' | 'pending' | 'paid' | 'processing' | 'completed' | 'cancelled';
    created_at: string; // YYYY-MM-DD
}
export interface OrderItem {
    id: string;                 // '51558452-f3fa-4693-b062-3bfe49f25b47'
    order_status: string
    quantity: number;           // '1'
    price: number;              // '20000000.00'
    delivery_date: string;         // '2025-12-23' (ISO date string)
    name: string;       // 'Laptop'
    secure_url: string;          // Cloudinary URL
    BusinessName: string
}