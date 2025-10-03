import { useEffect, useState } from 'react'
import styles from '../styles/mybusiness.module.css'
import axios from 'axios'
import type { Axios_Req_With_Url } from '../utils/config/axios_config'
import type { Business } from '../utils/types/business.type'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faCheck } from "@fortawesome/free-solid-svg-icons";
import uploadImg from '../utils/uploadImage'



function BusinessProfile(props: { businessName: string | undefined }) {
    const [businesscred, setbusinesscred] = useState<Business[]>([])
    const [Editable, setEditable] = useState<string | null>('')
    const [preview, setPreview] = useState('');
    const [imgfile, setimgfile] = useState<File | null>(null)
    const [buttonenabled, setbuttonenabled] = useState<boolean>(true)
    const [business, setbusiness] = useState<Business>({
        Email: '',
        Number: '',
        BusinessName: '',
        Category: '',
        BusinessDescription: '',
        DeliveryTime: '',
        Hall: '',
        RoomNumber: '',
        secure_url: ''
    })
    function UpdateCred(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target
        setbusiness(prevVal => {
            return ({ ...prevVal, [name]: value })
        })
    }
    useEffect(() => {
        axios.get(`http://localhost:3000/business/mybusiness/${props.businessName}`, { withCredentials: true, Link: location.pathname } as Axios_Req_With_Url)
            .then((res) => { setbusinesscred(res.data.businesses) })
    }, [])
    useEffect(() => {
        if (businesscred.length > 0) {
            setbusiness({
                Email: businesscred[0].Email,
                Number: businesscred[0].Number,
                BusinessName: businesscred[0].BusinessName,
                Category: businesscred[0].Category,
                BusinessDescription: businesscred[0].BusinessDescription,
                DeliveryTime: businesscred[0].DeliveryTime,
                Hall: businesscred[0].Hall,
                RoomNumber: businesscred[0].RoomNumber,
                secure_url: businesscred[0].secure_url
            })
        }
    }, [businesscred])

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


    function listclick(value: string, name: string) {
        setbusiness(prevVal => {
            return ({ ...prevVal, [name]: value })
        })
        axios.put(`http://localhost:3000/business/${props.businessName}`,
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
        axios.put(`http://localhost:3000/business/${props.businessName}`,
            {
                name: 'secure_url',
                value: img.secure_url,
                public_id: img.public_id
            })
    }


    function submit(name: string, value: string) {
        console.log('submitted')
        axios.put(`http://localhost:3000/business/${props.businessName}`,
            {
                name: name,
                value: value
            })
        setEditable(null)

    }

    return (
        <div className={styles.businessPage}>
            <>
                <div className={styles.title}>
                    My Business
                </div>
                <div className={styles.businessPage_data}>
                    <div className={styles.businessPage_intro}>
                        <h2> Profile & Listings Editor</h2>
                        <p>
                            Manage your public business profile and showcase your capabilities to potential buyers.                    </p>
                    </div>
                    <div className={styles.profile_overview}>
                        <h2>Company Information</h2>
                        <p>Basic information about your business</p>

                        <div className={styles.profile_info}>
                            <div style={{ position: 'relative', width: '40%', minWidth: '230px' }}>
                                <h4>Business Name</h4>
                                <input
                                    type="text"
                                    name="BusinessName" id=""
                                    value={business.BusinessName}
                                    className={styles.profile_input}
                                    readOnly={Editable !== 'Name'}
                                    onChange={(e) => UpdateCred(e)}
                                />
                                <FontAwesomeIcon icon={Editable === 'Name' ? faCheck : faPencil} onClick={() => Editable !== 'Name' ? edit('Name') : submit('BusinessName', business.BusinessName)} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                            </div>
                            <div style={{ position: 'relative', width: '40%', minWidth: '230px' }}>
                                <h4>Category</h4>
                                <input
                                    type="text"
                                    name="Category" id=""
                                    value={business.Category}
                                    className={styles.profile_input}
                                    readOnly
                                    onChange={(e) => UpdateCred(e)} />
                                <FontAwesomeIcon icon={Editable === 'Category' ? faCheck : faPencil} onClick={() => setEditable('Category')} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                                {Editable === 'Category' &&
                                    <div className={styles.dropdown_menu}>
                                        <ul>
                                            <li onClick={() => { listclick('Cosmetics', 'Category') }}>Cosmetics</li>
                                            <li onClick={() => { listclick('Clothing', 'Category') }}>Clothing</li>
                                            <li onClick={() => { listclick('Food', 'Category') }}>Food</li>

                                        </ul>
                                    </div>
                                }
                            </div>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <h4>Business Description</h4>
                                <textarea
                                    name="BusinessDescription" id=""
                                    value={business.BusinessDescription}
                                    className={styles.profile_text}
                                    readOnly={Editable !== 'BusinessDescription'}
                                    onChange={(e) => UpdateCred(e)} />
                                <FontAwesomeIcon icon={Editable === 'BusinessDescription' ? faCheck : faPencil} onClick={() => Editable !== 'BusinessDescription' ? edit('BusinessDescription') : submit('BusinessDescription', business.BusinessDescription)} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                            </div >
                        </div>
                    </div>
                    <div className={styles.profile_overview}>
                        <h2>Company Logo</h2>
                        <p>Upload your company logo</p>
                        <div className={styles.profile_logo}>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                {
                                    business.secure_url !== null ?
                                        <label htmlFor="Logo"
                                            style={{ width: '300px', cursor: 'pointer', margin: '10px 10px 40px', padding: '0px', height: '300px', fontSize: 'small', color: 'gray', position: 'relative' }}
                                        >
                                            <img src={preview !== '' ? preview : business.secure_url} alt="" style={{ width: '100%', margin: '0px', height: '100%', borderRadius: '10px', objectFit: 'contain' }} />
                                        </label>
                                        :
                                        preview ?
                                            <label htmlFor="Logo"
                                                style={{ width: '300px', cursor: 'pointer', margin: '10px 10px 40px', padding: '0px', height: '300px', fontSize: 'small', color: 'gray', position: 'relative' }}
                                            >
                                                <img src={preview} alt="" style={{ width: '100%', margin: '0px', height: '100%', borderRadius: '10px', objectFit: 'contain' }} />
                                            </label> :
                                            <label htmlFor="Logo" className={styles.profileLogo_label} style={{ width: '150px', height: '150px', border: '2px dashed lightgrey', fontSize: 'small', color: 'gray' }}>
                                                Click to upload Image
                                            </label>
                                }
                                <input
                                    type="file"
                                    name="Logo"
                                    id='Logo'
                                    className={styles.Logo}
                                    accept="image/png, image/jpeg"
                                    onChange={(event) => { addImg(event); setbuttonenabled(false) }}
                                />
                                <button disabled={buttonenabled} className={styles.logo_button} style={{ backgroundColor: buttonenabled ? 'lightgray' : 'black' }} onClick={submitImg} >
                                    Upload Image
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.profile_overview}>
                        <h2>Contact Information</h2>
                        <div className={styles.profile_info}>
                            <div style={{ position: 'relative', width: '40%', minWidth: '230px' }}>
                                <h4>Phone Number</h4>
                                <input
                                    type="number"
                                    name="Number" id=""
                                    value={business.Number}
                                    className={styles.profile_text}
                                    readOnly={Editable !== 'Number'}
                                    onChange={(e) => UpdateCred(e)} />
                                <FontAwesomeIcon icon={Editable === 'Number' ? faCheck : faPencil} onClick={() => Editable !== 'Number' ? edit('Number') : submit('Number', business.Number)} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                            </div>
                            <div style={{ position: 'relative', width: '40%', minWidth: '230px' }}>
                                <h4>Business Email</h4>
                                <input
                                    type="text"
                                    name="Email" id=""
                                    value={business.Email}
                                    className={styles.profile_text}
                                    readOnly={Editable !== 'Email'}
                                    onChange={(e) => UpdateCred(e)} />
                                <FontAwesomeIcon icon={Editable === 'Email' ? faCheck : faPencil} onClick={() => Editable !== 'Email' ? edit('Email') : submit('Email', business.Email)} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px 5px', cursor: 'pointer' }} />
                            </div>
                        </div>
                    </div>

                </div>
            </>
        </div >
    )
}

export default BusinessProfile