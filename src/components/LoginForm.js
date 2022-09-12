import { useState } from 'react';

import { setToken } from '../services/blogs';
import { loginUser } from '../services/login';

const LoginForm = ({ onLogin, onError, onErrorMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    const credentials = {
      username,
      password,
    };

    try {
      const user = await loginUser(credentials);
      localStorage.setItem('FSO_osa4_user', JSON.stringify(user));
      setToken(user.token);
      onLogin(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
      onError(true);
      onErrorMessage('wrong username or password');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button>login</button>
    </form>
  );
};

export default LoginForm;
