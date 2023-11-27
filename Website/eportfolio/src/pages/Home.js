import { useEffect } from "react";
import TaskBar from "../components/TaskBar"
import '../styles/Home.css'
import axios from 'axios';
import { useState } from "react";
import { useNavigate  } from "react-router-dom";


 function Home(){
    const api = process.env.REACT_APP_API;
    const heart = process.env.PUBLIC_URL + '/heart-outline.svg'
    const [posts, setPosts] = useState([]);
    const [tab, setTab] = useState(1);
  

    const nav = useNavigate();

    useEffect(() => {
        const handlePost = axios.get(api+'Post');
        handlePost.then(response =>{

            let sortedPosts;

            if (tab === 1) {
                // Sort by likes (assuming there's a 'likes' property in your post objects)
                sortedPosts = response.data.sort((a, b) => b.likes - a.likes);
            } else {
                // Sort by creationDate (assuming there's a 'creationDate' property in your post objects)
                sortedPosts = response.data.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
            }

            setPosts(sortedPosts);
        })
      }, [api, tab]);


      const ToggleTab=(index)=>{
        setTab(index);
      }

      const handlePostClic = (id) => {
        nav(`/viewpost/${id}`);

      }
    return(
        <>
            <TaskBar/>
            <div className="home">
                
                <div className="div">
                    <div className="overlap">
                        <div className="text-wrapper-4" onClick={()=>ToggleTab(1)}>Popular</div>
                        <div className={tab === 1 ? "rectangle-under-popular":"rectangle-under-latest"} />
                        <div className="text-wrapper-5" onClick={()=>ToggleTab(2)}>Latest</div>
                    </div>
                    <div className="grid-container">
                        {posts.map((post) => (
                            <div key={post.id} className="grid-item" onClick={()=>handlePostClic(post.id)}>
                                <img className="post-img" src={post.location} alt={post.name} />
                                {/* <img className="heart-icon" alt="Frame" src={heart} /> */}
                            </div>
                            
                        ))}
                    </div>
                    
                </div>
            </div>
        </>
    )
}
export default Home