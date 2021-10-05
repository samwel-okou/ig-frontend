import React from 'react';

// const post = {
//   id: 1,
//   description:
//     'I blog about JavaScript frameworks like React/NextJs Technologies',
//   likes: 20,
//   author: null,
//   published_at: '2021-09-27T21:06:34.432Z',
//   created_at: '2021-09-27T21:06:21.784Z',
//   updated_at: '2021-09-27T21:06:34.455Z',
//   image: {
//     url: '/uploads/small_code_event_53d8b6fbc2.jpg',
//   },
// };

const API_URL = 'http://localhost:1337';
const formateImageUrl = (url) => `${API_URL}${url}`;

const Post = ({ description, likes, url }) => {
  return (
    <div
      style={{
        border: '1px solid #eee',
        display: 'inline-block',
        padding: '10px',
        marginTop: '30px',
      }}
      className="post"
    >
      <img
        style={{ width: '400px', height: '200px', paddingTop: '30px' }}
        src={formateImageUrl(url)}
        alt=""
      />
      <h4
        style={{
          color: 'steelblue',
          fontFamily: 'inherit',
          fontSize: '20px',
          width: '40rem',
        }}
      >
        {description}
      </h4>
      <div>
        <span style={{ color: 'blue' }}>Likes: {likes}</span>
      </div>
    </div>
  );
};

export default Post;
