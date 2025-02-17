import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from './actions';

const Counter = ({ categories,count, increment, decrement }) => (
  <div>
    <p>{count}{categories[0].title}</p>
    <button onClick={increment}>Increment</button>
    <button onClick={decrement}>Decrement</button>
  </div>
);

const mapStateToProps = (state) => ({
  count: state.count,
  categories:state.categories
});

const mapDispatchToProps = {
  increment,
  decrement,
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);