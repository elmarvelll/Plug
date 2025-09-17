import ButtonLink from "./ButtonLink"

type CardLink = {
 name: string;
}

function CardLink(props:CardLink){
return(
        <div className="card_link_div">
        <p>For more information... </p>
        <ButtonLink URL={`/buisnesses/${props.name}`} class="nav_link white" name="Click Me"/>
        </div>
)
}
export default CardLink