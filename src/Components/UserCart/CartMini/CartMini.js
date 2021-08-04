import React from 'react';
import {NavLink} from 'react-router-dom';
import OverallData from '../../../Context';
import * as styles from './CartMini.module.css';
import CartMiniProduct from './CartMiniProduct';

class CartMini extends React.Component {
  constructor(props) { // eslint-disable-line
    super(props);
    this.state = {
      jsonCart: '',
      currencySimbol: '$',
      total: 100
    }
    
    //this.methodeName = this.methodeName.bind(this)
	
  }

  createCartMiniList() {        
    return this.state.jsonCart && this.state.jsonCart.map((item, index) =>
      <CartMiniProduct key={index} id={index} savedData={JSON.parse(JSON.stringify(this.state.jsonCart[index]))} setCurrentProduct={this.props.setCurrentProduct}
      miniCartChanged={this.props.miniCartChanged} 
      setMiniCartChanged={this.props.setMiniCartChanged}
      miniCartProductChanged={this.props.miniCartProductChanged}
      miniCartProductChangedId={this.props.miniCartProductChangedId}      
      setMiniCartProductChanged={this.props.setMiniCartProductChanged}/>
    )
  }

  checkOut() {
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');
    const jsonCart = JSON.parse(cart)
    let total = 0

    jsonCart.forEach(element => {      
      total += element.prices[this.context.currencyNumber] * element.amount
    });

    this.setState({
      ...this.state,
      currencySimbol: this.context.currencySimbol,        
      total: total.toFixed(2)      
    })
  }

  componentDidMount() {
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');

    this.setState({
      ...this.state,        
      jsonCart: JSON.parse(cart)
    })
  }

  componentDidUpdate() {    
    if (!window.localStorage.getItem('cart')) return;

    if (this.props.miniCartChanged !== 'no') {
      const cart = window.localStorage.getItem('cart');

      this.setState({
        ...this.state,        
        jsonCart: JSON.parse(cart)
      })
      this.props.setMiniCartChanged('no')           
    }    
  } 

  render() {
    return (
      <div className={styles.cartMiniWrapper}>                                     
        <div className={styles.cartMini}>
          <div className={styles.cartTitle}>My bag, <span>{this.state.jsonCart.length}</span><span> items</span></div>
          <ul className={styles.productList}>          

            {this.createCartMiniList()}

          </ul>

          <div className={styles.prodSumm}>
            <h4>Total</h4>
            <div className={styles.prodSummNumber}><span className={styles.priceNumber}>{this.state.currencySimbol}{this.state.total}</span></div>
          </div>

          <div className={styles.prodButtons}>
            <button onClick={() => {this.props.hideCartMini(); 
            //this.props.setCartChanged('yes'); 
            this.props.setCartProductChanged('yes')}} className={styles.viewButton}>
              <NavLink className={styles.cartLink} to="/cart">
                View bag
              </NavLink>              
            </button>
            <button onClick={() => this.checkOut()} className={styles.checkButton}>Check out</button>
          </div>
        </div>
      </div>     
    );
  } 
}

CartMini.contextType = OverallData;

export default CartMini;