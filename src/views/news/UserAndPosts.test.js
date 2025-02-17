import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import UserAndPosts from './UserAndPosts';

const server = setupServer(
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.json({ name: 'Alice' }));
  }),
  rest.get('/api/posts', (req, res, ctx) => {
    return res(ctx.json([{ id: 1, title: 'Post 1' }]));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('渲染用户和帖子数据', async () => {
  render(<UserAndPosts />);

  // 初始加载状态
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // 等待数据加载并断言
  await waitFor(() => {
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Post 1')).toBeInTheDocument();
  });
});