import type { cartType } from "../utils/cartLayout"


function ShowCartProducts(props: { product: cartType }) {
  return (
    <div style={{ marginBottom: '10px', display: 'flex' }}>
      <div style={{ width: '50px', height: '50px', borderRadius: '3px' }}>
        <img src={props.product.secure_url === '' ? undefined : props.product.secure_url} alt="" style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '10px' }} />
      </div>
      <div style={{ margin: '0px 10px' }}>
        <p style={{ color: 'white' }}>{props.product.name}</p>
        <h2 style={{ color: '#FF7A00', margin: '10px 0px' }}>₦  {props.product.price}</h2>
      </div>
      <div>

      </div>
    </div>
  )
}
export default ShowCartProducts