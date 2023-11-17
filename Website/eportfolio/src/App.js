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

function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path='/home' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/admin' element={<Admin />}/>
            <Route path='/post' element={<Post />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/viewPost' element={<ViewPost />}/>


            <Route path='*' element={<NoPage/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
