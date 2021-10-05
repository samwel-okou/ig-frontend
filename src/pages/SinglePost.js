import React, { useState, useEffect, useContext } from 'react';
import Post from '../components/Post';
import { UserContext } from '../context/UserContext';

const SinglePost = ({ match, history }) => {
  console.log('match', match);
  const { id } = match.params;
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [description, setDescription] = useState('');

  //const[error,setError]= useState(false)

  const { user, setUser } = useContext(UserContext);

  console.log(user, setUser);

  const fetchPost = async () => {
    const response = await fetch(`http://localhost:1337/posts/${id}`);
    const data = await response.json();
    console.log('data', data);

    setPost(data);
    setDescription(data.description);
    setLoading(false);
    //setError()
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    console.log('clicked');

    const response = await fetch(`http://localhost:1337/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${user.jwt}`,
      },
      body: JSON.stringify({
        description: description,
      }),
    });
    const data = await response.json();
    console.log(data);
    fetchPost();
  };

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:1337/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.jwt}`,
      },
    });
    const data = await res.json();
    console.log(data);
    history.push('/');
  };

  const handleLike = async () => {
    try {
      const response = await fetch('http://localhost:1337/likes', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post: parseInt(id),
        }),
      });

      fetchPost();
    } catch (error) {
      console.log('Exception', error);
    }
  };

  const handleRemoveLike = async () => {
    try {
      const response = await fetch(`http://localhost:1337/likes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
        // body: JSON.stringify({
        //   post: parseInt(id),
        // }),
      });

      console.log(`response`, response);

      const data = await response.json();
      console.log(`delete`, data);

      fetchPost();
    } catch (error) {
      console.log('Exception', error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="singlePost">
      <h1>Single Post</h1>

      {loading && <p>Loading...</p>}

      {!loading && (
        <>
          {post.id && (
            <>
              <Post
                description={post.description}
                url={post.image && post.image.url}
                likes={post.likes}
              />

              {user && (
                <>
                  <button onClick={handleLike}>likes</button>
                  <button onClick={handleRemoveLike}>remove likes</button>
                </>
              )}
              {user && (
                <>
                  <button
                    onClick={handleDelete}
                    style={{
                      backgroundColor: 'steelblue',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      height: '30px',
                      padding: '4px',
                      margin: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete this Post
                  </button>

                  <button
                    style={{
                      cursor: 'pointer',
                      borderRadius: '3px',
                      backgroundColor: 'orangered',
                      borderRadius: '4px',
                      height: '30px',
                      border: 'none',
                    }}
                    onClick={() => setEdit(true)}
                  >
                    Edit this form
                  </button>
                  {edit && (
                    <form onSubmit={handleEditSubmit}>
                      <input
                        style={{
                          height: '25px',
                          width: '40%',
                          padding: '8px',
                          color: 'white',
                          backgroundColor: 'black',
                          fontWeight: 'bolder',
                        }}
                        value={description}
                        placeholder="New description"
                        onChange={(event) => setDescription(event.target.value)}
                      />
                      <button
                        style={{
                          cursor: 'pointer',
                          borderRadius: '3px',
                          backgroundColor: 'orangered',
                          borderRadius: '4px',
                          height: '30px',
                          border: 'none',
                          margin: '20px',
                        }}
                      >
                        Confirm
                      </button>
                    </form>
                  )}
                </>
              )}
            </>
          )}
          {!post.id && <p>404-Not Found</p>}
        </>

        //{!error}..
      )}
    </div>
  );
};

export default SinglePost;
