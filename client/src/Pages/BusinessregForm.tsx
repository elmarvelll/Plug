import busregstyles from '../styles/businessregForm.module.css'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import BadTick from '../assets/shape.png'
import GoodTick from '../assets/checkmark.png'
import React, { useEffect, useState } from 'react';
import uploadImg from '../utils/uploadImage';
import slideAnimationVariants from '../utils/slideAnimationsVariants';
import validateEmail from '../utils/validateEmail';
import type { fullPage, Page, formstate, donestate } from '../utils/types/fullPage.types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { type Axios_Req_With_Url } from "../utils/config/axios_config"



const { sectionVariants, inputVariants } = slideAnimationVariants()



function BusinessRegForm() {
    const [searchParams, setsearchParams] = useSearchParams()
    const navigate = useNavigate()
    const [isOpen, setisOpen] = useState('')
    const [delivery, setdelivery] = useState('')
    const [category, setcategory] = useState('')
    const [operatingdays, setoperationdays] = useState('')
    const [validemail, setvalidemail] = useState<boolean | null>(null)
    const [dayarr, setarr] = useState<string[]>([])
    const [clicked, setclicked] = useState<boolean>(false)
    const [imgfile, setimgfile] = useState<File | null>(null)
    const [level, setlevel] = useState('')
    const [filled, setfilled] = useState<formstate>({
        firstPage: {
            fullName: false,
            Number: false,
            MatNo: false,
            Level: false,
            Email: false
        },
        secondPage: {
            BusinessName: false,
            Category: false,
            BuisnessDescription: false,
        },
        thirdPage: {
            OperatingDays: false,
            Delivery: false

        }
    })
    const [done, setdone] = useState<donestate>({
        firstPage: false,
        secondPage: false,
        thirdPage: false
    })
    const [businesscred, setbusinesscred] = useState({
        firstPage: {
            fullName: '',
            Number: '',
            MatNo: '',
            Level: '',
            Email: ''
        },
        secondPage: {
            BusinessName: '',
            Category: '',
            BuisnessDescription: '',
        },
        thirdPage: {
            OperatingDays: '',
            Delivery: ''
        }
    })

    let page = searchParams.get('page')
    function changePage(str: string) {
        const params = new URLSearchParams(searchParams)
        params.set('page', str)
        setsearchParams(params)
    }

    function slideforward() {
        const pagenum = Number(searchParams.get('page'))
        if (!(pagenum + 1 > 3)) {
            const params = new URLSearchParams(searchParams)
            params.set('page', (pagenum + 1).toString())
            setsearchParams(params)
        }
    }

    function slideBackwards() {
        const pagenum = Number(searchParams.get('page'))
        if (!(pagenum - 1 < 1)) {
            const params = new URLSearchParams(searchParams)
            params.set('page', (pagenum - 1).toString())
            setsearchParams(params)
        }
    }
    useEffect(() => {
        if (dayarr.length === 0) {
            setoperationdays('')
        }
        setfilled((prevVal) => {
            return {
                ...prevVal,
                thirdPage: {
                    ...prevVal.thirdPage,
                    OperatingDays: false
                }
            }
        })
    }, [dayarr])
    useEffect(() => {
        setdone({
            firstPage: !Object.values(businesscred.firstPage).includes('') && validemail,
            secondPage: !Object.values(businesscred.secondPage).includes(''),
            thirdPage: !Object.values(businesscred.thirdPage).includes('')
        });
    }, [businesscred, validemail])

    useEffect(() => {
        setbusinesscred(prev => ({
            ...prev,
            firstPage: { ...prev.firstPage, Level: level },
            secondPage: { ...prev.secondPage, Category: category },
            thirdPage: {
                ...prev.thirdPage,
                Delivery: delivery,
                OperatingDays: operatingdays
            }
        }));
    }, [level, category, delivery, operatingdays]);

    useEffect(() => {
        setvalidemail(validateEmail(businesscred.firstPage.Email))
    }, [businesscred.firstPage.Email])

    async function updateArr(day: string) {
        setoperationdays(day)
        if (dayarr.includes(day)) {
            return setarr((prevval) => {
                return prevval.filter((date) => {
                    return date !== day
                })
            })
        } else {
            return setarr(prevval => [...prevval, day])
        }
    }

    async function listclick(string: string, name: string) {
        name !== 'days' && setisOpen('')
        if (name === 'level') {
            setlevel(string)
            setfilled((prevVal) => {
                return {
                    ...prevVal,
                    firstPage: {
                        ...prevVal.firstPage,
                        Level: string === ''
                    }
                }
            })
        } else if (name === 'category') {
            setcategory(string)
            setfilled((prevVal) => {
                return {
                    ...prevVal,
                    secondPage: {
                        ...prevVal.secondPage,
                        Category: string === ''
                    }
                }
            })
        } else if (name === 'delivery') {
            setdelivery(string)
            setfilled((prevVal) => {
                return {
                    ...prevVal,
                    thirdPage: {
                        ...prevVal.thirdPage,
                        Delivery: string === ''
                    }
                }
            })
        } else if (name === 'days') {
            updateArr(string)
        }

    }

    function addImg(event: React.ChangeEvent<HTMLInputElement>) {
        const { files } = event.target
        const page = event.currentTarget.dataset.page as Page
        if (page) {
            if (files && files[0]) {
                setimgfile(files[0])
            } else {
                setimgfile(null)
            }
        } else {
            console.log('page does not exist')
        }

    }
    function UpdateCred(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.currentTarget
        const page = event.currentTarget.dataset.page as Page
        if (page) {
            setfilled((prevVal) => {
                return {
                    ...prevVal,
                    [page]: {
                        ...prevVal[page],
                        [name]: value === ''
                    }
                }
            })
            setbusinesscred((prevObj): fullPage => {
                const updated = {
                    ...prevObj,
                    [page]: {
                        ...prevObj[page], [name]: value
                    }
                }
                return (updated)
            })
        }
        else {
            console.log('page doesnt exist')
        }

    }

    async function FormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const arr = Object.values(done)
        if (arr.includes(false)) {
            console.log('button disabled')
            Object.entries(businesscred).forEach(([firstkey, firstvalue]) => {
                Object.entries(firstvalue).forEach(([key, value]) => {
                    setfilled((prevVal) => {
                        const updated = {
                            ...prevVal,
                            [firstkey]: {
                                ...prevVal[firstkey as keyof formstate],
                                [key]: value === ''
                            }
                        }
                        return updated
                    })
                });
            });
        }
        else {
            console.log('button active')
            const img = await uploadImg(imgfile)
            const data = {
                firstSection: businesscred.firstPage,
                secondSection: businesscred.secondPage,
                thirdSection: {
                    operatingdays: dayarr,
                    delivery: businesscred.thirdPage.Delivery
                },
                businessImgDetails: img
            }
            await axios.post('http://localhost:3000/NewBusiness', data, { withCredentials: true, Link: '/' } as Axios_Req_With_Url)
            navigate('/')
        }
        console.log(arr)
    }

    return (
        <form onSubmit={FormSubmit}>
            <div className={busregstyles.busreg_menu}>
                <section>
                    <div onClick={() => { changePage('1') }} className={page === '1' ? ` ${busregstyles.busreg_item} ${busregstyles.active}` : busregstyles.busreg_item}>Personal Information {done.firstPage ? <img src={GoodTick} alt="" /> : <img src={BadTick} alt="" />}</div>
                    <div onClick={() => { changePage('2') }} className={page === '2' ? ` ${busregstyles.busreg_item} ${busregstyles.active}` : busregstyles.busreg_item}>Business Information {done.secondPage ? <img src={GoodTick} alt="" /> : <img src={BadTick} alt="" />}</div>
                    <div onClick={() => { changePage('3') }} className={page === '3' ? ` ${busregstyles.busreg_item} ${busregstyles.active}` : busregstyles.busreg_item}>Availability and operations {done.thirdPage ? <img src={GoodTick} alt="" /> : <img src={BadTick} alt="" />}</div>
                </section>

            </div>

            <div className={busregstyles.busreg_inputs}>
                <AnimatePresence mode='wait' >
                    {page === '1' &&
                        <motion.section
                            className={busregstyles.personalInfodiv}
                            key={'page1'}
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={sectionVariants}
                        >
                            <motion.div variants={inputVariants} transition={{ type: 'tween' }}>
                                {filled.firstPage.fullName && <label > *pls fill in this space</label>}
                                <motion.input data-page='firstPage' type="text" name="fullName" autoComplete='off' placeholder="Full Name" id="" value={businesscred.firstPage.fullName} onChange={UpdateCred} />
                            </motion.div>
                            <motion.div variants={inputVariants} transition={{ type: 'tween' }}>
                                {filled.firstPage.Number && <label >*pls fill in this space</label>}
                                <motion.input data-page='firstPage' type="number" placeholder='Number' name="Number" id="" value={businesscred.firstPage.Number} onChange={UpdateCred} />
                            </motion.div>
                            <motion.div variants={inputVariants} transition={{ type: 'tween' }}>
                                {filled.firstPage.MatNo && <label >*pls fill in this space</label>}
                                <motion.input data-page='firstPage' type="text" placeholder="Matric Number" name="MatNo" value={businesscred.firstPage.MatNo} onChange={UpdateCred} />
                            </motion.div>
                            <motion.div variants={inputVariants} transition={{ type: 'tween' }}>
                                {filled.firstPage.Level && <label >*pls fill in this space</label>}
                                <motion.input data-page='firstPage' type="number" placeholder="Level" name="Level" value={level} onClick={() => { isOpen === 'Level' ? setisOpen('') : setisOpen('Level') }} />
                                {isOpen === 'Level' &&
                                    <div className={busregstyles.dropdown_menu}>
                                        <ul>
                                            <li onClick={() => { listclick('100', 'level') }}>100</li>
                                            <li onClick={() => { listclick('200', 'level') }}>200</li>
                                            <li onClick={() => { listclick('300', 'level') }}>300</li>
                                            <li onClick={() => { listclick('400', 'level') }}>400</li>
                                            <li onClick={() => { listclick('500', 'level') }}>500</li>
                                        </ul>
                                    </div>}
                            </motion.div>
                            <motion.div variants={inputVariants} transition={{ type: 'tween' }}>
                                {filled.firstPage.Email && <label >*pls fill in this space</label>}
                                {validemail !== null && !validemail && <label >*invalid email </label>}
                                <motion.input data-page='firstPage' type='email' placeholder="Email Address" name="Email" value={businesscred.firstPage.Email} onChange={UpdateCred} onBlur={() => setvalidemail(validateEmail(businesscred.firstPage.Email))} />
                            </motion.div>
                        </motion.section>
                    }
                    {page === '2' &&
                        <motion.section
                            className={busregstyles.businessInfodiv}
                            key={'page2'}
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={sectionVariants}
                        >
                            <motion.div variants={inputVariants} transition={{ type: 'tween' }}>
                                {filled.secondPage.BusinessName && <label >*pls fill in this space</label>}
                                <motion.input data-page='secondPage' placeholder="Buisness Name" name="BusinessName" value={businesscred.secondPage.BusinessName} onChange={UpdateCred} />
                            </motion.div>
                            <motion.div variants={inputVariants} transition={{ type: 'tween' }}>
                                {filled.secondPage.Category && <label >*pls fill in this space</label>}
                                <motion.input data-page='secondPage' placeholder="Category" name="Category" value={businesscred.secondPage.Category} onClick={() => { isOpen === 'Category' ? setisOpen('') : setisOpen('Category') }} readOnly />
                                {isOpen === 'Category' &&
                                    <div className={busregstyles.dropdown_menu}>
                                        <ul>
                                            <li onClick={() => { listclick('Cosmetics', 'category') }}>Cosmetics</li>
                                            <li onClick={() => { listclick('Clothing', 'category') }}>Clothing</li>
                                            <li onClick={() => { listclick('Food', 'category') }}>Food</li>

                                        </ul>
                                    </div>
                                }
                            </motion.div>
                            <motion.div variants={inputVariants} transition={{ type: 'tween' }}>
                                {filled.secondPage.BuisnessDescription && <label >*pls fill in this space</label>}
                                <motion.textarea data-page='secondPage' placeholder="Buisness Description" name="BuisnessDescription" value={businesscred.secondPage.BuisnessDescription} onChange={UpdateCred} />
                            </motion.div>
                            <motion.div variants={inputVariants} transition={{ type: 'tween' }}>
                                <p>Business Logo:</p>
                                <motion.input data-page='secondPage' type='file' accept='image/jpeg,image/png,image/jpg' placeholder="businessLogo" name="BusinessLogo" onChange={addImg} />
                            </motion.div>
                        </motion.section>
                    }
                    {page === '3' &&
                        <motion.section
                            className={busregstyles.Availabilitydiv}
                            key={'page3'}
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                            variants={sectionVariants}
                        >
                            <motion.div variants={inputVariants} transition={{ type: 'tween' }}>
                                {filled.thirdPage.OperatingDays && <label >*pls fill in this space</label>}
                                <motion.input data-page='thirdPage' type="text" placeholder="Working Days" name="OperatingDays" onClick={() => { isOpen === 'OperatingDays' ? setisOpen('') : setisOpen('OperatingDays') }} readOnly />
                                {isOpen === 'OperatingDays' &&
                                    <div className={busregstyles.dropdown_menu}>
                                        <ul>
                                            <li onClick={() => { listclick('Monday', 'days') }}>Monday {dayarr.includes('Monday') && <img src={GoodTick} alt="" />}</li>
                                            <li onClick={() => { listclick('Tuesday', 'days') }}>Tuesday {dayarr.includes('Tuesday') && <img src={GoodTick} alt="" />}</li>
                                            <li onClick={() => { listclick('Wednesday', 'days') }}>Wednesday {dayarr.includes('Wednesday') && <img src={GoodTick} alt="" />}</li>
                                            <li onClick={() => { listclick('Thursday', 'days') }}>Thursday {dayarr.includes('Thursday') && <img src={GoodTick} alt="" />}</li>
                                            <li onClick={() => { listclick('Friday', 'days') }}>Friday {dayarr.includes('Friday') && <img src={GoodTick} alt="" />}</li>
                                            <li onClick={() => { listclick('Saturday', 'days') }}>Saturday {dayarr.includes('Saturday') && <img src={GoodTick} alt="" />}</li>
                                            <li onClick={() => { listclick('Sunday', 'days') }}>Sunday {dayarr.includes('Sunday') && <img src={GoodTick} alt="" />}</li>

                                        </ul>
                                    </div>
                                }
                            </motion.div>

                            <motion.div variants={inputVariants} transition={{ type: 'tween' }}>
                                {filled.thirdPage.Delivery && <label >*pls fill in this space</label>}
                                <motion.input data-page='thirdPage' placeholder="Do You Offer Delivery Services?" name="Delivery" value={delivery} onClick={() => { isOpen === 'Delivery' ? setisOpen('') : setisOpen('Delivery') }} readOnly />
                                {isOpen === 'Delivery' &&
                                    <div className={busregstyles.dropdown_menu}>
                                        <ul>
                                            <li onClick={() => { listclick('Yes', 'delivery') }}>Yes</li>
                                            <li onClick={() => { listclick('no', 'delivery') }}>No</li>
                                        </ul>
                                    </div>
                                }
                            </motion.div>
                            <motion.button type='submit' variants={inputVariants} transition={{ type: 'tween' }} className={busregstyles.submit_button} >
                                Submit
                            </motion.button>
                        </motion.section>
                    }
                </AnimatePresence >
            </div>
            <div className={busregstyles.navButtons}>
                {page !== '1' &&
                    <button
                        type="button"
                        className={busregstyles.button1}
                        onClick={slideBackwards}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                }
                {page !== '3' &&
                    <button
                        type="button"
                        className={busregstyles.button2}
                        onClick={slideforward}
                    >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                }
            </div>
        </form>
    )
}
export default BusinessRegForm