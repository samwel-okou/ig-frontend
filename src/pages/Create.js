import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Create = () => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);

  const { user } = useContext(UserContext);

  const [file, setFile] = useState(null);
  console.log('file', file);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      setError('Please Login First !');
      return;
    }

    //frontend validation
    if (!description) {
      setError('please add description!');
      return;
    }

    if (!file) {
      //error handling
      setError('please add a file!');
      return;
    } else {
      setError('good to go!');
    }

    const formData = new FormData();
    formData.append('data', JSON.stringify({ description }));
    formData.append('files.image', file);

    try {
      //   throw 'error';
      const response = await fetch('http://localhost:1337/posts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log('exception', error);
      setError(error);
    }
  };

  return (
    <div className="create">
      <h2>Create</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
            setError('');
          }}
        />

        <input
          type="file"
          placeholder="Add a file"
          onChange={(event) => {
            setFile(event.target.files[0]);
            setError('');
          }}
        />

        <button>Submit</button>
      </form>
    </div>
  );
};

export default Create;
