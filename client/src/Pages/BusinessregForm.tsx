import busregstyles from '../styles/businessregForm.module.css'
import React, { useEffect, useState } from 'react';
import validateEmail from '../utils/validateEmail';
import type { formstate } from '../utils/types/fullPage.types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { type Axios_Req_With_Url } from "../utils/config/axios_config"

function BusinessRegForm() {
    const navigate = useNavigate()
    const [nameErr, setnameErr] = useState<boolean>(false)
    const [isOpen, setisOpen] = useState('')
    const [delivery, setdelivery] = useState('')
    const [category, setcategory] = useState('')
    const [validemail, setvalidemail] = useState<boolean | null>(null)
    const [filled, setfilled] = useState<formstate>({
        Number: false,
        Email: false,
        BusinessName: false,
        Category: false,
        BusinessDescription: false,
        DeliveryTime: false,
        Hall: false,
        roomNumber: false
    })

    const [businesscred, setbusinesscred] = useState({
        Number: '',
        Email: '',
        BusinessName: '',
        Category: '',
        BusinessDescription: '',
        DeliveryTime: '',
        Hall: '',
        roomNumber: ''
    })


    useEffect(() => {
        setbusinesscred(prev => (
            { ...prev, Category: category, DeliveryTime: delivery }
        ));
    }, [category, delivery,]);

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
        } else if (name === 'Delivery') {
            setdelivery(string)
            setfilled((prevVal) => {
                return {
                    ...prevVal,
                    DeliveryTime: string === ''
                }
            })
        }
        setisOpen('')
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
            <section style={{ width: '100%', height: '100%', display: 'flex', padding: '20px 0px', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box', backgroundColor: '#F2F2F2' }}>
                <div style={{ width: '50%', height: 'auto', borderRadius: '20px', margin: '15px', padding: '20px', boxSizing: 'border-box', border: '1px solid #F5F5F5', boxShadow: '0px 20px 20px rgba(0,0,0,0.2)', backgroundColor: 'white' }}>
                    <h2 style={{ fontFamily: '"Comfortaa", sans-serif', fontWeight: 'lighter', fontSize: 'large', textAlign: 'center' }}>
                        Business Information
                    </h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                        <div className={busregstyles.inputDiv}>
                            <p>Business Name</p>
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
                <div style={{ width: '50%', height: 'auto', borderRadius: '20px', padding: '20px', margin: '15px', boxSizing: 'border-box', border: '1px solid #F5F5F5', boxShadow: '0px 20px 20px rgba(0,0,0,0.2)', backgroundColor: 'white' }}>
                    <h2 style={{ fontFamily: '"Comfortaa", sans-serif', fontWeight: 'lighter', fontSize: 'large', textAlign: 'center' }}>
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
                <div style={{ width: '50%', height: 'auto', borderRadius: '20px', padding: '20px', margin: '15px', boxSizing: 'border-box', border: '1px solid #F5F5F5', boxShadow: '0px 20px 20px rgba(0,0,0,0.2)', backgroundColor: 'white' }}>
                    <h2 style={{ fontFamily: '"Comfortaa", sans-serif', fontWeight: 'lighter', fontSize: 'large', textAlign: 'center' }}>
                        Delivery
                    </h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                        <div className={busregstyles.inputDiv}>
                            <p>Expected delivery time</p>
                            {filled.DeliveryTime && <label>*pls fill in this space</label>}
                            <input value={businesscred.DeliveryTime} placeholder="Expected time of delivery" name="room" onClick={() => { isOpen === 'Delivery' ? setisOpen('') : setisOpen('Delivery') }} readOnly />
                            {isOpen === 'Delivery' &&
                                <div className={busregstyles.dropdown_menu}>
                                    <ul>
                                        <li style={{ fontWeight: 'lighter' }} onClick={() => { listclick('Within 1 day', 'Delivery') }}>Within 1 day</li>
                                        <li style={{ fontWeight: 'lighter' }} onClick={() => { listclick('Within 2 days', 'Delivery') }}>Within 2 days</li>
                                        <li style={{ fontWeight: 'lighter' }} onClick={() => { listclick('Within 3 days', 'Delivery') }}>Within 3 days</li>
                                        <li style={{ fontWeight: 'lighter' }} onClick={() => { listclick('Within 1 week', 'Delivery') }}>Within 1 week</li>
                                    </ul>
                                </div>
                            }
                        </div>
                        <div className={busregstyles.inputDiv} style={{ width: '40%', marginRight: 'auto' }}>
                            <p>Hall</p>
                            {filled.Hall && <label style={{ fontSize: 'x-small' }} >*pls fill in this space</label>}
                            <input placeholder="Hall" name="Hall" value={businesscred.Hall} onChange={UpdateCred} />
                        </div>
                        <div className={busregstyles.inputDiv} style={{ width: '40%', margin: '10px' }}>
                            <p>Room Number</p>
                            {filled.roomNumber && <label style={{ fontSize: 'x-small' }} >*pls fill in this space</label>}
                            <input placeholder="Room Number" name="roomNumber" value={businesscred.roomNumber} onChange={UpdateCred} />
                        </div>
                    </div>
                </div>
                <button type='submit' className={busregstyles.submit_button} >
                    Submit
                </button>
            </section >
        </form>

    )
}
export default BusinessRegForm