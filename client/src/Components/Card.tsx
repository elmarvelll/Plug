import CardLink from "./CardLinks"

type card = {
    name: string;
    info: string
}
function Card(props: card) {
    return (
        <div className="card_div">
            <div className="card_header">
                <span>{props.name}</span>
                <p>{props.info}</p>
                <div className="card_ratings" >
                    <span>0</span>
                    <p>rating: 5X</p>
                </div>
            </div>
            <div className="card_bio">
                {props.info}
            </div>
            <CardLink name={props.name} />
        </div>
    )
}
export default Card