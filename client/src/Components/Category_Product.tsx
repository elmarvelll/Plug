import CardProduct from "./CardProduct"
function Category_Product(props: { name: string; array?: any[] }) {
    console.log(props.array)
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '0px 10px', width: '100%', boxSizing: 'content-box' }}>
            {props.array && props.array.map((business) => {
                return (
                        <div style={{ width: '400px', margin: '0px 10px', boxSizing: 'content-box' }}>
                            <CardProduct
                                key={business.id}
                                name={business.name}
                                info={business.description}
                                price={business.price}
                                businessId={business.business_id}
                                id={business.id}
                                stock={business.stock}
                                imgurl={business.secure_url} />
                        </div>
                )
            })}
        </div >
    )
}
export default Category_Product