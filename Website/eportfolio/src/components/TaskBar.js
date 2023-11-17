import '../styles/TaskBar.css'
import { Link } from 'react-router-dom';

function TaskBar(){
    return(
        <>
        <div className="box">
            <div className="group">
                <div className="overlap-group">
                    <text className="text-wrapper">ePortfolio</text>
                    <div className="div">
                        <img className="frame" alt="Frame" src={process.env.PUBLIC_URL + '/bell.svg'} />
                        <div className="group-wrapper">
                        <div className="group-2">
                            <img className="img" alt="Frame" src={process.env.PUBLIC_URL + '/plus.svg'} />
                            <div className="text-wrapper-2">Post your work</div>
                        </div>
                        </div>
                        <div className="frame-wrapper">
                        <img className="frame-2" alt="Frame" src={process.env.PUBLIC_URL + '/account.svg'} />
                        </div>
                    </div>
                    <div className="div-wrapper">
                        <div className="group-3">
                        <img className="frame-3" alt="Frame" src={process.env.PUBLIC_URL + '/magnify.svg'} />
                        <div className="text-wrapper-3">Search works</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default TaskBar

