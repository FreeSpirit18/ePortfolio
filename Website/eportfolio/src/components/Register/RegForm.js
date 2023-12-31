import { useState } from 'react'
import '../../styles/Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function RegForm(){
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [token, setToken] = useState('');

    const api = process.env.REACT_APP_API + 'User/register';
    const nav = useNavigate();

    const submit = async () =>{
        
        const handleLogin = axios.post(api, {
            userName: userName,
            email: email,
            password: password,
            role: "User"
        });
        handleLogin.then(Response =>{


            nav("/login");

        }).catch(error => {
            // Handle errors, e.g., display an error message to the user
            console.error("Registration failed:", error);
            
        });
        //setToken(handleLogin.data);
    }

    return(
        <>
            <form className='login-form'>
                <p className='default'>User name:</p>
                <input className='text-imput' type='text' value={userName}  onChange={ev => setUserName(ev.target.value)} required/>
                <p className='default'>Email:</p>
                <input className='text-imput' type='text' value={email}  onChange={ev => setEmail(ev.target.value)} required/>
                <p className='default'>Password:</p>
                <input className='text-imput' type='text' value={password}  onChange={ev => setPassword(ev.target.value)} required/>
                <input
                className="input-Button"
                type="button"
                onClick={submit}
                value={"Register"} />
            </form>
        </>
    )
}
export default RegForm