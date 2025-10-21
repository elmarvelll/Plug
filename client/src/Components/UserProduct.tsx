type UserProduct = {
    Url: string,
    name: string,
    description: string,
    price: number,
    stock: number
}

function UserProduct(props: UserProduct) {
    return (
        <div style={{ borderRadius: '10px', border: '1px solid lightgray', width: '45%', margin: '20px 0px', position: 'relative' }}>
            <img src={props.Url} style={{ width: '100%', height: '300px', objectFit: 'contain', borderRadius: '10px 10px 0px 0px' }} alt="" />
            <div style={{ padding: '20px' }}>
                <h3>{props.name}</h3>
                <p style={{ margin: '10px 0px', color: 'gray' }}>{props.description}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '30px' }}>
                <h3>
                    ₦{props.price}
                </h3>
                <button style={{ color: 'white', padding: '8px 16px', borderRadius: '10px', backgroundColor: 'black' }}>
                    Add to Cart
                </button>
            </div>
            <span style={{ position: 'absolute', left: '0', bottom: '0', padding: '10px 30px', fontSize: 'small', color: 'gray' }}>
                {props.stock} more available !!
            </span>
        </div>
    )
}

export default UserProduct