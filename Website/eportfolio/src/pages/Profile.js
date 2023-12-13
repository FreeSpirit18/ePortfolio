import { useNavigate, useParams } from "react-router-dom";
import TaskBar from "../components/TaskBar";
import '../styles/Profile.css'
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from 'axios'; 

function Profile(){
    const api = process.env.REACT_APP_API;
    const img = process.env.PUBLIC_URL;
    
    const Token = localStorage.getItem('AuthToken');


    const [user, setUser] = useState();
    // console.log(user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
    
    useEffect(()=>{
        if(Token){
            setUser(jwtDecode(Token));
        }
    },[])
    const nav = useNavigate();

    const{userId} = useParams();

    const[userName, setUserName] = useState([]);
    const[folders, setFolders] = useState([]);
    const[posts, setPosts] = useState([]);
    const[tab, setTab] = useState(1);
    const[selectedFolder, setSelectedFolder] = useState();
    const[selectedFolderPosts, setSelectedFolderPosts] = useState([]);

    useEffect(() => {
        const fetchFolders = axios.get(api + 'Folder/AllUserFolders/' + userId);
        fetchFolders.then(Response =>{


            if(user && userId === user.sub){
                setFolders(Response.data)
            }else{
                for(const folder of Response.data){

                    if(folder.isPublic){
                        setFolders([...folders, folder])
    
                    }
                }
            }

            
        })

        const fetchName = axios.get(api + 'User/' + userId)
        fetchName.then(Response =>{
            setUserName(Response.data)
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
        
    }, []);

    useEffect(() => {
        const fetchPost = axios.get(api + 'Post/AllOfUser/' + userId);
        fetchPost.then(Response =>{
            setPosts(Response.data);
            console.log(Response.data);
        })
    
    }, []);
    

    const ToggleTab =(index)=>{
        setTab(index);
        setSelectedFolder();
        setSelectedFolderPosts([]);
    }

    const ToggleFolder =(folder)=>{

        setSelectedFolder(folder);
        
        setSelectedFolderPosts([]);

        const fetchFolderCon = axios.get(api + 'Folder_Post/AllOfFolder/' + folder.id);
        fetchFolderCon.then(Response =>{
            const connect = Response.data;

            const fetchPostPromises = connect.map((element) =>
            axios.get(api + 'Post/' + element.postId)
            );

            Promise.all(fetchPostPromises)
            .then((responses) => {
                const postsData = responses.map((response) => response.data);
                setSelectedFolderPosts(postsData);
                console.log(postsData); // Log the updated state here
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
        })
        console.log(selectedFolderPosts);
    }

    const DeletePost =(id)=>{

        const fetchFolderCon = axios.delete(api + 'Post/' + id);
        fetchFolderCon.then(Response =>{
            window.location.reload();
            
        }).catch(error =>{
            console.log(error)
        })
        
    }

    const DeleteFolder =()=>{
        if(selectedFolder){

            const fetchFolderCon = axios.delete(api + 'Folder/' + selectedFolder.id);
            fetchFolderCon.then(Response =>{
                window.location.reload();
                
            }).catch(error =>{
                console.log(error)
            })
        }
        
    }

    const handlePostClic = (id) => {
        nav(`/viewpost/${id}`);

    }
    const toggleFolderPublic = () =>{
        if(selectedFolder){
            const updatedFolder = { ...selectedFolder, isPublic: !selectedFolder.isPublic };
            
            // Create a new array with the updated folder
            const updatedFolders = folders.map(folder =>
                folder.id === updatedFolder.id ? updatedFolder : folder
            );

            
            const postFolder = axios.put(api+'Folder', updatedFolder)
            postFolder.then(response =>{
                setSelectedFolder(updatedFolder)
                setFolders(updatedFolders);

            })
            postFolder.then()
        }
    }

    return(
        <>
            <TaskBar/>
            <div className="profile">
                <div className="main-body">
                    <div className="overlap">
                        <div className="overlap-group">
                            <div className="rectangle" />
                            <div className="group">
                                <img className="frame" alt="Frame" src={img + '/account.svg'}/>
                            </div>
                            <div className="text-wrapper">{userName}</div>
                        </div>
                        <p className="p">{posts.length} post</p>
                    </div>
                    <div className="overlap-2">

                    <div
                        className={`post-tab-wrapper ${tab === 1 ? 'active-tab' : ''}`}
                        onClick={() => ToggleTab(1)}
                    >
                        <div className="group-4">
                        <img className="frame-3" alt="Frame" src={`${img}/image-area.svg`} />
                        <div className="text-wrapper-4">Posts</div>
                        </div>
                    </div>

                    <div
                        className={`folder-tab-wrapper ${tab === 2 ? 'active-tab' : ''}`}
                        onClick={() => ToggleTab(2)}
                    >
                        <div className="group-3">
                        <img className="frame-2" alt="Frame" src={`${img}/bookmark-multiple.svg`} />
                        <div className="tab-wrapper">Folders</div>
                        </div>
                    </div>
                        {tab === 2 ? <div className="group-5">
                            <div className="profile-folder-container">

                                {folders.map((folder) => (
                                    <div key={folder.id} 
                                    onClick={()=> ToggleFolder(folder)}
                                    className={`profile-folder-grid ${selectedFolder  && selectedFolder.id === folder.id ? 'selected-folder' : ''}`}
                                    >

                                        <img className="folder-icon" alt="Frame" src={img + '/folder.svg'} />
                                    
                                        <div className="profile-folder-wrapper">
                                        {folder.name}

                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                        </div>
                        :
                        <></>}
                        
                    </div>
                    <div className="overlap-3">
                        <div className="rectangle-2" />
                        {tab === 2 && selectedFolder && selectedFolder.name !== 'favorite' ? 
                            <div className="folder-settings">
                                 <input
                                    className="folder-radio"
                                    type="checkbox"
                                    checked={selectedFolder.isPublic}
                                    onChange={() => toggleFolderPublic()}
                                />
                                <input className="folder-delete-button" onClick={DeleteFolder} type='button' value="Delete"/>
                            </div>
                            :
                            <>
                            </>
                            }
                        <div className="group-6">
                            {tab === 1 ? 
                            <div className="profile-grid-container">
                                {posts.map((post) => (
                                    <div key={post.id} className="profile-grid-item" >
                                        {user && userId === user.sub ? 
                                        (<img className="trashcan-icon" 
                                        alt="Frame" 
                                        onClick={()=>DeletePost(post.id)}
                                        src={`${img}/trash-can-outline.svg`} />):
                                        (<></>)}
                                        

                                        <img className="profile-post-img" 
                                        src={post.location} alt={post.name} 
                                        onClick={()=>handlePostClic(post.id)}/>
                                        {/* <img className="heart-icon" alt="Frame" src={heart} /> */}
                                    </div>
                                    
                                ))}
                            </div>
                            :
                            <div className="profile-grid-container">
                                {selectedFolderPosts.map((post) => (
                                    <div key={post.id} className="profile-grid-item" >
                                        <img className="profile-post-img" src={post.location} 
                                        alt={post.name} 
                                        onClick={()=>handlePostClic(post.id)}/>
                                        {/* <img className="heart-icon" alt="Frame" src={heart} /> */}
                                    </div>
                                    
                                ))}
                            </div>
                            }
                                        
                            
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profile