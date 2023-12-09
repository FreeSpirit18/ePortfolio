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
    const [liked, setLiked] = useState(null);





    useEffect(() => {
        const fetchPost = axios.get(api + 'Post/' + postId);
        const fetchArtist = fetchPost.then(response => axios.get(api + 'User/' + response.data.ownerId));
        const fetchFave = fetchPost.then(response => axios.get(api + 'Folder/ByUser/' + user.sub));

        Promise.all([fetchPost, fetchArtist, fetchFave])
            .then(([postResponse, artistResponse, faveResponse]) => {
                setPost(postResponse.data);
                setArtistName(artistResponse.data);
                setfaveId(faveResponse.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
      }, []);

      useEffect(() => {
        const handlePost = axios.get(api+'Comment/ByPostId/'+postId);
        handlePost.then(response =>{
            setComments(response.data)
        }).catch((error) => {
            console.error('Error fetching post comments:', error);
          });
      }, [api, postId]);

      useEffect(()=>{
        if(post !== null){

            const handleLike = axios.post(api + "Folder_Post/Exists",{
                id: 0,
                folderId: faveId,
                postId: post.id
              });
              handleLike.then(responce =>{
                    setLiked(responce.data)
                }).catch(error =>{
                    console.error("IsLiked error: ", error)
                });
        }
      },[post])

    

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
                console.error("Comment submit error: ", error)
            })
        }
      }

      const NavToArtist = ()=>{
        
        if(post !== null){
            
            nav(`/profile/${post.ownerId}`);
            
        }
      }

      const Like =()=>{
        const handleLike = axios.post(api + "Folder_Post",{
            id: 0,
            folderId: faveId,
            postId: post.id
          });
          handleLike.then(responce =>{
            //window.location.reload();
            }).catch(error =>{
            console.error("Comment submit error: ", error)
            });
        const handleUpdate = axios.put(api + "Post",{
            id: post.id,
            ownerId: post.ownerId,
            likes: post.likes+1,
            location: post.location,
            name: post.name,
            description: post.description,
            creationDate: "2023-09-29T12:36:59.681Z"
          });
            handleUpdate.then(responce =>{
            window.location.reload();
            }).catch(error =>{
            console.error("Comment submit error: ", error)
            })
      }

      const  UnLike = async ()=>{
        const handleLike = axios.delete(api + "Folder_Post/"+liked.id);

          handleLike.then(responce =>{
            }).catch(error =>{
            console.error("Comment submit error: ", error)
            });
        const handleUpdate = axios.put(api + "Post",{
            id: post.id,
            ownerId: post.ownerId,
            likes: post.likes-1,
            location: post.location,
            name: post.name,
            description: post.description,
            creationDate: "2023-09-29T12:36:59.681Z"
          });
            handleUpdate.then(responce =>{
            window.location.reload();
            }).catch(error =>{
            console.error("Comment submit error: ", error)
            })
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
                        {liked === null ? (<img className="img" alt="Frame" src={acc + '/heart-outline.svg'} onClick={Like}/>):
                        (<img className="img" alt="Frame" src={acc + '/full-heart.svg'} onClick={UnLike}/>)}
                        
                        <div className="text-wrapper">{post.name}
                        </div>
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