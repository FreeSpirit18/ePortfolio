import TaskBar from "../components/TaskBar";
import '../styles/Profile.css'

function Profile(){
    const api = process.env.REACT_APP_API;
    const img = process.env.PUBLIC_URL;
    return(
        <>
            <TaskBar/>
            <div className="profile">
                <div className="div">
                    <div className="overlap">
                    <div className="overlap-group">
                        <div className="rectangle" />
                        <div className="group">
                        <img className="frame" alt="Frame" src={img + '/account.svg'}/>
                        </div>
                        <div className="text-wrapper">Artist name</div>
                    </div>
                    <p className="p">Member since 2023-11-08 | 54 post</p>
                    </div>
                    <div className="overlap-2">
                    <div className="group-2">
                        <img className="img" alt="Frame" src={img + '/heart-outline.svg'} />
                        <div className="text-wrapper-2">Favorite</div>
                    </div>
                    <div className="group-wrapper">
                        <div className="group-3">
                        <img className="frame-2" alt="Frame" src={img + '/bookmark-multiple.svg'} />
                        <div className="text-wrapper-3">Saved</div>
                        </div>
                    </div>
                    <div className="group-4">
                        <img className="frame-3" alt="Frame" src={img + '/image-area.svg'} />
                        <div className="text-wrapper-4">Posts</div>
                    </div>
                    <div className="group-5">
                        <img className="frame-4" alt="Frame" src={img + '/folder.svg'} />
                        <div className="text-wrapper-5">Fantasy</div>
                    </div>
                    </div>
                    <div className="overlap-3">
                    <div className="rectangle-2" />
                    <div className="group-6">
                        <div className="group-7">
                        <div className="group-8" />
                        <div className="group-9" />
                        <div className="group-10" />
                        <div className="group-11" />
                        <div className="group-12" />
                        </div>
                        <div className="group-13">
                        <div className="group-8" />
                        <div className="group-9" />
                        <div className="group-10" />
                        <div className="group-11" />
                        <div className="group-12" />
                        </div>
                        <div className="group-14">
                        <div className="group-8" />
                        <div className="group-9" />
                        <div className="group-10" />
                        <div className="group-11" />
                        <div className="group-12" />
                        </div>
                    </div>
                    <div className="text-wrapper-6">Fantasy</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profile