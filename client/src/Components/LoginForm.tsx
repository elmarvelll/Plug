import { Link } from 'react-router-dom';
type credential = {
    email: string,
    password: string
}
type EmptyCheck = {
    email: boolean,
    password: boolean,
}

import googleLogo from '../assets/google.png'

type Form = {
    FirstName: string;
    SecondName: string;
    ButtonName: string;
    UpdateCredentials: (name: string, value: string) => void
    submitForm: (event: any) => void
    Credentials: credential;
    emptystring: EmptyCheck
    invalidEmail: boolean
    path:string
}
function LoginForm(props: Form) {
    function changeCredentials(event: any) {
        const { name, value } = event.target
        props.UpdateCredentials(name, value)
    }
    return (
        <form onSubmit={props.submitForm} >
            <div className="first_page" id='first_page'>
                <div className="signup_div" id='email'>
                    <p>{props.FirstName}</p>
                    {props.emptystring.email && <span style={{ color: 'red', fontSize: 'x-small' }}>Please fill this space</span>}
                    {props.invalidEmail && <span style={{ color: 'red', fontSize: 'x-small' }}>Invalid email or password</span>}
                    <input className="signup_input" type="email" name="email" id="signUp_email" placeholder={props.FirstName} value={props.Credentials.email} onChange={changeCredentials} />
                </div>
                <div className="signup_div" id="password">
                    <p>{props.SecondName}</p>
                    {props.emptystring.password && <span style={{ color: 'red', fontSize: 'x-small' }}>Please fill this space</span>}
                    <input className="signup_input" type="password" name="password" id="signUp_password" placeholder={props.SecondName} value={props.Credentials.password} onChange={changeCredentials} />
                </div>
                <div className="submit_button_div">
                    <button
                        type="submit"
                        className="login_button"
                    >
                        {props.ButtonName}
                    </button>
                </div>
                <div className='lineDiv'>
                    <p>Or</p>
                </div>
                <div className='googlelinkDiv'>
                    <div>
                        <img src={googleLogo} alt="google img" />
                        <p>Continue with Google</p>
                    </div>
                </div>
                <div className='signup_link'>
                    <p>don't have an account ? </p>
                    <span><Link to={'/signup'} state={{expectPath:props.path }}><button type="button" className='button'>Sign Up</button></Link></span>
                </div>
            </div>
        </form>
    )
}
export default LoginForm