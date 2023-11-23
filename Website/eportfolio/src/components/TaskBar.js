import '../styles/TaskBar.css'
import { Link, useNavigate } from 'react-router-dom';

function TaskBar(){
    const Token = localStorage.getItem('AuthToken'); 
    const nav = useNavigate();
    const Login = () =>{
        nav('/login');
    }
    const Register = () =>{
        nav('/register');
    }
//Search works
    return(
        <>
        <div className="box">
            <div className="group">
                <div className="overlap-group">
                    <text className="text-wrapper">ePortfolio</text>

                    <div  className="search-wrapper">
                        <img className="frame-3" alt="Frame" src={process.env.PUBLIC_URL + '/magnify.svg'} />
                        <input type='text' placeholder='Search works' className="search-Input"/>
                    </div>

                    
                    {Token ? (
                            // Render the existing content when 'AuthToken' is present
                            <>
                                <div className="div">
                                    <img className="frame" alt="Frame" src={process.env.PUBLIC_URL + '/bell.svg'} />
                                    <button className="group-wrapper">
                                        <div className="group-2">
                                            <img className="img" alt="Frame" src={process.env.PUBLIC_URL + '/plus.svg'} />
                                            <div className="text-wrapper-2">Post your work</div>
                                        </div>
                                    </button>
                                    <div className="frame-wrapper">
                                        <img className="frame-2" alt="Frame" src={process.env.PUBLIC_URL + '/account.svg'} />
                                    </div>
                                </div>
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

