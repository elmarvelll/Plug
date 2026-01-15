import { useEffect, useState } from 'react'
import styles from '../styles/mybusiness.module.css'
import axios from 'axios'
import type { Axios_Req_With_Url } from '../utils/config/axios_config'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faCheck } from "@fortawesome/free-solid-svg-icons";
import type { userCred } from './CheckoutPage'



function DeliveryInfo(props: { user: userCred, update: (name:string,value:string) => void }) {
    const [Editable, setEditable] = useState<string | null>('')
    function UpdateCred(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target
        props.update(name, value)
    }

    function edit(str: string) {
        console.log('edited')
        if (Editable !== str) {
            setEditable(str)
        }
        else setEditable(null)
    }


    function submit() {
        setEditable(null)
        console.log('edit')
    }

    return (
        <div className={styles.businessPage}>
            <>
                <div className={styles.profile_info}>
                    <div style={{ position: 'relative', width: '100%', minWidth: '230px',margin:'10px' }}>
                        <h3>Full Name</h3>
                        <input
                            type="text"
                            name="Name" id=""
                            value={props.user.Name}
                            className={styles.profile_input}
                            readOnly={Editable !== 'Name'}
                            onChange={(e) => UpdateCred(e)}
                        />
                        <FontAwesomeIcon icon={Editable === 'Name' ? faCheck : faPencil} color='#F5F7FA' onClick={() => Editable !== 'Name' ? edit('Name') : submit()} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer'}} />
                    </div>
                    <div style={{ position: 'relative', width: '100%', minWidth: '230px',margin:'10px' }}>
                        <h3>Email</h3>
                        <input
                            type="text"
                            name="Email" id=""
                            value={props.user.Email}
                            className={styles.profile_input}
                            readOnly={Editable !== 'Email'}
                            onChange={(e) => UpdateCred(e)}
                        />
                        <FontAwesomeIcon icon={Editable === 'Email' ? faCheck : faPencil} color='#F5F7FA' onClick={() => Editable !== 'Email' ? edit('Email') : submit()}  style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                    </div>
                    <div style={{ position: 'relative', width: '100%', minWidth: '230px',margin:'10px' }}>
                        <h3>phone Number</h3>
                        <input
                            type="text"
                            name="Number" id=""
                            value={props.user.Number}
                            className={styles.profile_input}
                            readOnly={Editable !== 'Number'}
                            onChange={(e) => UpdateCred(e)}
                        />
                        <FontAwesomeIcon icon={Editable === 'Number' ? faCheck : faPencil} color='#F5F7FA' onClick={() => Editable !== 'Number' ? edit('Number') : submit()} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                    </div>
                    <div style={{ position: 'relative', width: '100%',margin:'10px' }}>
                        <h3> Delivery Address</h3>
                        <textarea
                            name="Address" id=""
                            value={props.user.Address}
                            className={styles.profile_input}
                            readOnly={Editable !== 'Address'}
                            onChange={(e) => UpdateCred(e)} />
                        <FontAwesomeIcon icon={Editable === 'Address' ? faCheck : faPencil} color='#F5F7FA' onClick={() => Editable !== 'Address' ? edit('Address') : submit()} style={{ fontWeight: '100', position: 'absolute', bottom: '0', right: '0', margin: '10px', cursor: 'pointer' }} />
                    </div >

                </div>
            </>
        </div>
    )
}
export default DeliveryInfo