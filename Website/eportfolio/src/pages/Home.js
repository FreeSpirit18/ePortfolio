import TaskBar from "../components/TaskBar"
import '../styles/Home.css'


function Home(){
    //const a = process.env.REACT_APP_API;
    const heart = process.env.PUBLIC_URL + '/heart-outline.svg'
    return(
        <>
            <TaskBar/>
            <div className="home">
                <div className="div">
                    
                    <div className="group-5">
                    <div className="group-6">
                        <div className="img-wrapper">
                        <img className="frame-4" alt="Frame" src={heart} />
                        </div>
                        <div className="group-7">
                        <img className="frame-4" alt="Frame" src={heart} />
                        </div>
                        <div className="group-8">
                        <img className="frame-4" alt="Frame" src={heart} />
                        </div>
                        <div className="group-9">
                        <img className="frame-4" alt="Frame" src={heart} />
                        </div>
                        <div className="group-10">
                        <img className="frame-4" alt="Frame" src={heart} />
                        </div>
                    </div>
                    <div className="group-11">
                        <div className="img-wrapper">
                        <img className="frame-4" alt="Frame" src={heart} />
                        </div>
                        <div className="group-7">
                        <img className="frame-4" alt="Frame" src={heart} />
                        </div>
                        <div className="group-8">
                        <img className="frame-4" alt="Frame" src={heart} />
                        </div>
                        <div className="group-9">
                        <img className="frame-4" alt="Frame" src={heart} />
                        </div>
                        <div className="group-10">
                        <img className="frame-4" alt="Frame" src={heart} />
                        </div>
                    </div>
                    <div className="group-12">
                        <div className="img-wrapper">
                        <img className="frame-4" alt="Frame" src={heart} />
                        </div>
                        <div className="group-7">
                        <img className="frame-4" alt="Frame" src={heart} />
                        </div>
                        <div className="group-8">
                        <img className="frame-4" alt="Frame" src={heart} />
                        </div>
                        <div className="group-9">
                        <img className="frame-4" alt="Frame" src={heart} />
                        </div>
                        <div className="group-10">
                        <img className="frame-4" alt="Frame" src={heart} />
                        </div>
                    </div>
                    </div>
                    <div className="overlap">
                    <div className="text-wrapper-4">Popular</div>
                    <div className="rectangle" />
                    <div className="text-wrapper-5">Latest</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home