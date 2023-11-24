import React, { useState } from 'react';
import TaskBar from '../components/TaskBar';
import '../styles/Post.css';
import axios from 'axios';

function Post() {
    const api = process.env.REACT_APP_API;
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [tags, setTags] = useState('');

    const handleImageChange = (event) => {
        // Handle image file change
        const selectedImage = event.target.files[0];
        setImage(selectedImage);

        // Display the selected image
        if (selectedImage) {
            const imageUrl = URL.createObjectURL(selectedImage);
            setImageUrl(imageUrl);
        }
    };

    const handleSubmit = async () => {

        const formData = new FormData();
        formData.append("file", image);

        const handleFile = await axios.post(api+'File/UploadFile', formData);
        console.log(handleFile.data);

        const handlePost = axios.post(api, {
            id: 0,
            ownerId: 0,
            likes: 0,
            location: handleFile.data,
            name: title,
            description: caption,
            creationDate: new Date().toISOString()
        });
        handlePost.then(Response =>{

            console.log(Response.data);


        }).catch(error => {
            // Handle errors, e.g., display an error message to the user
            console.error("Post failed:", error);
            
        });
        
    };

    return (
        <>
            <TaskBar />
            <div className="post">
                <div className="div">
                    <div className="overlap">
                        <div className="group">
                            <div className="group-2">
                                <label htmlFor="imageUpload" className="frame">
                                    <img
                                    className='add-image'
                                        alt="Frame"
                                        src={imageUrl || process.env.PUBLIC_URL + '/image-plus.svg'}
                                    />
                                    <div className="text-wrapper">Add image</div>
                                </label>
                                <input
                                className='image-input'
                                    id="imageUpload"
                                    type="file"
                                    accept="image/jpeg, image/png, image/gif"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
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
                        <input
                            type="text"
                            className="text-wrapper-2"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <input
                            type="text"
                            className="text-wrapper-3"
                            placeholder="Caption"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                    </div>
                    <div className="div-wrapper">
                        <input
                            type="text"
                            className="text-wrapper-4"
                            placeholder="Tags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                    <p className="p">Add up to 30 tags</p>
                    <button className="overlap-group-2" onClick={handleSubmit}>
                        Submit now
                    </button>
                </div>
            </div>
        </>
    );
}

export default Post;
