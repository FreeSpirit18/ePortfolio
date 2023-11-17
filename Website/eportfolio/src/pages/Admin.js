import TaskBar from "../components/TaskBar";
import '../styles/Admin.css'

function Admin(){
    const api = process.env.REACT_APP_API;
    const img = process.env.PUBLIC_URL;

    return(
        <>
        <TaskBar/>
        <div className="admin">
            <div className="div">
                <div className="overlap">
                <div className="group">
                    <div className="group-2">
                    <img className="frame" alt="Frame" src={img + '/magnify.svg'} />
                    <div className="text-wrapper">Search users</div>
                    </div>
                </div>
                <div className="overlap-group-wrapper">
                    <div className="overlap-group">
                    <div className="text-wrapper-2">Bane</div>
                    </div>
                </div>
                <div className="overlap-wrapper">
                    <div className="overlap-2">
                    <div className="rectangle" />
                    <img className="img" alt="Frame" src={img + '/menu-down.svg'} />
                    <div className="text-wrapper-3">1 month</div>
                    </div>
                </div>
                <div className="group-3">
                    <div className="group-4">
                    <div className="frame-wrapper">
                        <img className="frame-2" alt="Frame" src={img + '/account.svg'} />
                    </div>
                    <div className="text-wrapper-4">Artist name</div>
                    </div>
                    <div className="rectangle-2" />
                </div>
                <div className="group-5">
                    <div className="group-6">
                    <div className="frame-wrapper">
                        <img className="frame-2" alt="Frame" src={img + '/account.svg'} />
                    </div>
                    <div className="text-wrapper-4">Artist name</div>
                    </div>
                    <div className="rectangle-3" />
                </div>
                <div className="group-7">
                    <div className="group-6">
                    <div className="frame-wrapper">
                        <img className="frame-2" alt="Frame" src={img + '/account.svg'} />
                    </div>
                    <div className="text-wrapper-4">Artist name</div>
                    </div>
                    <div className="rectangle-3" />
                </div>
                <div className="group-8">
                    <div className="group-6">
                    <div className="frame-wrapper">
                        <img className="frame-2" alt="Frame" src={img + '/account.svg'} />
                    </div>
                    <div className="text-wrapper-4">Artist name</div>
                    </div>
                    <div className="rectangle-3" />
                </div>
                </div>
                <div className="div-wrapper">
                <div className="text-wrapper-5">Admin page</div>
                </div>
                <div className="overlap-3">
                <div className="group-9">
                    <div className="frame-wrapper">
                    <img className="frame-2" alt="Frame" src={img + '/account.svg'} />
                    </div>
                    <div className="text-wrapper-6">Comment</div>
                    <div className="text-wrapper-7">Reply</div>
                </div>
                <div className="group-10">
                    <div className="frame-wrapper">
                    <img className="frame-2" alt="Frame" src={img + '/account.svg'} />
                    </div>
                    <div className="text-wrapper-6">Comment</div>
                    <div className="text-wrapper-7">Reply</div>
                </div>
                <div className="group-11">
                    <div className="frame-wrapper">
                    <img className="frame-2" alt="Frame" src={img + '/account.svg'} />
                    </div>
                    <div className="text-wrapper-6">Comment</div>
                    <div className="text-wrapper-7">Reply</div>
                </div>
                <div className="text-wrapper-8">Recent comments</div>
                </div>
                <div className="overlap-4">
                <div className="rectangle-4" />
                <div className="text-wrapper-9">Recent posts</div>
                <div className="group-12">
                    <div className="group-13">
                    <div className="group-14" />
                    <div className="group-15" />
                    <div className="group-16" />
                    <div className="group-17" />
                    <div className="group-18" />
                    </div>
                    <div className="group-19">
                    <div className="group-14" />
                    <div className="group-15" />
                    <div className="group-16" />
                    <div className="group-17" />
                    <div className="group-18" />
                    </div>
                    <div className="group-20">
                    <div className="group-14" />
                    <div className="group-15" />
                    <div className="group-16" />
                    <div className="group-17" />
                    <div className="group-18" />
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Admin