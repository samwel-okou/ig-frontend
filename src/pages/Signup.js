import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

const Signup = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const { user, setUser } = useContext(UserContext);
  console.log(`user`, user);

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        'http://localhost:1337/auth/local/register',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            username: email,
            email,
            password,
          }),
        }
      );

      const data = await response.json();
      console.log('data1', data);

      setUser(data);

      if (data.message) {
        setError(data.message[0].messages[0].message);
        return;
      }
    } catch (error) {
      setError(`Something went wrong!${error}`);
    }
  };

  return (
    <div className="signup">
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <input
          style={{ marginTop: '10px' }}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />

        <button style={{ marginTop: '10px' }}>Sign up</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
