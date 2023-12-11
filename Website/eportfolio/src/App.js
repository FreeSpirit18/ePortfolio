import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/LogIn'
import NoPage from './pages/NoPage';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Post from './pages/Post';
import Profile from './pages/Profile';
import ViewPost from './pages/ViewPost';
import './App.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function App() {
  const Token = localStorage.getItem('AuthToken');

    const [user, setUser] = useState();
    // console.log(user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
    
    useEffect(()=>{
        if(Token){
            setUser(jwtDecode(Token));
        }
    },[])
  
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path='/home' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            {user && user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ==='Admin' ?
            <>
            <Route path='/admin' element={<Admin />}/>
            
            </> : <></>}
            <Route path='/post' element={<Post />}/>
            <Route path='/profile/:userId' element={<Profile />}/>
            <Route path='/viewPost/:postId' element={<ViewPost />}/>


            <Route path='*' element={<NoPage/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
