import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import validateEmail from "../utils/validateEmail"

type credential = {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    number: string,
    hall: string,
    room: string
    school_email: string
}
type EmptyCheck = {
    email: boolean,
    password: boolean,
    first_name: boolean,
    last_name: boolean,
    number: boolean,
    hall: boolean,
    room: boolean
    school_email: boolean
}
type Form = {
    UpdateCredentials: (name: string, value: string) => void
    submitForm: (event: any) => void
    Credentials: credential;
    emptystring: EmptyCheck,
    email: boolean,
    schoolemail: boolean,
    clearEmail: () => void
}
function SignupForm(props: Form) {
    const [validemail, setvalidemail] = useState<boolean | null>(null)

    function changeCredentials(event: any) {
        const { name, value } = event.target
        props.UpdateCredentials(name, value)
    }

    useEffect(() => {
        setvalidemail(validateEmail(props.Credentials.email))
    }, [props.Credentials.email])

    return (
        <form onSubmit={props.submitForm} >
            <div className="first_page" id="first_page">
                <div className="signup_div_group" id='first_name'>
                    <p style={{color:'white'}}>First Name</p>
                    {props.emptystring.first_name && <span style={{ color: 'red', fontSize: 'x-small' }}>required</span>}
                    <input className="signup_input" type="text" name="first_name" id="first_name" placeholder='First Name' value={props.Credentials.first_name} onChange={changeCredentials} />
                </div>
                <div className="signup_div_group" id="last_name">
                    <p style={{color:'white'}}>Last Name</p>
                    {props.emptystring.last_name && <span style={{ color: 'red', fontSize: 'x-small' }}>required</span>}
                    <input className="signup_input" type="text" name="last_name" id="last_name" placeholder='Last Name' value={props.Credentials.last_name} onChange={changeCredentials} />
                </div>
                <div className="signup_div" id="number">
                    <p>Phone Number</p>
                    {props.emptystring.number && <span style={{ color: 'red', fontSize: 'x-small' }}>required</span>}
                    <input className="signup_input" type="number" name="number" id="number" placeholder='Phone Number' value={props.Credentials.number} onChange={changeCredentials} />
                </div>
                <div className="signup_div" id='school_email'>
                    <p>School email</p>
                    {props.schoolemail && <span style={{ color: 'red', fontSize: 'x-small' }}>school email already exists</span>}
                    {props.emptystring.school_email && <span style={{ color: 'red', fontSize: 'x-small' }}>required</span>}
                    <div style={{ position: 'relative' }}>
                        <input style={{ paddingRight: '150px' }} className="signup_input" type="text" name="school_email" id="school_email" placeholder='email' value={props.Credentials.school_email} onChange={(e) => { changeCredentials(e); props.clearEmail() }} />
                        <span style={{ position: 'absolute', right: '10px', top: '20%' }}>@stu.cu.edu.ng</span>
                    </div>
                </div>
                <div className="signup_div" id='email'>
                    <p>Normal email <span style={{ color: "gray" }}>(*optional)</span></p>
                    {validemail !== null && !validemail && <span style={{ color: 'red', fontSize: 'x-small' }}>*invalid email </span>}
                    {props.email && <span style={{ color: 'red', fontSize: 'x-small' }}>email already exists</span>}
                    <input className="signup_input" type="email" name="email" id="signUp_email" placeholder='Email' value={props.Credentials.email} onChange={(e) => { changeCredentials(e); props.clearEmail() }} onBlur={() => setvalidemail(validateEmail(props.Credentials.email))} />
                </div>
                <div className="signup_div" id="password">
                    <p>Password</p>
                    {props.emptystring.password && <span style={{ color: 'red', fontSize: 'x-small' }}>required</span>}
                    <input className="signup_input" type="password" name="password" id="signUp_password" placeholder='Password' value={props.Credentials.password} onChange={changeCredentials} />
                </div>
                <div className="signup_div_group" id="Hall">
                    <p>Hall</p>
                    {props.emptystring.hall && <span style={{ color: 'red', fontSize: 'x-small' }}>required</span>}
                    <input className="signup_input" type="text" name="hall" id="Hall" placeholder='Peter' value={props.Credentials.hall} onChange={changeCredentials} />
                </div>
                <div className="signup_div_group" id="Room">
                    <p>Room Number</p>
                    {props.emptystring.room && <span style={{ color: 'red', fontSize: 'x-small' }}>required</span>}
                    <input className="signup_input" type="text" name="room" id="Room" placeholder='D204' value={props.Credentials.room} onChange={changeCredentials} required />
                </div>
                <div className="submit_button_div">
                    <button
                        type="submit"
                        className="login_button"
                    >
                        Sign Up
                    </button>
                </div>
                <div className='signup_link'>
                    <p style={{color:'white'}}>Already have an account ? </p>
                    <span><Link to={'/login'}><button type="button" className='button'>Log In</button></Link></span>
                </div>
            </div>
        </form>
    )
}
export default SignupForm