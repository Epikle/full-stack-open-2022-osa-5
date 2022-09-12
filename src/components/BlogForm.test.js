import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import BlogForm from './BlogForm';
import { createBlog } from '../services/blogs';

jest.mock('../services/blogs');

describe('<BlogForm />', () => {
  let container;

  beforeEach(() => {
    container = render(
      <BlogForm onMessage={() => {}} onError={() => {}} />
    ).container;
  });

  test('create new blog item', async () => {
    const user = userEvent.setup();
    const createBtn = screen.getByText('create new blog');

    await user.click(createBtn);

    const title = container.querySelector('input#title');
    const author = container.querySelector('input#author');
    const url = container.querySelector('input#url');
    const submitBtn = screen.getByText('create');

    await user.type(title, 'title2');
    await user.type(author, 'author2');
    await user.type(url, 'url2');
    await user.click(submitBtn);

    expect(createBlog).toBeCalledTimes(1);
    expect(createBlog.mock.calls[0][0].title).toBe('title2');
  });
});
