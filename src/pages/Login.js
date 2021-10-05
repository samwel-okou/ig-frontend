import React, { useState, useContext, useEffect } from 'react';

import { UserContext } from '../context/UserContext';

const Login = ({ history }) => {
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
      const response = await fetch('http://localhost:1337/auth/local/', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      const data = await response.json();
      console.log('data', data);

      if (data.message) {
        setError(data.message[0].messages[0].message);
        return;
      }

      setUser(data);
    } catch (error) {
      setError(`Something went wrong ${error}`);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event) => {
            setError('');
            setEmail(event.target.value);
          }}
        />
        <br />
        <input
          style={{ marginTop: '10px' }}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => {
            setError('');
            setPassword(event.target.value);
          }}
        />
        <br />

        <button style={{ marginTop: '10px' }}>Login</button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
