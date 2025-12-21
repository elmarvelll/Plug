import { useState } from 'react';
import styles from '../styles/mybusiness.module.css'
function ProductCard(props: {name:string; bio:string; price: number; SoldStock: number,status:string,img: string,edit:(val:string)=>void,id:string}) {
    return (
        <div className={styles.product_card}>
            <img className={styles.product_cardImg} style={{ objectFit:'contain'}} src={props.img} alt="" />
            <span style={{position: 'absolute',top:'0',right:'0',margin:'10px',borderRadius:'10px',backgroundColor:'black',color:'white', padding: '5px 10px',fontSize:'small',fontFamily:'Comfortaa'}}>
                {props.status}
            </span>
            <div className={styles.product_cardInfo}>
                <div>
                    <h2>{props.name}</h2>
                    <p>{props.bio}</p>
                </div>
                <span style={{cursor:'pointer',color:'white'}} onClick={()=>props.edit(props.id)}>
                    <h1>...</h1>
                </span>
            </div>
            <div className={styles.product_price}>
                <h2>N {props.price}</h2>
                <p>{props.SoldStock} Available</p>
            </div>
        </div>
    )
}
export default ProductCard