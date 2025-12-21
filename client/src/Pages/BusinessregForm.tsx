import busregstyles from '../styles/businessregForm.module.css'
import React, { useEffect, useState } from 'react';
import validateEmail from '../utils/validateEmail';
import type { formstate } from '../utils/types/fullPage.types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { type Axios_Req_With_Url } from "../utils/config/axios_config"
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type Bank = {
    id: number;
    name: string;
    slug: string;
    code: string;
    longcode: string | null;
    gateway: string | null;
    pay_with_bank: boolean;
    supports_transfer: boolean;
    available_for_direct_debit: boolean;
    active: boolean;
    country: string;
    currency: string;
    type: string;
    is_deleted: boolean;
    createdAt: string;  // or Date if you plan to convert it
    updatedAt: string;  // or Date if you plan to convert it
};

type VerifiedAccount = {
    account_number: string;
    account_name: string;
    bank_id: number;
};

function BusinessRegForm() {
    const navigate = useNavigate()
    const [nameErr, setnameErr] = useState<boolean>(false)
    const [bankDetails, setbankDetails] = useState<VerifiedAccount[]>([])
    const [registeredBanks, setregisteredbanks] = useState<Bank[]>([])
    const [isOpen, setisOpen] = useState('')
    const [delivery, setdelivery] = useState('')
    const [category, setcategory] = useState('')
    const [bank, setbank] = useState('')
    const [days, setdays] = useState<string[]>([])
    const [validemail, setvalidemail] = useState<boolean | null>(null)
    const [filled, setfilled] = useState<formstate>({
        Number: false,
        Email: false,
        BusinessName: false,
        Category: false,
        BusinessDescription: false,
        Deliverydays: false,
        Acc_number: false,
        Bank: false,
        Hall: false,
        roomNumber: false
    })

    const [businesscred, setbusinesscred] = useState({
        Number: '',
        Email: '',
        BusinessName: '',
        Category: '',
        BusinessDescription: '',
        Deliverydays:'',
        Acc_number: '',
        Bank: '',
        Hall: '',
        roomNumber: ''
    })
    useEffect(() => {
        axios.get('http://localhost:3000/business/verify_account')
            .then(res => setregisteredbanks(res.data.data))
    }, [])
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (businesscred.Acc_number.length >= 10 && bank !== '') {
                axios.get('http://localhost:3000/business/get_bank_account', {
                    params: {
                        account_number: businesscred.Acc_number,
                        bank_code: registeredBanks.filter((banks) => banks.name === bank)[0].code
                    }
                })
                    .then(res => {
                        console.log(res.data)
                        setbankDetails([res.data])
                    })
            }
            else {
                console.log('not ready for service')
            }
        }, 3500);
        return () => clearTimeout(timeout)
    }, [businesscred.Acc_number, bank])

    useEffect(() => {
        setbusinesscred(prev => (
            { ...prev, Category: category, Deliverydays: days.toString(), Bank: bank }
        ));
    }, [category, days, bank]);

    useEffect(() => {
        setvalidemail(validateEmail(businesscred.Email))
    }, [businesscred.Email])
    async function listclick(string: string, name: string) {
        if (name === 'category') {
            setcategory(string)
            setfilled((prevVal) => {
                return {
                    ...prevVal,
                    Category: string === ''
                }

            })
            setisOpen('')
        } else if (name === 'Delivery') {
            setdays(days => {
                if (!days.includes(string)) {
                    return [...days, string]
                }
                else {
                    return days.filter(day => day !== string)
                }

            })
            setdelivery(string)
            setfilled((prevVal) => {
                return {
                    ...prevVal,
                    DeliveryTime: string === ''
                }
            })
        } else if (name === 'Bank') {
            setbank(string)
            setfilled((prevVal) => {
                return {
                    ...prevVal,
                    Bank: string === ''
                }
            })
            setisOpen('')
        }
    }
    function UpdateCred(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.currentTarget
        setfilled((prevVal) => {
            return {
                ...prevVal,
                [name]: value === ''
            }
        })
        setbusinesscred((prevObj) => {
            return {
                ...prevObj,
                [name]: value
            }
        })

    }

    async function FormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const arr = Object.values(businesscred)
        console.log(filled)
        if (arr.includes('')) {
            console.log('button disabled')
            Object.entries(businesscred).forEach(([key, value]) => {
                setfilled((prevVal) => {
                    return {
                        ...prevVal,
                        [key]: value === ''
                    }
                })
            });
        }
        else {
            console.log('button active')
            const post_request = await axios.post('http://localhost:3000/business/new', businesscred, { withCredentials: true, Link: '/' } as Axios_Req_With_Url)
            const { same_name_err } = post_request.data
            if (same_name_err) {
                setnameErr(true)
                window.scrollTo(0, 0)
            }

            else {
                navigate('/')
            }

        }
        console.log(arr)
    }

    return (
        <form onSubmit={FormSubmit}>
            <section
                style={{ width: '100%', height: '80%', display: 'flex', margin: '20px 0px', flexDirection: 'column', boxSizing: 'border-box', backgroundColor: 'black', borderRadius: '10px', padding: '0px 0px 20px' }}
                className={busregstyles.busform_section}
            >

                <div style={{ padding: '20px 100px ', backgroundColor: '#FF7A00', borderRadius: '10px 10px 0px 0px', boxSizing: 'border-box' }}>
                    <h2 style={{ color: 'white', padding: '0px 0px 10px' }}>
                        Add Your Business
                    </h2>
                    <p style={{ color: 'white' }}>
                        Share your business with the plug community
                    </p>
                </div>
                <div style={{ overflow: 'auto', boxSizing: 'border-box', margin: '15px', width: '100%' }}>
                    <div style={{ width: '100%', height: 'auto', borderRadius: '20px', boxSizing: 'border-box', boxShadow: '0px 20px 20px rgba(0,0,0,0.2)', backgroundColor: 'black' }}>
                        <h2 style={{ fontFamily: '"Comfortaa", sans-serif', fontWeight: 'light', fontSize: 'large', textAlign: 'center', color: 'white' }}>
                            Business Information
                        </h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                            <div className={busregstyles.inputDiv}>
                                <p>Business Name </p>
                                {nameErr && <label >business name already exists</label>}
                                {filled.BusinessName && <label >*pls fill in this space</label>}
                                <input placeholder="Enter your business name" name="BusinessName" value={businesscred.BusinessName} onChange={(e) => { setnameErr(false); UpdateCred(e) }} />
                            </div>

                            <div className={busregstyles.inputDiv}>
                                <p>Business Category</p>
                                {filled.Category && <label >*pls fill in this space</label>}
                                <input placeholder="Select category" name="Category" value={businesscred.Category} onClick={() => { isOpen === 'Category' ? setisOpen('') : setisOpen('Category') }} readOnly />
                                {isOpen === 'Category' &&
                                    <div className={busregstyles.dropdown_menu}>
                                        <ul>
                                            <li onClick={() => { listclick('Cosmetics', 'category') }}>Cosmetics</li>
                                            <li onClick={() => { listclick('Clothing', 'category') }}>Clothing</li>
                                            <li onClick={() => { listclick('Food', 'category') }}>Food</li>

                                        </ul>
                                    </div>
                                }
                            </div>

                            <div className={busregstyles.inputDiv}>
                                <p>Business Description</p>
                                {filled.BusinessDescription && <label >*pls fill in this space</label>}
                                <textarea style={{ height: '75px' }} placeholder="Enter a brief descripton of your business" name="BusinessDescription" value={businesscred.BusinessDescription} onChange={UpdateCred} />
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: 'auto', borderRadius: '20px', boxSizing: 'border-box', boxShadow: '0px 20px 20px rgba(0,0,0,0.2)' }}>
                        <h2 style={{ fontFamily: '"Comfortaa", sans-serif', fontWeight: 'light', fontSize: 'large', textAlign: 'center', color: 'white' }}>
                            Contact Information
                        </h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>

                            <div className={busregstyles.inputDiv}>
                                <p>Email Address</p>
                                {filled.Email && <label >*pls fill in this space</label>}
                                {validemail !== null && !validemail && <label >*invalid email </label>}
                                <input type='email' placeholder="Enter your email Address" name="Email" value={businesscred.Email} onChange={UpdateCred} onBlur={() => setvalidemail(validateEmail(businesscred.Email))} />
                            </div>

                            <div className={busregstyles.inputDiv}>
                                <p>Whatsapp Number</p>
                                {filled.Number && <label >*pls fill in this space</label>}
                                <input type="number" placeholder='Enter your whatsapp number' name="Number" id="" value={businesscred.Number} onChange={UpdateCred} />
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: 'auto', borderRadius: '20px', boxSizing: 'border-box', boxShadow: '0px 20px 20px rgba(0,0,0,0.2)' }}>
                        <h2 style={{ fontFamily: '"Comfortaa", sans-serif', fontWeight: 'light', fontSize: 'large', textAlign: 'center', color: 'white' }}>
                            Account Details
                        </h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>

                            <div className={busregstyles.inputDiv}>
                                <p>Bank Name</p>
                                {filled.Email && <label >*pls fill in this space</label>}
                                {validemail !== null && !validemail && <label >*invalid email </label>}
                                <input type='text' placeholder="Enter your bank name" name="Bank" value={bank} onBlur={() => setvalidemail(validateEmail(businesscred.Email))} onClick={() => { isOpen === 'Bank' ? setisOpen('') : setisOpen('Bank') }} readOnly />
                                {isOpen === 'Bank' &&
                                    <div className={busregstyles.dropdown_menu}>
                                        <ul>
                                            {registeredBanks.map((bank) => {
                                                return <li key={bank.id} onClick={() => { listclick(bank.name, 'Bank') }}>{bank.name}</li>
                                            })}

                                        </ul>
                                    </div>
                                }
                            </div>

                            <div className={busregstyles.inputDiv}>
                                <p>Account Number</p>
                                {filled.Acc_number && <label >*pls fill in this space</label>}
                                <input type='number' placeholder='account number' name="Acc_number" value={businesscred.Acc_number} onChange={UpdateCred} />
                            </div>
                            <div className={busregstyles.inputDiv}>
                                <p>Account Holder Name</p>
                                <input type="text" placeholder='See Account Name here' name="Number" id="" value={bankDetails[0] ? bankDetails[0].account_name : ''} onChange={UpdateCred} readOnly />
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: 'auto', borderRadius: '20px', boxSizing: 'border-box', boxShadow: '0px 20px 20px rgba(0,0,0,0.2)', }}>
                        <h2 style={{ fontFamily: '"Comfortaa", sans-serif', fontWeight: 'light', fontSize: 'large', textAlign: 'center', color: 'white' }}>
                            Delivery
                        </h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                            <div className={busregstyles.inputDiv}>
                                <p>Expected delivery days</p>
                                {filled.Deliverydays && <label>*pls fill in this space</label>}
                                <input value={days} placeholder="Expected days of delivery" name="room" onClick={() => { isOpen === 'Delivery' ? setisOpen('') : setisOpen('Delivery') }} readOnly />
                                {isOpen === 'Delivery' &&
                                    <div className={busregstyles.dropdown_menu}>
                                        <ul>
                                            <li style={{ fontWeight: 'lighter' }} onClick={() => { listclick('Monday', 'Delivery') }}>Monday {days.includes('Monday') && <FontAwesomeIcon icon={faCheck} />}</li>
                                            <li style={{ fontWeight: 'lighter' }} onClick={() => { listclick('Tuesday', 'Delivery') }}>Tuesday {days.includes('Tuesday') && <FontAwesomeIcon icon={faCheck} />}</li>
                                            <li style={{ fontWeight: 'lighter' }} onClick={() => { listclick('Wednesday', 'Delivery') }}>Wednesday {days.includes('Wednesday') && <FontAwesomeIcon icon={faCheck} />}</li>
                                            <li style={{ fontWeight: 'lighter' }} onClick={() => { listclick('Thursday', 'Delivery') }}>Thursday {days.includes('Thursday') && <FontAwesomeIcon icon={faCheck} />}</li>
                                            <li style={{ fontWeight: 'lighter' }} onClick={() => { listclick('Friday', 'Delivery') }}>Friday {days.includes('Friday') && <FontAwesomeIcon icon={faCheck} />}</li>
                                            <li style={{ fontWeight: 'lighter' }} onClick={() => { listclick('Saturday', 'Delivery') }}>Saturday {days.includes('Saturday') && <FontAwesomeIcon icon={faCheck} />}</li>
                                            <li style={{ fontWeight: 'lighter' }} onClick={() => { listclick('Sunday', 'Delivery') }}>Sunday {days.includes('Sunday') && <FontAwesomeIcon icon={faCheck} />}</li>
                                        </ul>
                                    </div>
                                }
                            </div>
                            <div className={busregstyles.inputDiv} style={{ width: '50%', marginRight: 'auto' }}>
                                <p>Hall</p>
                                {filled.Hall && <label style={{ fontSize: 'x-small' }} >*pls fill in this space</label>}
                                <input placeholder="Hall" name="Hall" value={businesscred.Hall} onChange={UpdateCred} />
                            </div>
                            <div className={busregstyles.inputDiv} style={{ width: '50%', margin: '10px' }}>
                                <p>Room Number</p>
                                {filled.roomNumber && <label style={{ fontSize: 'x-small' }} >*pls fill in this space</label>}
                                <input placeholder="Room Number" name="roomNumber" value={businesscred.roomNumber} onChange={UpdateCred} />
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <button type='submit' className={busregstyles.submit_button} >
                            Submit
                        </button>
                    </div>
                </div>
            </section >
        </form>

    )
}
export default BusinessRegForm