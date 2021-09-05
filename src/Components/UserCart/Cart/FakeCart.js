import React from 'react';
import Cart from './Cart';

class FakeCart extends React.PureComponent { // eslint-disable-next-line
  constructor(props) { 
    super(props);      
  }

  render() {
    return (
      <Cart/>
    );
  } 
}

export default FakeCart;