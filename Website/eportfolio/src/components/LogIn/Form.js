import { useState } from 'react'
import '../../styles/Login.css'
import axios from 'axios'

function Form(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const api = process.env.REACT_APP_API + 'User/login';

    const submit = async () =>{
        
        const handleLogin = await axios.post(api, {
            email: email,
            password: password
        });
        
        setToken(handleLogin.data.accessToken);
    }

    return(
        <>
            <form className='login-form'>
                <input type='text' value={email}  onChange={ev => setEmail(ev.target.value)} required/>
                <input type='text' value={password}  onChange={ev => setPassword(ev.target.value)} required/>
                <input
                className="inputButton"
                type="button"
                onClick={submit}
                value={"Log in"} />
            </form>
        </>
    )
}
export default Form