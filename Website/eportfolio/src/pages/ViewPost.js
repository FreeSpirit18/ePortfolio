import TaskBar from "../components/TaskBar";
import '../styles/ViewPost.css'

function ViewPost(){
    const api = process.env.REACT_APP_API;
    const acc = process.env.PUBLIC_URL ;
    return(
        <>
            <TaskBar/>
            <div className="view-post">
                <div className="div">
                    <div className="group">
                    <div className="rectangle" />
                    <img className="frame" alt="Frame" src={acc + '/fullscreen.svg'} />
                    </div>
                    <div className="overlap">
                    <div className="rectangle-2" />
                    <img className="img" alt="Frame" src={acc + '/heart-outline.svg'} />
                    <div className="text-wrapper">Name</div>
                    <img className="line" alt="Line" src={acc + '/heart-outline.svg'} />
                    <div className="rectangle-3" />
                    <p className="lorem-ipsum-is">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                        industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ips
                    </p>
                    <div className="text-wrapper-2">#digital #fantasy #portrait</div>
                    <img className="frame-2" alt="Frame" src={acc + '/bookmark-multiple.svg'} />
                    </div>
                    <div className="overlap-group">
                    <div className="frame-wrapper">
                        <img className="frame-3" alt="Frame" src={acc + '/account.svg'} />
                    </div>
                    <div className="text-wrapper-3">Artist name</div>
                    <div className="div-wrapper">
                        <div className="text-wrapper-4">Follow</div>
                    </div>
                    </div>
                    <div className="overlap-group-2">
                    <div className="text-wrapper-5">Comments</div>
                    <div className="group-2">
                        <div className="img-wrapper">
                        <img className="frame-3" alt="Frame" src={acc + '/account.svg'} />
                        </div>
                        <div className="text-wrapper-6">Comment</div>
                        <div className="text-wrapper-7">Reply</div>
                    </div>
                    <div className="overlap-2">
                        <div className="text-wrapper-8">Write a comment...</div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ViewPost