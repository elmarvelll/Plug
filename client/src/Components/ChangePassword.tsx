import { useState } from 'react'
import styles from '../styles/mybusiness.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





function ChangePassWord(props: { removepage: () => void, userId: string }) {
    const navigate = useNavigate()
    const [password, setpassword] = useState('')
    const [state, setstate] = useState(true)
    const [passwordCheck, setpasswordCheck] = useState(false)



    async function checkpassword() {
        axios.get(`http://localhost:3000/user/user_details`, {
            params: {
                password,
            }
        })
            .then((res) => { setpasswordCheck(res.data.status), setpassword(''), setstate(res.data.status) })
    }

    async function updatepassword() {
        axios.put(`http://localhost:3000/user/${props.userId}`, { password })
            .then(() => navigate(0))
    }


    return (
        <div
            className={styles.addProduct_div}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    props.removepage()
                }
            }}
            style={{ position: 'absolute', top: '0', width: '100%', height: '100%', backgroundColor: 'rgb(0,0,0,0.5)', backdropFilter: 'blur(3px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <div style={{ width: '500px', backgroundColor: 'black', padding: '40px 20px', borderRadius: '20px', height: '300px', boxSizing: 'border-box', display: 'flex', flexWrap: 'wrap', fontFamily: '"Comfortaa", sans-serif ', overflow: 'auto', border: '1px solid #CC8500' }}>
                <div style={{ height: 'max-content', width: '100%', margin: '10px 0px' }}>
                    <h4 style={{ color: 'white', margin: '10px 0px', fontSize: 'small' }}> {passwordCheck ? 'Select new Password' : 'Please Input Password'}</h4>
                    {!state && <label style={{ color: 'red', fontSize: 'x-small' }}>invalid password</label>}
                    <input
                        type="text"
                        name="name" id="" placeholder="Password"
                        style={{ width: '100%', boxSizing: 'border-box' }}
                        onChange={e => setpassword(e.target.value)}
                        value={password}
                        className={styles.profile_input}
                    />
                </div>
                <div style={{ width: '100%', display: 'flex', height: 'min-content', justifyContent: 'center' }}>
                    <button className={styles.logo_button} onClick={passwordCheck ? updatepassword : checkpassword} disabled={false} style={{ backgroundColor: '#CC8500' }}>
                        {passwordCheck ? 'Change Password' : 'Confirm Password'}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ChangePassWord