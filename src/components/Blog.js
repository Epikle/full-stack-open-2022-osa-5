import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { likeBlog, removeBlog } from '../services/blogs';

import styles from './Blog.module.css';

const Blog = ({ blog, onMessage, onError, onErrorMessage }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    setLikes(blog.likes);
  }, [blog.likes]);

  const likeBtnHandler = async () => {
    try {
      const newBlog = {
        user: blog.user.id,
        likes: likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        id: blog.id,
      };
      setLikes((prevState) => prevState + 1);
      await likeBlog(newBlog);
    } catch (error) {
      console.error(error);
    }
  };
  const removeBtnHandler = async () => {
    if (window.confirm(`Removing blog ${blog.title} by ${blog.author}`)) {
      try {
        await removeBlog(blog.id);
        onMessage('blog removed successfully');
      } catch (error) {
        console.error(error);
        onError(true);
        onErrorMessage('Unauthorized');
      }
    }
  };

  return (
    <div className={`${styles.border} blog`}>
      <strong>{blog.title}</strong> {blog.author}{' '}
      <button onClick={() => setVisible((prevState) => !prevState)}>
        {visible ? 'hide' : 'view'}
      </button>
      {visible && (
        <div id="hidden">
          {blog.url}
          <br />
          likes {likes} <button onClick={likeBtnHandler}>like</button>
          <br />
          {blog.user.name}
          <br />
          <button onClick={removeBtnHandler}>remove</button>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onMessage: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onErrorMessage: PropTypes.func.isRequired,
};

export default Blog;
