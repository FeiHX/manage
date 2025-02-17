import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';



import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { increment, decrement } from './actions';

const mockStore = configureStore([]);

  const store = mockStore({ count: 0 });

//
// import { mapStateToProps, mapDispatchToProps } from './Counter';
//

// 模拟 props
const mockProps = {
  count: 0,
  increment: jest.fn(),
  decrement: jest.fn(),
};

test('renders counter with initial count', () => {
  render(
    <Provider store={store}>
      <Counter {...mockProps}/>
    </Provider>
  );

  // render(<Counter {...mockProps} />);
  expect(screen.getByText('0')).toBeInTheDocument();
});

test('calls increment when button is clicked', () => {
  render(
    <Provider store={store}>
      <Counter {...mockProps}/>
    </Provider>
  );
  fireEvent.click(screen.getByText('Increment'));
  expect(mockProps.increment).toHaveBeenCalled();
});

test('calls decrement when button is clicked', () => {
  render(
    <Provider store={store}>
      <Counter {...mockProps}/>
    </Provider>
  );
  fireEvent.click(screen.getByText('Decrement'));
  expect(mockProps.decrement).toHaveBeenCalled();
});

//

//
// test('mapStateToProps returns correct state', () => {
//     const state = { count: 5 };
//     const props = mapStateToProps(state);
//     expect(props.count).toBe(5);
//   });
  
//   test('mapDispatchToProps returns correct actions', () => {
//     const dispatch = jest.fn();
//     const { increment, decrement } = mapDispatchToProps(dispatch);
//     increment();
//     decrement();
//     expect(dispatch).toHaveBeenCalledWith({ type: 'INCREMENT' });
//     expect(dispatch).toHaveBeenCalledWith({ type: 'DECREMENT' });
//   });
// //


