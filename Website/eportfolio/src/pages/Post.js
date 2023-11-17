import TaskBar from '../components/TaskBar';
import '../styles/Post.css'

function Post(){
    const api = process.env.REACT_APP_API;

    return(
        <>
            <TaskBar/>
            <div className="post">
                <div className="div">
                    <div className="overlap">
                    <div className="group">
                        <div className="group-2">
                        <img className="frame" alt="Frame" src={process.env.PUBLIC_URL + '/image-plus.svg'} />
                        <div className="text-wrapper">Add image</div>
                        </div>
                    </div>
                    <p className="JPEG-GIF-PNG-you-can">
                        JPEG / GIF / PNG
                        <br />
                        You can upload up to 32 MB per file
                    </p>
                    </div>
                    <div className="overlap-group">
                    <img className="line" alt="Line" src="line-1.svg" />
                    <div className="text-wrapper-2">Title</div>
                    <div className="text-wrapper-3">Caption</div>
                    </div>
                    <div className="div-wrapper">
                    <div className="text-wrapper-4">Tags</div>
                    </div>
                    <p className="p">Add up to 30 tags</p>
                    <div className="overlap-group-wrapper">
                    <div className="overlap-group-2">
                        <div className="text-wrapper-5">Submit now</div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Post