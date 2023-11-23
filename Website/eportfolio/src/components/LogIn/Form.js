import { useState } from 'react'
import '../../styles/Login.css'
import axios from 'axios'
import {useNavigate } from 'react-router-dom';

function Form(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);

    const nav = useNavigate();
    const api = process.env.REACT_APP_API + 'User/login';

    const submit = async () =>{
        try{

            const handleLogin = await axios.post(api, {
                email: email,
                password: password
            });
            
            setToken(handleLogin.data.accessToken);
            localStorage.setItem('AuthToken',token);
            nav("/");
        }catch(error){
            setPassword("");
            setLoginFailed(true);
        }
    }

    return(
        <>
            <form className='login-form'>
                <p className='default'>Email:</p>
                <input className='text-imput' type='text' value={email}  onChange={ev => setEmail(ev.target.value)} required/><br/>
                <p className='default'>Password:</p>
                <input className='text-imput' type='text' value={password}  onChange={ev => setPassword(ev.target.value)} required/><br/>
                {loginFailed && <p className="error-text">Login failed. The email or the password was incorect</p>}
                <input
                className="input-Button"
                type="button"
                onClick={submit}
                value={"Log in"} />
            </form>
        </>
    )
}
export default Form