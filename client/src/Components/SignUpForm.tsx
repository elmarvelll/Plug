import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
type credential = {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    username: string
}
type Form = {
    FirstName: string;
    SecondName: string;
    ButtonName: string;
    UpdateCredentials: (name: string, value: string) => void
    submitForm: (event: any) => void

    Credentials: credential
}
function SignupForm(props: Form) {
    const firstPage = useRef<HTMLDivElement>(null)
    const SecondPage = useRef<HTMLDivElement>(null)


    function scrollToSecondPage() {
        SecondPage.current?.scrollIntoView({ behavior: "smooth" })
    }

    function scrollToFirstPage() {
        firstPage.current?.scrollIntoView({ behavior: "smooth" })
    }

    function changeCredentials(event: any) {
        const { name, value } = event.target
        props.UpdateCredentials(name, value)
    }

    return (
        <form onSubmit={props.submitForm} >
            <div ref={firstPage} className="first_page" id="first_page">
                <div className="signup_div" id='first_name'>
                    <p>First Name</p>
                    <input className="signup_input" type="text" name="first_name" id="first_name" placeholder='First Name' value={props.Credentials.first_name} onChange={changeCredentials} />
                </div>
                <div className="signup_div" id="last_name">
                    <p>Last Name</p>
                    <input className="signup_input" type="text" name="last_name" id="last_name" placeholder='Last Name' value={props.Credentials.last_name} onChange={changeCredentials} />
                </div>
                <div className="signup_div" id="username">
                    <p>Username</p>
                    <input className="signup_input" type="text" name="username" id="username" placeholder='Username' value={props.Credentials.username} onChange={changeCredentials} />
                </div>

                <div className="button_div">
                        <button type="button" className="button" onClick={scrollToSecondPage}><FontAwesomeIcon icon={faArrowRight} /></button>
                </div>
            </div>
            <div ref={SecondPage} className="second_page" id='/signup#second_page'>
                <div className="button_div">
                        <button
                            type="button"
                            className="button"
                            onClick={scrollToFirstPage}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                </div>
                <div className="signup_div" id='email'>
                    <p>{props.FirstName}</p>
                    <input className="signup_input" type="email" name="email" id="signUp_email" placeholder={props.FirstName} value={props.Credentials.email} onChange={changeCredentials} />
                </div>
                <div className="signup_div" id="password">
                    <p>{props.SecondName}</p>
                    <input className="signup_input" type="password" name="password" id="signUp_password" placeholder={props.SecondName} value={props.Credentials.password} onChange={changeCredentials} />
                </div>
                <div className="submit_button_div">
                    <div className="nav_link white">
                        <button
                            type="submit"
                            className="button">
                            {props.ButtonName}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default SignupForm