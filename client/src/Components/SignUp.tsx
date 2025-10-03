import { useState, useContext } from "react"
import SignupForm from "./SignUpForm"
import axios from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import '../styles/signup_and_login.css'
import { VerifContext } from "../Approutes"

type credential = {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    number: string,
    hall: string,
    room: string,
    school_email: string
}
function signUp() {
    const verif = useContext(VerifContext)
    const location = useLocation()
    const [sameEmail, setsameEmail] = useState<boolean>(false)
    const [sameSchoolEmail, setsameSchoolEmail] = useState<boolean>(false)
    const navigate = useNavigate()
    const [emptystring, setempty] = useState({
        email: false,
        password: false,
        first_name: false,
        last_name: false,
        number: false,
        hall: false,
        room: false,
        school_email: false
    })
    const [credentials, setCredentials] = useState<credential>({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        number: '',
        hall: '',
        room: '',
        school_email: ''
    })
    function UpdateCredentials(name: string, value: string) {
        setempty((prevVal) => {
            const newObj = {
                ...prevVal,
                [name]: false
            }
            return newObj
        })
        setCredentials((prevVal) => {
            const newObj = {
                ...prevVal,
                [name]: value
            }
            return newObj
        })
    }

    function clearEmail() {
        setsameEmail(false)
        setsameSchoolEmail(false)
    }
    async function submit_form(event: React.FormEvent) {
        event.preventDefault()
        const allSpacesFilled = Object.entries(credentials).every(([key, value]) => {
            if (key === 'email') return true
            return (value !== '')
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
                const request = await axios.post('http://localhost:3000/signup', { credentials })
                const { IdenticalEmail, identicalSchoolEmail, approved } = request.data
                if (IdenticalEmail) setsameEmail(true)
                if (identicalSchoolEmail) setsameSchoolEmail(true)
                if (approved) verif?.setIsverified(true)
                console.log(location.state.expectPath)
                navigate(location.state.expectPath)
            } catch (error) {
                console.log(`could not post credentials ${error}`)
            }
        }

    }

    return (
        <div style={{ width: '100%', height: '100%', backgroundColor: '#E8E8E8' }}>
            <div className="signUp_container">
                <div className="signUp">
                    <div className="signup_intro">
                        <h1>Plug</h1>
                        <p>Find what you need when you need it</p>
                    </div>
                    <div className="signup_form">
                        <SignupForm
                            UpdateCredentials={UpdateCredentials}
                            submitForm={submit_form}
                            Credentials={credentials}
                            emptystring={emptystring}
                            schoolemail={sameSchoolEmail}
                            email={sameEmail}
                            clearEmail={clearEmail}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default signUp