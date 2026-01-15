import { useState } from 'react'
import styles from '../styles/mybusiness.module.css'
import type { OrderItem } from './accountorders'





function Orderdetails(props: { removepage: () => void, userId: string, orderItems: OrderItem[] }) {

    return (
        <div
            className={styles.addProduct_div}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    props.removepage()
                }
            }}
            style={{ position: 'absolute', top: '0', width: '100%', height: '100%', backgroundColor: 'rgb(0,0,0,0.5)', backdropFilter: 'blur(3px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <div style={{ border: '1px solid #2A2F3A', width: '50%', height: '90%', padding: '20px', boxSizing: 'border-box', backgroundColor: '#0F1115', borderRadius: '10px', position: 'relative' }}>
                <section style={{ overflow: 'auto', height: '400px' }}>
                    {props.orderItems.length !== 0 && props.orderItems.map((product) => {
                        return (
                            <div>
                                <div style={{ border:'1px solid #2A2F3A', backgroundColor: '#181B22',marginBottom: '20px', borderRadius: '10px', width: '100%', padding: '10px', display: 'flex', boxSizing: 'border-box', transition: 'ease-out 300ms' }}>
                                    <div style={{ backgroundColor: 'red', borderRadius: '20px', width: '100px', height: '100px' }}>
                                        <img src={product.secure_url} alt="" style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '10px' }} />
                                    </div>
                                    <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                        <h3 style={{ color: 'white' }}>{`${product.quantity}x ${product.name}`}</h3>
                                        <p style={{ color: 'gray' }}>by {product.BusinessName}</p>
                                        <h3 style={{ color: '#4F8CFF' }}>₦ {product.price}</h3>
                                        <p style={{ color: '#A6ACB8', fontSize: 'x-small' }}>Expected delivery date: {product.delivery_date}</p>

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </section>
            </div>
        </div>
    )
}
export default Orderdetails