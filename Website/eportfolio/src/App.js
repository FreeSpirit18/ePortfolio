import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/LogIn'
import NoPage from './pages/NoPage';
import Register from './pages/Register';
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

            <Route path='*' element={<NoPage/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
