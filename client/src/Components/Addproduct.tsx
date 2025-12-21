import { useEffect, useState } from 'react'
import styles from '../styles/mybusiness.module.css'
import uploadImg from '../utils/uploadImage';
import axios from 'axios';
import type { Axios_Req_With_Url } from '../utils/config/axios_config';
import { useLocation, useNavigate } from 'react-router-dom';





function Addproduct(props: { removepage: () => void; businessName: string|undefined}) {
    const navigate = useNavigate()
    const [preview, setPreview] = useState('');
    const [imgfile, setimgfile] = useState<File | null>(null)
    const [disabled, setdisabled] = useState<boolean>(true)
    const [productInfo, setproductInfo] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
    })

    function addImg(event: React.ChangeEvent<HTMLInputElement>) {
        const { files } = event.target
        if (files) {
            setimgfile(files[0])
            const imageUrl = URL.createObjectURL(files[0])
            setPreview(imageUrl)
        }
        else {
            setimgfile(null)
        }
    }

    function updateInfo(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target
        setproductInfo(prevVal => {
            return { ...prevVal, [name]: value }
        })
    }

    useEffect(() => {
        if (!Object.values(productInfo).includes('') && imgfile !== null) {
            setdisabled(false)
        }
        else {
            setdisabled(true)
        }
    }, [productInfo, imgfile])



    async function submitData() {
        const img = await uploadImg(imgfile)
        const data = { img, productInfo }
        await axios.post(`http://localhost:3000/business/${props.businessName}/new_product`, data, { withCredentials: true, Link: '/' } as Axios_Req_With_Url)
        navigate(0)
    }


    return (
        <div
            className={styles.addProduct_div}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    props.removepage()
                }
            }}
            style={{ position: 'absolute', top: '0', width: '100%', height: '100%', backgroundColor: 'rgb(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <div style={{ width: '500px', backgroundColor: 'black', padding: '40px 20px', borderRadius: '20px', height: '100%', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', fontFamily: '"Comfortaa", sans-serif ', overflow: 'auto',border:'1px solid #CC8500'}}>
                <div style={{ height: 'max-content', width: '100%', margin: '10px 0px' }}>
                    <h4 style={{ margin: '10px 0px', fontSize: 'small' }}>Product Name</h4>
                    <input
                        type="text"
                        name="name" id="" placeholder="e.g Custom Phone Cases"
                        style={{ width: '100%', boxSizing: 'border-box' }}
                        onChange={updateInfo}
                        value={productInfo.name}
                        className={styles.profile_input}
                    />
                </div>
                <div style={{ height: 'max-content', width: '100%', margin: '10px 0px' }}>
                    <h4 style={{ margin: '10px 0px', fontSize: 'small' }}>Product Description</h4>
                    <textarea
                        name="description" id="" placeholder="Product Description"
                        style={{ width: '100%', boxSizing: 'border-box', height: '60px' }}
                        onChange={updateInfo}
                        value={productInfo.description}
                        className={styles.profile_input} />
                </div>
                <div style={{ height: 'max-content', width: '40%', margin: '10px 0px', marginRight: 'auto' }}>
                    <h4 style={{ margin: '10px 0px', fontSize: 'small' }}>Price (N)</h4>
                    <input
                        type="number"
                        name="price" id="" placeholder="Price"
                        style={{ width: '100%', boxSizing: 'border-box' }}
                        onChange={updateInfo}
                        value={productInfo.price}
                        className={styles.profile_input} />
                </div>
                <div style={{ height: 'max-content', width: '40%', margin: '10px 0px' }}>
                    <h4 style={{ margin: '10px 0px', fontSize: 'small' }}>Available Stock</h4>
                    <input
                        type="number"
                        name="stock" id="" placeholder="Available Stock"
                        style={{ width: '100%', boxSizing: 'border-box' }}
                        value={productInfo.stock}
                        onChange={updateInfo}
                        className={styles.profile_input} />
                </div>
                <div style={{ height: 'max-content', width: '100%', margin: '10px 0px' }}>
                    {/* <h4 style={{ margin: '0px' }}>Product Image</h4> */}
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {preview ?
                            <label htmlFor="Logo" style={{ width: '150px', cursor: 'pointer', margin: '10px 10px 40px', padding: '0px', height: '150px', fontSize: 'small', color: 'gray', position: 'relative' }}>
                                <img src={preview} alt="" style={{ width: '100%', margin: '0px', height: '100%', borderRadius: '10px', }} />
                            </label> :
                            <label htmlFor="Logo" className={styles.profileLogo_label} style={{ width: '150px', height: '150px', border: '2px dashed #CC8500', fontSize: 'small', color: 'gray', backgroundColor:'#1E1E1E' }}>
                                Click to upload Image
                            </label>
                        }
                        <input
                            type="file"
                            name="Logo"
                            id='Logo'
                            accept="image/png, image/jpeg"
                            className={styles.Logo}
                            onChange={addImg}
                        />
                        <button className={styles.logo_button} onClick={submitData} disabled={disabled} style={{ backgroundColor: disabled ? 'gray' : '#CC8500' }}>
                            Add product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Addproduct