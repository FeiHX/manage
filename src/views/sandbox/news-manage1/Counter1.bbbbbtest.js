import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Counter from './Counter';
import { increment, decrement } from './actions';
import NewsAdd from '../news-manage/NewsAdd';
// import { Router } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const mockStore = configureStore([]);

test('renders with initial state from Redux store', () => {
  const store = mockStore({ count: 10,categories:[ {
    "id": 1,
    "title": "时事新闻",
    "value": "时事新闻"
},] });
  render(
    <Provider store={store}>
      {/* <Counter /> */}
      <Router>
        <NewsAdd></NewsAdd>
      </Router>
    </Provider>
  );
  expect(screen.getByText('10')).toBeInTheDocument();
  expect(screen.getByText('时事新闻')).toBeInTheDocument();
});

test('dispatches increment action when button is clicked', () => {
  const store = mockStore({ count: 0 });
  render(
    <Provider store={store}>
      <Counter />
    </Provider>
  );
  fireEvent.click(screen.getByText('Increment'));
  const actions = store.getActions();
  expect(actions).toEqual([increment()]);
  expect(screen.getByText('11')).toBeInTheDocument();
});

test('dispatches decrement action when button is clicked', () => {
  const store = mockStore({ count: 0 });
  render(
    <Provider store={store}>
      <Counter />
    </Provider>
  );
  fireEvent.click(screen.getByText('Decrement'));
  const actions = store.getActions();
  expect(actions).toEqual([decrement()]);
  expect(screen.getByText('9')).toBeInTheDocument();
});