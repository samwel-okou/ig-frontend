import Post from '../components/Post';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch('http://localhost:1337/posts');
      const data = await response.json();

      setPosts(data);
    };
    getPosts();
  }, []);

  return (
    <div className="App">
      {posts.map((post) => (
        <Link key={post.id} to={`${post.id}`}>
          <Post
            description={post.description}
            likes={post.likes}
            url={post.image && post.image.url}
          />
        </Link>
      ))}
    </div>
  );
};
