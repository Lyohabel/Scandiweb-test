import React from 'react';
import OverallData from '../../../Context';
import * as styles from './CartProduct.module.css';
import setAttributes from './CartUtils/SetAttributes';
import returnAttributes from './CartUtils/ReturnAttributes';

class CartProductInf extends React.PureComponent {
  constructor(props) {  
    super(props);
    this.state = {
      jsonCart: '',
      jsonPrices: ''
    }    
  }
  
  setAttributes = (order) => setAttributes.call(this, order)
  
  returnAttributes = (arr) => returnAttributes.call(this, arr)
  
  componentDidMount() {    
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');
    const jsonCart = JSON.parse(cart)
    const x = jsonCart.findIndex(item => item.uniqueId === this.props.id);
    const product = JSON.parse(JSON.stringify(jsonCart[x]))
    const jsonPrices = JSON.parse(cart)[x].prices
    
    this.setState({
      jsonCart: JSON.parse(JSON.stringify(product)),
      jsonPrices: jsonPrices      
    })       
  }

  render() {
    const {brand, prodName, attributes} = this.state.jsonCart
    return (
      <section>
        <div className={styles.prodInf}>
          <div className={styles.prodInfWrapper}>
            <h4 className={styles.cartItemTitle}>{brand}</h4>
            <span className={styles.cartItemSubtitle}>{prodName}</span>

            <div className={styles.prodPrice}><span className={styles.currencySimbol}>{this.context.currencySimbol}</span><span className={styles.currencyAmount}>{this.state.jsonPrices[this.context.currencyNumber]}</span>
            </div>
          </div>

          <div className={styles.attributesWrapper}>

            {attributes ? this.returnAttributes(attributes) : ''}
          </div>
        </div>
      </section>          
    );  
  } 
}      

CartProductInf.contextType = OverallData;

export default CartProductInf;