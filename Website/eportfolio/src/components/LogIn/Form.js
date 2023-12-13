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

            const handleLogin = axios.post(api, {
                email: email,
                password: password
            });
            handleLogin.then(Response =>{

                const accessToken = Response.data.accessToken;

                // Set the token in the state
                setToken(accessToken);
                // Save the token to local storage
                localStorage.setItem('AuthToken', Response.data.accessToken);

                // Navigate to the home route
                nav("/");

            }).catch(error => {
                // Handle errors, e.g., display an error message to the user
                console.error("Login failed:", error);
                setPassword("");
                setLoginFailed(true);
            });

        }catch(error){
            console.log(error);

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