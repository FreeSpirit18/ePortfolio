import { jwtDecode } from "jwt-decode";
import TaskBar from "../components/TaskBar";
import '../styles/Admin.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

function Admin(){
    const api = process.env.REACT_APP_API;
    const img = process.env.PUBLIC_URL;
    
    const nav = useNavigate();

    const [users, setUsers] = useState([]);
    const [recentPost, setRecentPost] = useState([]);
    const [recentComments, setRecentComments] = useState([]);
    const [selectedUser, setSelectedUser] = useState();

    useEffect(()=>{
        const fetchUsers = axios.get(api + 'User')
        fetchUsers.then(Response => {
            setUsers(Response.data);
        })
        console.log(users)
    },[]);

    useEffect(() => {
        if (selectedUser) {
            const fetchPosts = axios.get(api + 'Post/AllOfUser/' + selectedUser.id);
            const fetchComments = axios.get(api + 'Comment/AllOfUser/' + selectedUser.id);
    
            Promise.all([fetchPosts, fetchComments])
                .then(([postsResponse, commentsResponse]) => {
                    // Extracting data from the responses
                    const posts = postsResponse.data;
                    const comments = commentsResponse.data;
    
                    // Sorting posts and comments by creationDate in descending order
                    const sortedPosts = posts.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
                    const sortedComments = comments.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
    
                    // Selecting the 10 most recent items
                    const recentPosts = sortedPosts.slice(0, 8);
                    const recentComments = sortedComments.slice(0, 3);
    
                    // Setting state
                    setRecentPost(recentPosts);
                    setRecentComments(recentComments);
                })
                .catch(error => {
                    // Handle errors
                    console.error('Error fetching data:', error);
                });
            
        }
    }, [selectedUser]);

    const handlePostClic = (id) => {
        nav(`/viewpost/${id}`);

    }

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
                     
                    

                    <div className="user-container">

                        {users.map((user) => ( 
                            // {`post-tab-wrapper ${tab === 1 ? 'active-tab' : ''}
                            <div key={user.id} 
                            className={`user-grid ${selectedUser && selectedUser.id === user.id ? 'selected-user' : ''}`} onClick={()=>{setSelectedUser(user)}}>
                                <div className="user-icon-wrapper">
                                    <img className="user-icon-map" alt="Frame" src={img + '/account.svg'} />
                                </div>
                                <div className="user-wrapper">
                                {user.userName}

                                </div>
                            </div>
                        ))}
                    </div>
                
                
                </div>
                <div className="div-wrapper">
                    <div className="text-wrapper-5">Admin page</div>
                </div>
                <div className="overlap-3">
                    <div className="text-wrapper-8">Recent comments</div>
                    <div className="recent-comment-container">

                        {recentComments.map((comment) => ( 
                            <div key={comment.id} 
                            className={`recent-comment-grid `} >
                                
                                <div className="recent-comment-wrapper">
                                {comment.content}

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="overlap-4">
                    <div className="text-wrapper-9">Recent posts</div>
                    <div className="recent-grid-container">
                        {recentPost.map((post) => (
                            <div key={post.id} className="recent-grid-item" >
                                

                                <img className="recent-post-img" 
                                src={post.location} alt={post.name} 
                                onClick={()=>handlePostClic(post.id)}/>
                            </div>
                            
                        ))}
                    </div>
                    {/* <div className="group-12">
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
                    </div> */}
                </div>
            </div>
        </div>
        </>
    )
}
export default Admin