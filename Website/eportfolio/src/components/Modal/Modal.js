import React, { useState } from "react";
import "./Modal.css";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import axios from 'axios';


export default function Modal({ postId }) {
  const acc = process.env.PUBLIC_URL ;
  const api = process.env.REACT_APP_API;
  const Token = localStorage.getItem('AuthToken');

  const [user, setUser] = useState();
    // console.log(user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
    
  useEffect(()=>{
      if(Token){
          setUser(jwtDecode(Token));
      }
  },[])
  const [checkedFolders, setCheckedFolders] = useState([]);
  const [modal, setModal] = useState(false);
  const [createOn, setCreateOn] = useState(false);
  const [newFolder, setNewFolder] = useState("");
  const [folders, setFolders] = useState([]);


  useEffect(() => {
    if(user){
      const fetchPost = axios.get(api + 'Folder/AllUserFolders/' + user.sub);
      fetchPost.then(Response =>{
        setFolders(Response.data);
      })

    }
    
  }, [user]);

  useEffect(() => {
    
    const fetchData = async () => {
      if (!Array.isArray(folders)) {
        console.error('Folders is not an array.');
        return;
      }
  
      const updatedCheckedFolders = [];
  
      for (const element of folders) {
        try {
          const response = await axios.post(api + 'Folder_Post/Exists', {
            id: 0,
            folderId: element.id,
            postId: postId,
          });
  
          if (response.data) {
            console.log('added')
            updatedCheckedFolders.push(element.id);
          }
        } catch (error) {
          //console.error('Check error:', error);
        }
      }
  
      setCheckedFolders(updatedCheckedFolders);
    };
  
    fetchData();
  }, [folders, postId]);
  
  

  const createNewFolder=()=>{
    var data = {
      id: 0,
      ownerId: user.sub,
      name: newFolder,
      description: "",
      isPublic: true,
      creationDate: new Date().toISOString()
    }
    
    const fetchCreatePost = axios.post(api + 'Folder', data);
    
    fetchCreatePost.then(Response =>{
      const fetchPost = axios.get(api + 'Folder/AllUserFolders/' + user.sub);
      fetchPost.then(Response =>{
        setFolders(Response.data);
      }).catch(error => {
        console.error('Error fetching data:', error);
      });

      setNewFolder('')
      setCreateOn(false);
    }).catch(error => {
      console.error('Error posting data:', error);
    });
  }

  const toggleCheckbox = async (folderId) => {
    if (checkedFolders.includes(folderId)) {
      // Folder is already checked, uncheck it
      setCheckedFolders(checkedFolders.filter((id) => id !== folderId));
      try {
        await axios.delete(api + 'Folder_Post/ByMatch', {
          data: {
            id: 0,
            folderId: folderId,
            postId: postId
          },
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.error('Error deleting Folder_Post:', error);
      }
    } else {
      // Folder is not checked, check it
      setCheckedFolders([...checkedFolders, folderId]);
    }
  };

  const saveChanges = async () => {
    try {
      for (const element of checkedFolders) {
        console.log(element);
        await axios.post(api + "Folder_Post", {
          id: 0,
          folderId: element,
          postId: postId
        });
      }
      toggleModal();
    } catch (error) {
      console.error('Error posting Folder_Post:', error);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
    setCreateOn(false);
  };
  
  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <img className="btn-modal" alt="Frame" src={acc + '/bookmark-multiple.svg'} onClick={toggleModal} />

      {/* {liked === null ? (<img className="img" alt="Frame" src={acc + '/heart-outline.svg'} onClick={Like}/>):
                        (<img className="img" alt="Frame" src={acc + '/full-heart.svg'} onClick={UnLike}/>)} */}

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>

            {createOn === false ? (
            <h2>Your Folders</h2>
            ):(
            <h2>Create a new folder</h2>
            )}

            {createOn === false ? (
            <div className="folder-container">

                {folders.map((folder) => (
                    <div key={folder.id} className="folder-grid">
                      <input
                      type="checkbox"
                      checked={checkedFolders.includes(folder.id)}
                      onChange={() => toggleCheckbox(folder.id)}
                    />
                        <div className="folder-wrapper">
                          {folder.name}

                        </div>
                    </div>
                ))}
            </div>
            ):(
              <div className="folder-container">
                <form>
                  <input className='text-imput' type='text' value={newFolder}  onChange={ev => setNewFolder(ev.target.value)} required/><br/>
                </form>
              </div>
            )}

            
            {createOn === false ? (
              <div className="modal-buttons">
                  <button className="create-new-button" onClick={() => setCreateOn(true)}>Create New</button>
                  <button className="done-button" onClick={saveChanges}>Done</button>
              </div>
            ):(
              <div className="modal-buttons">
                  <button className="create-new-button" onClick={() => setCreateOn(false)}>Back</button>
                  <button className="submit" onClick={createNewFolder}>Create</button>
              </div>
            )}
            
          </div>
        </div>
      )}
      
    </>
  );
}