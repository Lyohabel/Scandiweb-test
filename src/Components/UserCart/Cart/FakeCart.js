import React from 'react';
import OverallData from '../../../Context';
import * as styles from './Cart.module.css';
import FakeCartProduct from './CartProduct';

class FakeCart extends React.Component {
  constructor(props) { 
    super(props);
    this.state = {
      jsonCart: ''
    }
    
    this.createCartList = this.createCartList.bind(this)      
  }
  createCartList() {        
    return this.state.jsonCart && this.state.jsonCart.map((item) =>
      <FakeCartProduct key={item.uniqueId} id={item.uniqueId} name={item.name} setCurrentProduct={this.props.setCurrentProduct}      
      setMiniCartProductChanged={this.props.setMiniCartProductChanged}/>
    )
  }
  
  componentDidMount() {
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');
    let jsonCart = JSON.parse(cart)

    this.setState({     
      jsonCart: JSON.parse(JSON.stringify(jsonCart))
    })
  }

  render() {
    return (
      <section className={styles.cart}>                                     
        <div className='container'>
          <div className={styles.cartWrapper}>
            <h3 className={styles.cartTitle}>Cart<span>.</span></h3>
            
            <ul className={styles.productList}>
              {this.createCartList()}              
            </ul>            
          </div>
        </div>
      </section>     
    );
  } 
}

FakeCart.contextType = OverallData;

export default FakeCart;