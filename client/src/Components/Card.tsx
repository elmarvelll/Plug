import CardLink from "./CardLinks"
import cardStyle from '../styles/card.module.css'
import { useNavigate } from "react-router-dom"

type card = {
    name: string;
    info: string
    id:string
    imgurl: string
    price?: string
    stock?: string
    businessName?: string
}
function Card(props: card) {
    const navigate = useNavigate()

    return (
        <div className={cardStyle.card_div} style={{ cursor: 'pointer' }} onClick={() => navigate(`/businesses/${props.id}`)}>
            <div className={cardStyle.card_pic}>
                <img src={props.imgurl} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} alt="" loading="lazy"/>
            </div>
                <div className={cardStyle.card_header}>
                    <h3 style={{ color: 'white', padding: '0px 20px' }}>{props.name}</h3>
                </div>
                <div className={cardStyle.card_category}>
                    {props.info}
                </div>
            {props.price &&
                <div>
                    <h3 style={{ fontFamily: '"Comfortaa", sans-serif', fontWeight: '400', margin: '0px' }}>
                        N  {props.price}
                    </h3>
                </div>
            }
            {props.stock &&
                <div>
                    <h3 style={{ fontFamily: '"Comfortaa", sans-serif', fontWeight: '400', color: 'gray', fontSize: 'small', margin: '10px 0px' }}>
                        {props.stock} available
                    </h3>
                </div>
            }

            {props.businessName && <CardLink name={props.name} />}
        </div>
    )
}
export default Card