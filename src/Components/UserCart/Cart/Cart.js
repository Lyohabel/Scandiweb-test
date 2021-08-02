import React from 'react';
//import * as _ from 'lodash';
// import {NavLink} from 'react-router-dom'; // eslint-disable-line
// import { client, Query} from "@tilework/opus";
import OverallData from '../../../Context';
import * as styles from './Cart.module.css';
import CartProduct from './CartProduct';


class Cart extends React.Component {
  constructor(props) { // eslint-disable-line
    super(props);
    this.state = {
      jsonCart: ''
    }
    
    this.createCartList = this.createCartList.bind(this)      
  }
  createCartList() {        
    return this.state.jsonCart && this.state.jsonCart.map((item, index) =>
      <CartProduct key={index} id={index} savedData={this.state.jsonCart[index]} setCurrentProduct={this.props.setCurrentProduct}/>
    )
  }
  
  componentDidMount() {
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');

    this.setState({
      ...this.state,        
      jsonCart: JSON.parse(cart)
    })    
  }

  render() {
    return (
      <section className={styles.cart}>                                     
        <div className='container'>
          <div className={styles.cartWrapper}>
            <h3 className={styles.cartTitle}>Cart</h3>
            {/* <button onClick={() => console.log(this.state.cartData[0].name)}>XXXXX</button> */}
            <ul className={styles.productList}>

              {this.createCartList()}
              
            </ul>            
          </div>
        </div>
      </section>     
    );
  } 
}

Cart.contextType = OverallData;

export default Cart;