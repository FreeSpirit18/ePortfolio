import { jwtDecode } from 'jwt-decode';
import '../styles/TaskBar.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function TaskBar(){
    const Token = localStorage.getItem('AuthToken');

    const [user, setUser] = useState();
    // console.log(user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
    
    useEffect(()=>{
        if(Token){
            setUser(jwtDecode(Token));
        }
    },[])

    const nav = useNavigate();
    const Login = () =>{
        nav('/login');
    }
    const Register = () =>{
        nav('/register');
    }
    const Post = () =>{
        nav('/post');
    }
    const GoHome = () =>{
        nav('/');
    }
    const GoToProfile = () =>{
        nav(`/profile/${user.sub}`);
    }

    const GoToAdmin = () =>{
        nav(`/admin`);
    }

    
//Search works
    return(
        <>
        <div className="box">
            <div className="group">
                <div className="overlap-group">
                    <text className="text-wrapper" onClick={GoHome}>ePortfolio</text>

                    <div  className="search-wrapper">
                        <img className="frame-3" alt="Frame" src={process.env.PUBLIC_URL + '/magnify.svg'} />
                        <input type='text' placeholder='Search works' className="search-Input"/>
                    </div>

                    
                    {user ? (
                            // Render the existing content when 'AuthToken' is present
                            
                            <>
                            {user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ==='Admin' ? (
                            // Render the existing content when 'AuthToken' is present
                                <>
                                <div className="div">
                                    <button className="group-wrapper" onClick={GoToAdmin}>
                                        <div className="group-2">
                                            <div className="text-wrapper-2">Admin page</div>
                                        </div>
                                    </button>
                                    
                                </div>
                                </>
                            ) : (
                                <>
                                <div className="div">
                                    <button className="group-wrapper" onClick={Post}>
                                        <div className="group-2">
                                            <img className="img" alt="Frame" src={process.env.PUBLIC_URL + '/plus.svg'} />
                                            <div className="text-wrapper-2">Post your work</div>
                                        </div>
                                    </button>
                                    <div className="frame-wrapper">
                                        <img onClick={GoToProfile} className="frame-2" alt="Frame" src={process.env.PUBLIC_URL + '/account.svg'} />
                                    </div>
                                </div>
                                </>
                                
                            )}
                                
                            </>
                        ) : (
                            <>

                                <button className="login-button" onClick={Login}>
                                    Login
                                </button>
                                <button className="register-button" onClick={Register}>
                                  Register
                                </button>
                            </>
                            
                        )}
                </div>
            </div>
        </div>
        </>
    )
}

export default TaskBar

