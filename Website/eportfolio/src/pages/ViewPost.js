import { useParams } from "react-router-dom";
import TaskBar from "../components/TaskBar";
import '../styles/ViewPost.css'
import { useEffect, useState } from "react";
import axios from 'axios';


function ViewPost(){
    const api = process.env.REACT_APP_API;
    const acc = process.env.PUBLIC_URL ;

    const{postId} = useParams();
    const [post, setPost] = useState(null);
    const [artist, setArtist] = useState(null);
    const [comments, setComments] = useState(null);



    useEffect(() => {
        const handlePost = axios.get(api+'Post/'+postId);
        handlePost.then(response =>{

            setPost(response.data);
        }).catch((error) => {
            console.error('Error fetching post data:', error);
          });
      }, []);

      useEffect(() => {
        // const handlePost = axios.get(api+'Post/'+postId);
        // handlePost.then(response =>{
 
        // }).catch((error) => {
        //     console.error('Error fetching post data:', error);
        //   });
      }, [post]);

      if (!post) {
        return <div>Loading...</div>;
      }

    return(
        <>
            <TaskBar/>
            <div className="view-post">
                <div className="div">
                    <div className="group">
                        <img className="rectangle" src={post.location} alt={post.name}/>
                        <img className="frame" alt="Frame" src={acc + '/fullscreen.svg'} />
                    </div>
                    <div className="overlap">
                    <div className="rectangle-2" />
                    <img className="img" alt="Frame" src={acc + '/heart-outline.svg'} />
                    <div className="text-wrapper">{post.name}</div>
                    <img className="line" alt="Line" src={acc + '/heart-outline.svg'} />
                    <div className="rectangle-3" />
                    <p className="lorem-ipsum-is">
                        {post.description}
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