import { useEffect, useState } from 'react'
import styles from '../styles/mybusiness.module.css'
import axios from 'axios'
import type { Axios_Req_With_Url } from '../utils/config/axios_config'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faCheck } from "@fortawesome/free-solid-svg-icons";
import uploadImg from '../utils/uploadImage'
import type { usertype } from '../Pages/Account'



function AccountProfile(props: { userId: string | undefined, user: usertype[], changepasswordState: () => void }) {
    const [Editable, setEditable] = useState<string | null>('')
    const [preview, setPreview] = useState('');
    const [imgfile, setimgfile] = useState<File | null>(null)
    const [buttonenabled, setbuttonenabled] = useState<boolean>(true)
    const [user, setuser] = useState({
        email: '',
        number: '',
        schoolemail: '',
        room: '',
        hall: '',
        firstName: '',
        lastName: '',
        secure_url: ''
    })
    function UpdateCred(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target
        setuser(prevVal => {
            return ({ ...prevVal, [name]: value })
        })
    }
    useEffect(() => {
        setuser({
            email: props.user[0].email,
            number: props.user[0].number,
            schoolemail: props.user[0].school_email,
            room: props.user[0].room,
            hall: props.user[0].hall,
            firstName: props.user[0].first_name,
            lastName: props.user[0].last_name,
            secure_url: props.user[0].secure_url
        })
    }, [props.user])

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


    async function submitImg() {
        console.log('hi')
        const img = await uploadImg(imgfile)
        console.log(img)
        axios.put(`http://localhost:3000/user/${props.userId}`,
            {
                name: 'secure_url',
                value: img.secure_url,
                public_id: img.public_id
            })
    }


    function submit(name: string, value: string) {
        console.log('submitted')
        axios.put(`http://localhost:3000/user/${props.userId}`,
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
                    My Profile
                </div>
                <div className={styles.businessPage_data}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                        <button className={styles.addProfile_button} onClick={()=>props.changepasswordState()}>
                            Change Password
                        </button>
                    </div>

                    <div className={styles.profile_overview}>
                        <h2>Profile Info</h2>

                        <div className={styles.profile_info}>
                            <div style={{ position: 'relative', width: '40%', minWidth: '230px' }}>
                                <h4 style={{ color: 'white' }}>First Name</h4>
                                <input
                                    type="text"
                                    name="firstName" id=""

                                    value={user.firstName}
                                    className={styles.profile_input}
                                    readOnly={Editable !== 'Name'}
                                    onChange={(e) => UpdateCred(e)}
                                />
                                <FontAwesomeIcon icon={Editable === 'Name' ? faCheck : faPencil} color='#F5F7FA' onClick={() => Editable !== 'Name' ? edit('Name') : submit('first_name', user.firstName)} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                            </div>
                            <div style={{ position: 'relative', width: '40%', minWidth: '230px' }}>
                                <h4 style={{ color: 'white' }}>Last Name</h4>
                                <input
                                    type="text"
                                    name="lastName" id=""

                                    value={user.lastName}
                                    className={styles.profile_input}
                                    readOnly={Editable !== 'lName'}
                                    onChange={(e) => UpdateCred(e)} />
                                <FontAwesomeIcon icon={Editable === 'lName' ? faCheck : faPencil} color='#F5F7FA' onClick={() => Editable !== 'lName' ? edit('lName') : submit('last_name', user.lastName)} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                            </div>
                            <div style={{ position: 'relative', width: '40%', minWidth: '230px' }}>
                                <h4 style={{ color: 'white' }}>School Email</h4>
                                <input
                                    type="text"
                                    name="schoolemail" id=""

                                    value={user.schoolemail}
                                    className={styles.profile_input}
                                    readOnly={Editable !== 'schoolemail'}
                                    onChange={(e) => UpdateCred(e)}
                                />
                                <FontAwesomeIcon icon={Editable === 'schoolemail' ? faCheck : faPencil} color='#F5F7FA' onClick={() => Editable !== 'schoolemail' ? edit('schoolemail') : submit('school_email', user.schoolemail)} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                            </div>
                        </div>
                    </div>


                    <div className={styles.profile_overview}>
                        <h2>profile Picture</h2>
                        <div className={styles.profile_logo}>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                {
                                    user.secure_url !== null ?
                                        <label htmlFor="Logo"
                                            style={{ width: '300px', cursor: 'pointer', margin: '10px 10px 40px', padding: '0px', height: '300px', fontSize: 'small', color: 'gray', position: 'relative' }}
                                        >
                                            <img src={preview !== '' ? preview : user.secure_url} alt="" style={{ width: '100%', margin: '0px', height: '100%', borderRadius: '10px', objectFit: 'contain' }} />
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
                                <button disabled={buttonenabled} className={styles.logo_button} style={{ backgroundColor: buttonenabled ? '#2A3E66' : '#3B74E6' }} onClick={submitImg} >
                                    Upload Image
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className={styles.profile_overview}>
                        <h2>Contact/Delivery Information</h2>
                        <div className={styles.profile_info}>
                            <div style={{ position: 'relative', width: '40%', minWidth: '230px' }}>
                                <h4 style={{ color: 'white' }}>Phone Number</h4>
                                <input
                                    type="number"
                                    name="number" id=""
                                    value={user.number}
                                    className={styles.profile_text}
                                    readOnly={Editable !== 'Number'}
                                    onChange={(e) => UpdateCred(e)} />
                                <FontAwesomeIcon icon={Editable === 'Number' ? faCheck : faPencil} color='#F5F7FA' onClick={() => Editable !== 'Number' ? edit('Number') : submit('number', user.number)} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                            </div>
                            <div style={{ position: 'relative', width: '40%', minWidth: '230px' }}>
                                <h4 style={{ color: 'white' }}>Email</h4>
                                <input
                                    type="text"
                                    name="email" id=""
                                    value={user.email}
                                    className={styles.profile_text}
                                    readOnly={Editable !== 'Email'}
                                    onChange={(e) => UpdateCred(e)} />
                                <FontAwesomeIcon icon={Editable === 'Email' ? faCheck : faPencil} color='#F5F7FA' onClick={() => Editable !== 'Email' ? edit('Email') : submit('email', user.email)} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px 5px', cursor: 'pointer' }} />
                            </div>
                            <div style={{ position: 'relative', width: '40%', minWidth: '230px' }}>
                                <h4 style={{ color: 'white' }}>Hall</h4>
                                <input
                                    type="text"
                                    name="hall" id=""

                                    value={user.hall}
                                    className={styles.profile_input}
                                    readOnly={Editable !== 'hall'}
                                    onChange={(e) => UpdateCred(e)}
                                />
                                <FontAwesomeIcon icon={Editable === 'hall' ? faCheck : faPencil} color='#F5F7FA' onClick={() => Editable !== 'hall' ? edit('hall') : submit('hall', user.hall)} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                            </div>
                            <div style={{ position: 'relative', width: '40%', minWidth: '230px' }}>
                                <h4 style={{ color: 'white' }}>Room</h4>
                                <input
                                    type="text"
                                    name="room" id=""

                                    value={user.room}
                                    className={styles.profile_input}
                                    readOnly={Editable !== 'room'}
                                    onChange={(e) => UpdateCred(e)}
                                />
                                <FontAwesomeIcon icon={Editable === 'room' ? faCheck : faPencil} color='#F5F7FA' onClick={() => Editable !== 'room' ? edit('room') : submit('hall', user.room)} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                            </div>
                        </div>
                    </div>

                </div>
            </>
        </div >
    )
}

export default AccountProfile