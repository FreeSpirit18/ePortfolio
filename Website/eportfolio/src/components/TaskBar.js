import '../styles/TaskBar.css'
import { Link } from 'react-router-dom';

function TaskBar(){
    return(
        <>
        <div className='task-bar'>
        <Link to="/login">
            <button>Login</button>
        </Link>
        <Link to="/register">
            <button>Register</button>
        </Link>
        </div>
        </>
    )
}

export default TaskBar