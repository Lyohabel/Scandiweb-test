import React from 'react';
// import * as _ from 'lodash';
import {NavLink} from 'react-router-dom'; // eslint-disable-line
import { client, Query} from "@tilework/opus";
import OverallData from '../../../Context';
import * as styles from './CartMiniProduct.module.css'
//import {COLOR, DEFAULT} from '../../../CONST';

class CartMiniProduct extends React.Component {
  constructor(props) { // eslint-disable-line
    super(props);
    this.state = {
      jsonCart: '',
      productsNumber: '',
      cartProductData: '',
      prices: '',
      img: '',
      attributes: '',
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
  
  componentDidMount() {
    if (!window.localStorage.getItem('cart')) return;
    
    const name = this.props.savedData.name

    client.setEndpoint("http://localhost:4000/graphql");

    const queryInStock = new Query("product", true)  // ! checking for inStock before displaying in the cart
      .addArgument("id", "String!", name)   
      .addField("inStock")

    client.post(queryInStock).then(result => {
      if (result.product.inStock !== true) return ''
        else {
          const queryName = new Query("product", true)
            .addArgument("id", "String!", name)   
            .addFieldList(["id", "name", "gallery", "description", "brand", "attributes {id, items {value, id}}", "prices {amount}"])

          client.post(queryName).then(result => {
            this.setState({
              ...this.state,        
              cartProductData: JSON.parse(JSON.stringify(result.product)),
              prices: result.product.prices.map(item => item.amount),
              img: result.product.gallery[0],
              attributes: JSON.parse(JSON.stringify(result.product.attributes))
            })  
            //console.log(this.state.cartProductData.attributes)
            //console.log(this.props.savedData.name)
          })
        }
    })
  }

  render() { // onClick={console.log(this.state.jsonCart)}
    return (
      <li className={styles.prodItem}>
              <div className={styles.prodInf}>
                <h4>{this.state.cartProductData.brand}<br/>{this.state.cartProductData.name}</h4>              
                <div className={styles.prodPrice}><span>{this.context.currencySimbol}</span><span className={styles.priceNumber}>{this.state.prices[this.context.currencyNumber]}</span></div>
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
                <img className={styles.imgProd} src={this.state.img} alt="#"/>
              </div>            
            </li>        
    ); // onClick={() => this.showAnotherImage('prev')} onClick={() => this.showAnotherImage('next')} 
  } 
}      

CartMiniProduct.contextType = OverallData;

export default CartMiniProduct;