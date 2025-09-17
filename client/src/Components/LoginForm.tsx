import { Link, useLocation } from 'react-router-dom';
type credential = {
    email: string,
    password: string
}
import googleLogo from '../assets/google.png'

type Form = {
    FirstName: string;
    SecondName: string;
    ButtonName: string;
    UpdateCredentials: (name: string, value: string) => void
    submitForm: (event: any) => void
    Credentials: credential
    // background_state : {}
}
function LoginForm(props: Form) {
    function changeCredentials(event: any) {
        const { name, value } = event.target
        props.UpdateCredentials(name, value)
    }

    return (
        <form onSubmit={props.submitForm} >
            <div className="second_page" id='second_page'>
                <div className='second_header'>Welcome to Plug</div>
                <div className="signup_div" id='email'>
                    {/* <p>{props.FirstName}</p> */}
                    <input className="signup_input" type="email" name="email" id="signUp_email" placeholder={props.FirstName} value={props.Credentials.email} onChange={changeCredentials} />
                </div>
                <div className="signup_div" id="password">
                    {/* <p>{props.SecondName}</p> */}
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
                    <p></p>
                    Or
                    <p></p>
                </div>
                <div className='googlelinkDiv'>
                    <div>
                        <img src={googleLogo} alt="google img" />
                        <p>Continue with Google</p>
                    </div>
                </div>
                <div className='signup_link'>
                    <p>don't have an account ? </p>
                    <span><Link to={'/signup'}><button type="button" className='button'>Sign Up</button></Link></span>
                </div>
            </div>
        </form>
    )
}
export default LoginForm