import React from 'react';
import {NavLink} from 'react-router-dom';
import * as styles from './CartMini.module.css';
import CartMiniProduct from './CartMiniProduct';

class CartMini extends React.Component {
  constructor(props) { // eslint-disable-line
    super(props);
    this.state = {
      jsonCart: ''
    }
    
    //this.methodeName = this.methodeName.bind(this)
	
  }

  createCartMiniList() {        
    return this.state.jsonCart && this.state.jsonCart.map((item, index) =>
      <CartMiniProduct key={index} id={index} savedData={JSON.parse(JSON.stringify(this.state.jsonCart[index]))} setCurrentProduct={this.props.setCurrentProduct}/>
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

  componentDidUpdate() {    
    if (!window.localStorage.getItem('cart')) return;

    if (this.props.cartChanged !== 'no') {
      const cart = window.localStorage.getItem('cart');

      this.setState({
        ...this.state,        
        jsonCart: JSON.parse(cart)
      })
      this.props.setCartChanged('no')
    }    
  } 

  render() {
    return (
      <div className={styles.cartMiniWrapper}>                                     
        <div className={styles.cartMini}>
          <div className={styles.cartTitle}>My bag, <span>{this.state.jsonCart.length}</span><span> items</span></div>
          <ul className={styles.productList}>
            {/* <li className={styles.prodItem}>
              <div className={styles.prodInf}>
                <h4>Apollo<br/>Running Short</h4>              
                <div className={styles.prodPrice}><span>$</span><span className={styles.priceNumber}>50</span><span>.00</span></div>
                <div className={styles.colorButtons}>
                  <button className={styles.sBut}>S</button>
                  <button onClick={console.log(this.state.jsonCart)} className={styles.mBut}>M</button>
                </div>
              </div>

              <div className={styles.prodImage}>
                <div className={styles.countButtons}>
                  <button className={styles.plusBut}>&#43;</button>
                  <span>1</span>
                  <button className={styles.minusBut}>&#8722;</button>
                </div>
                <img className={styles.imgProd} src={imgProd1} alt="#"/>
              </div>            
            </li> */}

            {this.createCartMiniList()}
          </ul>

          <div className={styles.prodSumm}>
            <h4>Total</h4>
            <div className={styles.prodSummNumber}><span>$</span><span className={styles.priceNumber}>100</span><span>.00</span></div>
          </div>

          <div className={styles.prodButtons}>
            <button onClick={() => this.props.hideCartMini()} className={styles.viewButton}>
              <NavLink className={styles.cartLink} to="/cart">
                View bag
              </NavLink>              
            </button>
            <button className={styles.checkButton}>Check out</button>
          </div>
        </div>
      </div>     
    );
  } 
}

export default CartMini;