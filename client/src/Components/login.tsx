import LoginForm from "./LoginForm"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom"
import '../styles/signup_and_login.css'
import { VerifContext } from "../Approutes"

type credential = {
    email: string,
    password: string,
}
interface credLoad extends JwtPayload {
    email: string
    family_name: string
    given_name: string
    picture: string
    name: string
}
function Login() {
    const location = useLocation()
    const verif = useContext(VerifContext)
    const navigate = useNavigate()
    const [invalidEmail, setInvalidEmail] = useState<boolean>(false)

    const [credentials, setCredentials] = useState<credential>({
        email: '',
        password: ''
    })
    const [emptystring, setempty] = useState({
        email: false,
        password: false
    })

    useEffect(() => {
        window.scrollTo(0, 0)
        window.onpopstate = () => {
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

    function HandlesuccessResponse(credentialResponse: any) {
        if (credentialResponse && credentialResponse.credential) {
            const creds = jwtDecode(credentialResponse.credential) as credLoad
            console.log(creds.email)
            axios.post('http://localhost:3000/login/oauth/google', {
                email: creds.email
            })
                .then(res => {
                    console.log(res.data)
                    if (res.data.approved) {
                        navigate(location.state.expected_path)

                    }
                    if (res.data.errormessage) {
                        setInvalidEmail(true)
                    }
                })
        }
        else console.log('no credentials')
    }

    async function submit_form(event: React.FormEvent) {
        event.preventDefault()
        const allSpacesFilled = Object.entries(credentials).every(([key, value]) => {
            return value !== ''
        })
        Object.entries(credentials).map(([key, value]) => {
            setempty(prevVal => {
                const newObj = {
                    ...prevVal,
                    [key]: value === ''
                }
                return newObj
            })
        })
        if (allSpacesFilled) {
            try {
                const request = await axios.post('http://localhost:3000/login', { credentials },
                    { withCredentials: true }
                )
                const { approved, errormessage } = request.data
                if (errormessage) setInvalidEmail(true)
                if (approved) {
                    verif?.setIsverified(true)
                    navigate(location.state.expected_path)
                }
            } catch (error) {
                console.log(`could not post credentials ${error}`)
            }
        }


    }


    return (
        <div style={{ width: '100%', height: '100%', backgroundColor: '#121212', display: 'flex', alignItems: 'center' }}>
            <div className="signUp_container">
                <div className="signUp">
                    <div className="signup_intro">
                        <h1>Sign In</h1>
                    </div>
                    <div className="login_form">
                        <LoginForm
                            FirstName="Email Address"
                            SecondName="Password"
                            ButtonName="Log In"
                            UpdateCredentials={UpdateCredentials}
                            submitForm={submit_form}
                            Credentials={credentials}
                            emptystring={emptystring}
                            invalidEmail={invalidEmail}
                            HandlesuccessResponse={HandlesuccessResponse}
                        />
                    </div>
                </div >
            </div>
        </div>
    )
}
export default Login