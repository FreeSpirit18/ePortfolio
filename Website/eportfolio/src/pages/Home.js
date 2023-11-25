import { useEffect } from "react";
import TaskBar from "../components/TaskBar"
import '../styles/Home.css'
import axios from 'axios';
import { useState } from "react";


 function Home(){
    const api = process.env.REACT_APP_API;

    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
        // Fetch posts from your API
        const handlePost = axios.get(api+'Post');
        handlePost.then(Response =>{

            setPosts(Response.data)
            console.log(posts[0].location);
        })
      }, []);
    //const Post = await axios.get(api+'Post');
    const heart = process.env.PUBLIC_URL + '/heart-outline.svg'
    return(
        <>
            <TaskBar/>
            <div className="home">
                
                <div className="div">
                    
                    <div className="group-5">
                    <div className="group-6">
                        <img className="img-wrapper" src="https://eportfoliostore.blob.core.windows.net/pictures/638365236654614390_4f40c61c-5adf-4327-98fa-c1e4dc24a0e0.jpg">
                            
                        </img>
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