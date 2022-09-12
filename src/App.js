import { useState, useEffect, Fragment } from 'react';

import LoginForm from './components/LoginForm';
import Blog from './components/Blog';
import { getAll, setToken } from './services/blogs';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await getAll();
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    };
    fetchBlogs();
  }, [message]);

  useEffect(() => {
    const loggedUser = localStorage.getItem('FSO_osa4_user');

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const logoutHandler = () => {
    setUser(null);
    localStorage.removeItem('FSO_osa4_user');
  };

  return (
    <div>
      {!user ? <h2>log in to application</h2> : <h2>blogs</h2>}
      <Notification
        message={message}
        setMessage={setMessage}
        error={error}
        setError={setError}
      />
      {!user && (
        <LoginForm
          onLogin={setUser}
          onError={setError}
          onErrorMessage={setMessage}
        />
      )}
      {user && (
        <Fragment>
          <p>
            <strong>{user.name}</strong> logged in{' '}
            <button onClick={logoutHandler}>logout</button>
          </p>
          <BlogForm onMessage={setMessage} onError={setError} />
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              onMessage={setMessage}
              onError={setError}
              onErrorMessage={setMessage}
            />
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default App;
