import { useState } from 'react'
import styles from '../styles/mybusiness.module.css'
import type { orderType } from '../Pages/mybusiness'


function Order(props: { total_orders: number, pending_orders: number, completed_orders: number, orders: orderType[] }) {
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
                        <p>{props.total_orders} </p>
                    </div>
                    <div className={styles.order_datadiv} onClick={() => setName('Pending Orders')}>
                        <h4>Pending Orders</h4>
                        <p>{props.pending_orders}</p>
                    </div>
                    <div className={styles.order_datadiv} onClick={() => setName('Completed Orders')}>
                        <h4>Completed Orders</h4>
                        <p>{props.completed_orders}</p>
                    </div>
                </div>
                <div className={styles.order_overview}>
                    <h2 >{name}</h2>
                    <div className={styles.order_ordermenu}>
                        <section>
                            <span style={{ color: 'white' }}>Order ID</span>
                            <span style={{ color: 'white' }}>Customer</span>
                            <span style={{ color: 'white' }}>product</span>
                            <span style={{ color: 'white' }}>Value</span>
                            <span style={{ color: 'white' }}>Due date</span>
                        </section>
                        <div style={{height:'250px',overflow:'scroll'}}>
                            {props.orders.map((order, index) => {
                                return (
                                    <div key={index}>
                                        <span style={{ color: 'white', width: '150px', margin: '10px', textWrap: 'nowrap', maxWidth: '150px', overflow: 'scroll', display: 'inline-block' }}>{order.orderID}</span>
                                        <span style={{ color: 'white', width: '150px', margin: '10px', textWrap: 'nowrap', maxWidth: '150px', overflow: 'scroll', display: 'inline-block' }}>{order.Customer}</span>
                                        <span style={{ color: 'white', width: '150px', margin: '10px', textWrap: 'nowrap', maxWidth: '150px', overflow: 'scroll', display: 'inline-block' }}>{order.product}</span>
                                        <span style={{ color: 'white', width: '80px', margin: '10px', textWrap: 'nowrap', maxWidth: '80px', overflow: 'scroll', display: 'inline-block' }}>{`${order.value}`}</span>
                                        <span style={{ color: 'white', width: '100px', margin: '10px', textWrap: 'nowrap', maxWidth: '100px', overflow: 'scroll', display: 'inline-block' }}>{order.deliveryDate}</span>
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
export default Order