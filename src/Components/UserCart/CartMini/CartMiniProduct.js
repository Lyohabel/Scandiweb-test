import React from 'react';
// import * as _ from 'lodash';
//import {NavLink} from 'react-router-dom'; // eslint-disable-line
//import { client, Query} from "@tilework/opus";
import OverallData from '../../../Context';
import * as styles from './CartMiniProduct.module.css'
//import {COLOR, DEFAULT} from '../../../CONST';

class CartMiniProduct extends React.Component {
  constructor(props) { // eslint-disable-line
    super(props);
    this.state = {
      jsonCart: '',
      productsNumber: '',
      // cartProductData: '',
      // prices: '',
      // img: '',
      // attributes: '',
      productAmount: this.props.savedData.amount
    }
  }

  changeProductAmount(sign) {
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);
    let productAmount = jsonCart[this.props.id].amount

    if (sign === 'plus') {
      const newAmount = productAmount + 1
      this.setState({
        ...this.state,
        productAmount: newAmount
        })
        jsonCart[this.props.id].amount = newAmount
        window.localStorage.setItem('cart', JSON.stringify(jsonCart));
    } else if (sign === 'minus' && productAmount > 0){
          const newAmount = productAmount - 1
      this.setState({
        ...this.state,
        productAmount: newAmount
        })
        jsonCart[this.props.id].amount = newAmount
        window.localStorage.setItem('cart', JSON.stringify(jsonCart)); 
      } 
  }

  render() { // onClick={console.log(this.props.savedData.prices[0].amount)}
    return (
      <li className={styles.prodItem}>
              <div className={styles.prodInf}>
                <h4>{this.props.savedData.brand}<br/>{this.props.savedData.name}</h4>              
                <div className={styles.prodPrice}><span>{this.context.currencySimbol}</span><span className={styles.priceNumber}>{this.props.savedData.prices[this.context.currencyNumber]}</span></div>
                <div className={styles.colorButtons}>
                  <button className={styles.sBut}>
                    <span>S</span>
                    <span className={styles.butPrompt}>
                      To change the selected attributes, click on the button VIEW BAG below to go to the cart 
                    </span>
                  </button>
                  <button className={styles.mBut}>M</button>
                  <button className={styles.sBut}>...</button>
                </div>
              </div>

              <div className={styles.prodImage}>
                <div className={styles.countButtons}>
                  <button onClick={() => this.changeProductAmount('plus')} className={styles.plusBut}>&#43;</button>
                  <span>{this.state.productAmount}</span>
                  <button onClick={() => this.changeProductAmount('minus')} className={styles.minusBut}>&#8722;</button>
                </div>
                <img className={styles.imgProd} src={this.props.savedData.gallery[0]} alt="#"/>
              </div>            
            </li>        
    ); // onClick={() => this.showAnotherImage('prev')} onClick={() => this.showAnotherImage('next')} 
  } 
}      

CartMiniProduct.contextType = OverallData;

export default CartMiniProduct;