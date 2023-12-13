import { jwtDecode } from 'jwt-decode';
import '../styles/TaskBar.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";


function TaskBar(){
    const Token = localStorage.getItem('AuthToken');

    const [menuOpen, setMenuOpen] = useState(false);

    const [user, setUser] = useState();

    // console.log(user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
    

 

    // create an event listener
    useEffect(() => {
    })
    useEffect(()=>{
        if(Token){
            setUser(jwtDecode(Token));
        }
    },[])

    const nav = useNavigate();
    
    const LogOut = () =>{
        console.log('log')
        localStorage.removeItem('AuthToken')
        nav(`/`);
        window.location.reload();
    }

    
//Search works
    return(
        <>
        <nav>
                <Link to="/" className="title">
                    ePortfolio
                </Link>
                <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={menuOpen ? "open" : ""}>
                {user ? (
                            // Render the existing content when 'AuthToken' is present
                            
                            <>
                            {user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ==='Admin' ? (
                            // Render the existing content when 'AuthToken' is present
                                <>
                                <li>
                                <NavLink to="/">Home</NavLink>
                                </li>
                                <li>
                                <NavLink to="/admin">Admin page</NavLink>
                                </li>
                                <li>
                                    <a onClick={LogOut}>Log Out</a>
                                </li>
                                </>
                            ) : (
                                <>
                                <li>
                                <NavLink to="/">Home</NavLink>
                                </li>
                                <li>
                                <NavLink to="/post">Post you're wors</NavLink>
                                </li>
                                <li>
                                <NavLink to={`/profile/${user.sub}`}>Profile</NavLink>
                                </li>
                                <li>
                                    <a onClick={LogOut}>Log Out</a>
                                </li>
                                </>
                                
                            )}
                                
                            </>
                        ) : (
                            <>
                                <li>
                                <NavLink to="/">Home</NavLink>
                                </li>
                                <li>
                                <NavLink to="/login">Log in</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/register">register</NavLink>

                                </li>
                                
                            </>
                            
                        )}
                    

                </ul>
                </nav>
        
        </>
    )
}

export default TaskBar

