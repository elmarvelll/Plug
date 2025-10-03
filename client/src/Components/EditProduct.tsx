import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadImg from "../utils/uploadImage";
import styles from '../styles/mybusiness.module.css'
import type { Product } from "../utils/types/product.types";
import type { Axios_Req_With_Url } from "../utils/config/axios_config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faCheck } from "@fortawesome/free-solid-svg-icons";



function EditProduct(props: { scroll: number | undefined, removePage: () => void, item?: Product; submitdata: (id: string | undefined) => void, businessName: string | undefined }) {
    const navigate = useNavigate()
    const [preview, setPreview] = useState('');
    const [buttonenabled, setbuttonenabled] = useState<boolean>(true)
    const [imgfile, setimgfile] = useState<File | null>(null)
    const [disabled, setdisabled] = useState<boolean>(true)
    const [Editable, setEditable] = useState<string | null>('')
    const [productInfo, setproductInfo] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0
    })


    function edit(str: string) {
        console.log('edited')
        if (Editable !== str) {
            setEditable(str)
        }
        else setEditable(null)
    }


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

    function submit(name: string, value: string | undefined) {
        console.log('submitted')
        axios.put(`http://localhost:3000/business/${props.businessName}/${props.item?.id}`,
            {
                name: name,
                value: value
            })
        setEditable(null)
    }

    async function submitImg() {
        console.log('hi')
        const img = await uploadImg(imgfile)
        console.log(img)
        axios.put(`http://localhost:3000/business/${props.businessName}/${props.item?.id}`,
            {
                name: 'secure_url',
                value: img.secure_url,
                public_id: img.public_id
            })
    }

    // useEffect(() => {
    //     if (!Object.values(productInfo).includes('') && imgfile !== null) {
    //         setdisabled(false)
    //     }
    //     else {
    //         setdisabled(true)
    //     }
    // }, [productInfo, imgfile])

    useEffect(() => {
        if (props.item)
            setproductInfo({
                name: props.item?.name,
                description: props.item?.description,
                price: props.item?.price,
                stock: props.item?.stock
            })
    }, [props.item])
    async function submitData() {
        // Object.entries(productInfo).every((key,value)=>{
        //  value === props.item?[key]
        // })
        console.log(imgfile)
        const img = await uploadImg(imgfile)
        const data = { img, productInfo }
        console.log(data)
        await axios.put(`http://localhost:3000/business/${props.businessName}/${props.item?.id}`, data, { withCredentials: true, Link: '/' } as Axios_Req_With_Url)
        navigate(0)
    }

    return (
        <div
            className={styles.addProduct_div}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    props.removePage()
                }
            }}
            style={{ position: 'absolute', top: props.scroll, right: '0', width: '100%', height: '100%', backgroundColor: 'rgb(0,0,0,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <div style={{ width: '500px', backgroundColor: 'white', padding: '40px 20px', borderRadius: '20px', height: '100%', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', fontFamily: '"Comfortaa", sans-serif ', overflow: 'auto' }}>
                <div style={{fontSize:'small',color:'grey'}}>
                    Amount Sold: 0
                </div>
                <div style={{ height: 'max-content', width: '100%', margin: '10px 0px', position: 'relative' }}>
                    <h4 style={{ margin: '10px 0px', fontSize: 'small' }}>Product Name</h4>
                    <input
                        type="text"
                        name="name" id="" placeholder="e.g Custom Phone Cases"
                        style={{ width: '100%', boxSizing: 'border-box' }}
                        onChange={updateInfo}
                        value={productInfo.name}
                        readOnly={Editable !== 'name'}
                        className={styles.profile_input}
                    />
                    <FontAwesomeIcon icon={Editable === 'name' ? faCheck : faPencil} onClick={() => Editable !== 'name' ? edit('name') : submit('name', productInfo.name)} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                </div>
                <div style={{ height: 'max-content', width: '100%', margin: '10px 0px', position: 'relative' }}>
                    <h4 style={{ margin: '10px 0px', fontSize: 'small' }}>Product Description</h4>
                    <textarea
                        name="description" id="" placeholder="Product Description"
                        style={{ width: '100%', boxSizing: 'border-box', height: '60px' }}
                        onChange={updateInfo}
                        value={productInfo.description}
                        readOnly={Editable !== 'description'}
                        className={styles.profile_input} />
                    <FontAwesomeIcon icon={Editable === 'description' ? faCheck : faPencil} onClick={() => Editable !== 'description' ? edit('description') : submit('description', productInfo.description)} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                </div>
                <div style={{ height: 'max-content', width: '40%', margin: '10px 0px', marginRight: 'auto', position: 'relative' }}>
                    <h4 style={{ margin: '10px 0px', fontSize: 'small', position: 'relative' }}>Price (N)</h4>
                    <input
                        type="number"
                        name="price" id="" placeholder="Price"
                        style={{ width: '100%', boxSizing: 'border-box' }}
                        onChange={updateInfo}
                        readOnly={Editable !== 'price'}
                        value={productInfo.price}
                        className={styles.profile_input} />
                    <FontAwesomeIcon icon={Editable === 'price' ? faCheck : faPencil} onClick={() => Editable !== 'price' ? edit('price') : submit('price', productInfo.price.toString())} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                </div>
                <div style={{ height: 'max-content', width: '40%', margin: '10px 0px', position: 'relative' }}>
                    <h4 style={{ margin: '10px 0px', fontSize: 'small' }}>Available Stock</h4>
                    <input
                        type="number"
                        name="stock" id="" placeholder="Available Stock"
                        style={{ width: '100%', boxSizing: 'border-box' }}
                        value={productInfo.stock}
                        onChange={updateInfo}
                        readOnly={Editable !== 'stock'}
                        className={styles.profile_input} />
                    <FontAwesomeIcon icon={Editable === 'stock' ? faCheck : faPencil} onClick={() => Editable !== 'stock' ? edit('stock') : submit('stock', productInfo.stock.toString())} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                </div>
                <div style={{ height: 'max-content', width: '100%', margin: '10px 0px' }}>
                    {/* <h4 style={{ margin: '0px' }}>Product Image</h4> */}
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {<label htmlFor="Logo"
                            style={{ width: '300px', cursor: 'pointer', margin: '10px 10px 40px', padding: '0px', height: '300px', fontSize: 'small', color: 'gray', position: 'relative' }}
                        >
                            <img src={preview === '' ? props.item?.secure_url : preview} alt="" style={{ width: '100%', margin: '0px', height: '100%', borderRadius: '10px', objectFit: 'contain' }} />
                        </label>}
                        <button disabled={disabled} className={styles.logo_button} style={{ backgroundColor: disabled ? 'lightgray' : 'black' }} onClick={submitImg}>
                            Upload Image
                        </button>
                        <input
                            type="file"
                            name="Logo"
                            id='Logo'
                            accept="image/png, image/jpeg"
                            className={styles.Logo}
                            onChange={(event) => { addImg(event); setdisabled(false) }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )

}
export default EditProduct




