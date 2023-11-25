// In your React component
function Post({ post }) {
    
    return (
      <div>
        <h2>{post.name}</h2>
        <img src={post.location} alt={post.name} />
        {/* Other post details... */}
      </div>
    );
  }
  export default Post