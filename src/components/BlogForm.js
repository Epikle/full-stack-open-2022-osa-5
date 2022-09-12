import { Fragment, useState } from 'react';

import { createBlog } from '../services/blogs';

const BlogForm = ({ onMessage, onError }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      await createBlog(newBlog);
      onMessage(`a new blog ${title} by ${author} added`);
      setTitle('');
      setAuthor('');
      setUrl('');
      setVisible((prevState) => !prevState);
    } catch (error) {
      console.error(error);
      onError(true);
      onMessage('something went wrong :(');
    }
  };

  const toggleVisibility = () => setVisible((prevState) => !prevState);

  if (!visible) {
    return <button onClick={toggleVisibility}>create new blog</button>;
  }

  return (
    <Fragment>
      <h2>create new</h2>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <button>create</button>
        </div>
        <div>
          <button type="button" onClick={toggleVisibility}>
            cancel
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default BlogForm;
