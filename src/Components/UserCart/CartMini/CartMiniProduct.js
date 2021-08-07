import React from 'react';
import OverallData from '../../../Context';
import * as styles from './CartMiniProduct.module.css';
class CartMiniProduct extends React.Component {
  constructor(props) { 
    super(props);
    this.state = {
      jsonCart: '',
      uniqueId: '',
      productsNumber: '',
      productAmount: this.props.savedData.amount
    }
  }

  changeProductAmount(sign, uniqueId) {  
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);
    let x = jsonCart.findIndex(item => item.uniqueId === uniqueId);
    let productAmount = jsonCart[x].amount

    if (sign === 'plus') {
      const newAmount = productAmount + 1
      this.setState({
        ...this.state,
        productAmount: newAmount
        })

        jsonCart[x].amount = newAmount
        window.localStorage.setItem('cart', JSON.stringify(jsonCart));
        this.props.setMiniCartChanged('yes')
    } else if (sign === 'minus' && productAmount > 0){
          const newAmount = productAmount - 1
      this.setState({
        ...this.state,
        productAmount: newAmount
        })

        jsonCart[x].amount = newAmount
        window.localStorage.setItem('cart', JSON.stringify(jsonCart));
        this.props.setMiniCartChanged('yes')
      } 
  }

  showChosedAttribute() {
    if (this.props.savedData.attrNames === "") return ""
    else return (
      <div className={styles.attrButtons}>
        <button className={styles.firstBut}>
            <span>{this.props.savedData.attributes_1[0].value}</span>
            <span className={styles.butPrompt}>
              To view and change the selected attributes, click on the button VIEW BAG below to go to the cart 
            </span>
          </button>
          <button className={styles.choosedBut}>{this.props.savedData.attributes_1[1].value}</button>          
        </div>
    )
  }

  componentDidMount() {    
    const cart = window.localStorage.getItem('cart');
    const jsonCart = JSON.parse(cart)
    let x = jsonCart.findIndex(item => item.uniqueId === this.props.id);
    const newAmount = JSON.parse(cart)[x].amount
    const newData = JSON.parse(cart)[x]
    const uniqueId = JSON.parse(cart)[x].uniqueId
    this.setState({
      ...this.state,
      jsonCart: newData,
      productAmount: newAmount,
      uniqueId: uniqueId
      })
  } 

  componentDidUpdate() {     
    if (window.localStorage.getItem('cart') && this.props.miniCartProductChanged !== 'no') {
      const cart = window.localStorage.getItem('cart');
      const jsonCart = JSON.parse(cart)

      let x = jsonCart.find(item => item.uniqueId === this.state.uniqueId);
      
      const newAmount = x ? x.amount : ''
      
      this.setState({
        ...this.state,
        productAmount: newAmount
        })

        this.props.setMiniCartProductChanged('no')
    } 
  } 

  render() { 
    return (
      <li className={styles.prodItem}>
        <div className={styles.prodInf}>
          <h4>{this.props.savedData.brand}<br/>{this.props.savedData.prodName}</h4>

          <div className={styles.prodPrice}>
            <span>{this.context.currencySimbol}</span>
            <span className={styles.priceNumber}>{this.props.savedData.prices[this.context.currencyNumber]}</span>
          </div>

          {this.showChosedAttribute()}

        </div>

        <div className={styles.prodImage}>
          <div className={styles.countButtons}>
            <button onClick={() => this.changeProductAmount('plus', this.state.uniqueId)} className={styles.plusBut}>&#43;</button>

            <span>{this.state.productAmount}</span>
            
            <button onClick={() => this.changeProductAmount('minus', this.state.uniqueId)} className={styles.minusBut}>&#8722;</button>
          </div>

          <div className={styles.imgProd}>
            <img src={this.props.savedData.gallery[0]} alt="#"/>
          </div>                
        </div>            
      </li>        
    );  
  }  
}      

CartMiniProduct.contextType = OverallData;

export default CartMiniProduct;