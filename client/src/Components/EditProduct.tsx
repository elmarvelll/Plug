import axios from "axios";
import { useEffect, useState } from "react";
import uploadImg from "../utils/uploadImage";
import styles from '../styles/mybusiness.module.css'
import type { Product } from "../utils/types/product.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faCheck } from "@fortawesome/free-solid-svg-icons";



function EditProduct(props: { scroll: number | undefined, removePage: () => void, item?: Product; submitdata: (id: string | undefined) => void, businessName: string | undefined }) {
    const [preview, setPreview] = useState('');
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
        axios.put(`http://localhost:3000/business/mybusiness/${props.businessName}/${props.item?.id}`,
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
        axios.put(`http://localhost:3000/business/mybusiness/${props.businessName}/${props.item?.id}`,
            {
                name: 'secure_url',
                value: img.secure_url,
                public_id: img.public_id
            })
    }
    useEffect(() => {
        if (props.item)
            setproductInfo({
                name: props.item?.name,
                description: props.item?.description,
                price: props.item?.price,
                stock: props.item?.stock
            })
    }, [props.item])

    return (
        <div
            className={styles.addProduct_div}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    props.removePage()
                }
            }}
            style={{ position: 'absolute', top: props.scroll, right: '0', width: '100%', height: '100%', backgroundColor: 'rgb(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'20px',boxSizing:'border-box' }}
        >
            <div style={{ width: '500px', backgroundColor: '#0F1115', padding: '40px 20px', borderRadius: '20px', height: '100%', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', overflow: 'auto',border:'1px solid #2A2F3A' }}>
                <h3 style={{fontSize:'small',}}>
                    Amount Sold: 0
                </h3>
                <div style={{ height: 'max-content', width: '100%', margin: '10px 0px', position: 'relative' }}>
                    <h3 style={{ margin: '10px 0px', fontSize: 'small' }}>Product Name</h3>
                    <input
                        type="text"
                        name="name" id="" placeholder="e.g Custom Phone Cases"
                        style={{ width: '100%', boxSizing: 'border-box' }}
                        onChange={updateInfo}
                        value={productInfo.name}
                        readOnly={Editable !== 'name'}
                        className={styles.profile_input}
                    />
                    <FontAwesomeIcon icon={Editable === 'name' ? faCheck : faPencil} color= '#F5F7FA' onClick={() => Editable !== 'name' ? edit('name') : submit('name', productInfo.name)} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                </div>
                <div style={{ height: 'max-content', width: '100%', margin: '10px 0px', position: 'relative' }}>
                    <h3 style={{ margin: '10px 0px', fontSize: 'small' }}>Product Description</h3>
                    <textarea
                        name="description" id="" placeholder="Product Description"
                        style={{ width: '100%', boxSizing: 'border-box', height: '60px' }}
                        onChange={updateInfo}
                        value={productInfo.description}
                        readOnly={Editable !== 'description'}
                        className={styles.profile_input} />
                    <FontAwesomeIcon icon={Editable === 'description' ? faCheck : faPencil} color= '#F5F7FA'onClick={() => Editable !== 'description' ? edit('description') : submit('description', productInfo.description)} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                </div>
                <div style={{ height: 'max-content', width: '40%', margin: '10px 0px', marginRight: 'auto', position: 'relative' }}>
                    <h3 style={{ margin: '10px 0px', fontSize: 'small', position: 'relative' }}>Price (N)</h3>
                    <input
                        type="number"
                        name="price" id="" placeholder="Price"
                        style={{ width: '100%', boxSizing: 'border-box' }}
                        onChange={updateInfo}
                        readOnly={Editable !== 'price'}
                        value={productInfo.price}
                        className={styles.profile_input} />
                    <FontAwesomeIcon icon={Editable === 'price' ? faCheck : faPencil} color= '#F5F7FA'onClick={() => Editable !== 'price' ? edit('price') : submit('price', productInfo.price.toString())} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                </div>
                <div style={{ height: 'max-content', width: '40%', margin: '10px 0px', position: 'relative' }}>
                    <h3 style={{ margin: '10px 0px', fontSize: 'small' }}>Available Stock</h3>
                    <input
                        type="number"
                        name="stock" id="" placeholder="Available Stock"
                        style={{ width: '100%', boxSizing: 'border-box' }}
                        value={productInfo.stock}
                        onChange={updateInfo}
                        readOnly={Editable !== 'stock'}
                        className={styles.profile_input} />
                    <FontAwesomeIcon icon={Editable === 'stock' ? faCheck : faPencil} color= '#F5F7FA' onClick={() => Editable !== 'stock' ? edit('stock') : submit('stock', productInfo.stock.toString())} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                </div>
                <div style={{ height: 'max-content', width: '100%', margin: '10px 0px' }}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {<label htmlFor="Logo"
                            style={{ width: '300px', cursor: 'pointer', margin: '10px 10px 40px', padding: '0px', height: '300px', fontSize: 'small', color: 'gray', position: 'relative' }}
                        >
                            <img src={preview === '' ? props.item?.secure_url : preview} alt="" style={{ width: '100%', margin: '0px', height: '100%', borderRadius: '10px', objectFit: 'contain' }} />
                        </label>}
                        <button disabled={disabled} className={styles.logo_button} style={{ backgroundColor: disabled ? '#2A3E66' : '#3B74E6' }} onClick={submitImg}>
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




