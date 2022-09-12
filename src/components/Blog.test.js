import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Blog from './Blog';
import { likeBlog } from '../services/blogs';

jest.mock('../services/blogs');

describe('<Blog />', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 10,
    user: {
      name: 'name',
    },
  };

  let container;

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        onMessage={() => {}}
        onError={() => {}}
        onErrorMessage={() => {}}
      />
    ).container;
  });

  test('renders blog title and author but not url and likes', () => {
    screen.getByText(blog.title);
    screen.getByText(blog.author);

    const div = container.querySelector('#hidden');
    expect(div).not.toBeInTheDocument();
  });

  test('show url and likes after clicked show button', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');

    await user.click(button);

    const div = container.querySelector('#hidden');
    expect(div).toBeInTheDocument();
  });

  test('click like button two times and expect two fn calls', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');

    await user.click(button);

    const likeBtn = screen.getByText('like');
    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(likeBlog).toBeCalledTimes(2);
  });
});
