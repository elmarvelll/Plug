import ButtonLink from "./ButtonLink"

type CardLink = {
 name: string;
}

function CardLink(props:CardLink){
return(
        <div className="card_link_div">
        <ButtonLink URL={`/businesses/${props.name}`} name="View Business Profile"/>
        </div>
)
}
export default CardLink