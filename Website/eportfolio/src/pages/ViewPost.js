import { useNavigate, useParams } from "react-router-dom";
import TaskBar from "../components/TaskBar";
import '../styles/ViewPost.css'
import { useEffect, useState } from "react";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";


function ViewPost(){
    const api = process.env.REACT_APP_API;
    const acc = process.env.PUBLIC_URL ;
    const user = jwtDecode(localStorage.getItem('AuthToken'));
    const nav = useNavigate();

    const{postId} = useParams();
    const [post, setPost] = useState(null);
    const [artistName, setArtistName] = useState("");
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [faveId, setfaveId] = useState("");






    useEffect(() => {
        const handlePost = axios.get(api+'Post/'+postId);
        handlePost.then(response =>{

            setPost(response.data);
            

            const handleArtist = axios.get(api+'User/'+response.data.ownerId);
            handleArtist.then(response =>{
                console.log(response.data)
                setArtistName(response.data)
            }).catch((error) => {
                console.error('Error fetching post comments:', error);
            });


            const handleFave = axios.get(api+'Folder/ByUser/'+user.sub);
            handleFave.then(response =>{
                console.log(response.data);
                setfaveId(response.data);

            }).catch((error) => {
                console.error('Error fetching favorite folder id:', error);
            });

        }).catch((error) => {
            console.error('Error fetching post data:', error);
          });
      }, []);

      useEffect(() => {
        const handlePost = axios.get(api+'Comment/ByPostId/'+postId);
        handlePost.then(response =>{
            console.log(response.data)
            setComments(response.data)
        }).catch((error) => {
            console.error('Error fetching post comments:', error);
          });
      }, [api, postId]);



      const SubmitComment = ()=>{
        if(comment !== ""){

            const ownerId = user.sub;
    
            const handleSubmit = axios.post(api+'Comment', {
                id: 0,
                authorId: ownerId,
                subjectId: post.id,
                content: comment,
                creationDate: new Date().toISOString()
            });
            handleSubmit.then(responce =>{
                window.location.reload();
            }).catch(error =>{
                console.log(error)
            })
        }
      }

      const NavToArtist = ()=>{
        console.log('veikia');
        if(post !== null){
            
            nav(`/profile/${post.ownerId}`);
            
        }
      }

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
                        <div className="text-wrapper">{post.name}
                        </div>
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
                        <div className="text-wrapper-3" onClick={NavToArtist}>{artistName}</div>
                        
                    </div>
                    <div className="overlap-group-2">
                        <div className="text-wrapper-5">Comments</div>
                        <form className="overlap-2">

                            <input 
                            type="text" 
                            value={comment}
                            onChange={ev => setComment(ev.target.value)}
                            placeholder="Write a comment..." 
                            className="comment-text-input"/>

                            <input 
                            type="button" 
                            className="submit-comment-input" 
                            value="Comment"
                            onClick={SubmitComment}/>

                        </form>

                        
                        {/* <div className="group-2">
                            <div className="img-wrapper">
                            <img className="frame-3" alt="Frame" src={acc + '/account.svg'} />
                            </div>
                            <div className="text-wrapper-6">Comment</div>
                        </div> */}
                        <div className="comment-grid">

                            {comments.map((comment) => (
                                <div key={comment.id} className="comments-container">
                                    <div className="img-wrapper">
                                        <img className="frame-3" alt="Frame" src={acc + '/account.svg'} />
                                    </div>
                                    <div className="text-wrapper-6">{comment.content}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ViewPost