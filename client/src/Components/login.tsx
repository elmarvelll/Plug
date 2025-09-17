import LoginForm from "./LoginForm"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import '../styles/signup_and_login.css'
import { VerifContext } from "../Approutes"
type sign = {
    closeState: () => void
}
type credential = {
    email: string,
    password: string,
}
function Login(props: sign) {
    const location = useLocation()
    const body = document.body
    const verif = useContext(VerifContext)
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState<credential>({
        email: '',
        password: ''
    })


    useEffect(() => {
        window.scrollTo(0, 0)
        body.style.overflow = 'hidden'
        window.onpopstate = () => {
            body.style.overflow = 'scroll'
            navigate('/', { replace: true })
        }
    }, [])

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
            const request = await axios.post('http://localhost:3000/login', { credentials },
                { withCredentials: true }
            )
            const { approved } = await request.data
            const { errormessage } = await request.data
            if (errormessage) navigate('/signup')
            if (approved) {
                verif?.setIsverified(true)
                navigate(location.state.expected_path)
            }
        } catch (error) {
            console.log(`could not post credentials ${error}`)
        }
    }


    return (
        <div className="signUp_container">
            <div className="signUp">
                <div className="signup_header">
                    <p className="close" onClick={closeState}>x</p>
                    <div>Log In</div>
                </div>
                <div className="login_form">
                    <LoginForm
                        FirstName="Email Address"
                        SecondName="Password"
                        ButtonName="Log In"
                        UpdateCredentials={UpdateCredentials}
                        submitForm={submit_form}
                        Credentials={credentials}
                    />
                </div>
            </div>
        </div>
    )
}
export default Login