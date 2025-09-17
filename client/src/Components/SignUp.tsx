import { useState,useContext } from "react"
import SignupForm from "./SignUpForm"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const body = document.body
import '../styles/signup_and_login.css'
import { VerifContext } from "../Approutes"

type credential = {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    username: string
}
function signUp() {
    body.style.position = 'fixed'
    const verif = useContext(VerifContext)
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState<credential>({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        username: ''
    })
    function UpdateCredentials(name: string, value: string) {
        setCredentials((prevVal) => {
            const newObj = {
                ...prevVal,
                [name]: value
            }
            return newObj
        })
    }
    function closeState() {
        navigate('/')
        body.style.overflow = 'visible'
    }

    async function submit_form(event: React.FormEvent) {
        event.preventDefault()
        try {
            await axios.post('http://localhost:3000/signup', { credentials })
                .then((res) => {
                    const { token } = res.data
                    localStorage.setItem("accesstoken", token);
                    verif?.setIsverified(true)
                })
            closeState()
        } catch (error) {
            console.log(`could not post credentials ${error}`)
        }
    }

    return (
        <div className="signUp_container">
            <div className="signUp">
                <div className="signup_header">
                    <p className="close" onClick={closeState}>x</p>
                    <div>Sign Up</div>
                </div>
                <div className="signup_intro">Sign Up</div>
                <div className="signup_form">
                    <SignupForm
                        FirstName="Email Address"
                        SecondName="Password"
                        ButtonName="Sign Up"
                        UpdateCredentials={UpdateCredentials}
                        submitForm={submit_form}
                        Credentials={credentials}
                    />
                </div>
            </div>
        </div>
    )
}

export default signUp