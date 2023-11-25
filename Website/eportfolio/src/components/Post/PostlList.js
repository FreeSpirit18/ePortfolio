import { useState } from "react";
import TaskBar from "../components/TaskBar"
import '../styles/Home.css'
import axios from 'axios';
import { useEffect } from "react";
import { Post } from "react-axios";

// Fetch posts from your API and render them
function PostList() {
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      // Fetch posts from your API
      fetch('your_api_endpoint')
        .then((response) => response.json())
        .then((data) => setPosts(data));
    }, []);
  
    return (
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    );
  }