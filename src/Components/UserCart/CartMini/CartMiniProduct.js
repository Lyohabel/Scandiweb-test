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

  showChosedAttribute() {
    if (this.props.savedData.attrNames === "") return ""
    else return (
      <div className={styles.colorButtons}>
        <button onClick={console.log(this.props.savedData)} className={styles.sBut}>
            <span>S</span>
            <span className={styles.butPrompt}>
              To view and change the selected attributes, click on the button VIEW BAG below to go to the cart 
            </span>
          </button>
          <button className={styles.mBut}>M</button>
          <button className={styles.sBut}>...</button>
        </div>
    )
  }

  componentDidUpdate() {
    if (window.localStorage.getItem('cart') && this.props.miniCartProductChanged !== 'no' && this.props.miniCartProductChangedId === this.props.id) {
      const cart = window.localStorage.getItem('cart');
      const newAmount = JSON.parse(cart)[this.props.id].amount

      this.setState({
        ...this.state,
        productAmount: newAmount
        })
        this.props.setMiniCartProductChanged('no')
      console.log('MiniProd UPD!')      
    }    
  } 

  render() { 
    return (
      <li className={styles.prodItem}>
              <div className={styles.prodInf}>
                <h4>{this.props.savedData.brand}<br/>{this.props.savedData.name}</h4>              
                <div className={styles.prodPrice}><span>{this.context.currencySimbol}</span><span className={styles.priceNumber}>{this.props.savedData.prices[this.context.currencyNumber]}</span></div>

                {this.showChosedAttribute()}

                {/* <div className={styles.colorButtons}>
                  <button onClick={console.log(this.props.savedData)} className={styles.sBut}>
                    <span>S</span>
                    <span className={styles.butPrompt}>
                      To change the selected attributes, click on the button VIEW BAG below to go to the cart 
                    </span>
                  </button>
                  <button className={styles.mBut}>M</button>
                  <button className={styles.sBut}>...</button>
                </div> */}
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
    ); 
  } 
}      

CartMiniProduct.contextType = OverallData;

export default CartMiniProduct;