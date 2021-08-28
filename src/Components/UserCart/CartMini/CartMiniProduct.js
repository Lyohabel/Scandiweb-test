import React from 'react';
import { client, Query} from "@tilework/opus";
import OverallData from '../../../Context';
import * as styles from './CartMiniProduct.module.css';
class CartMiniProduct extends React.PureComponent { // 
  constructor(props) { 
    super(props);
    this.state = {
      jsonCart: '',
      uniqueId: '',
      productAmount: '',
      gallery: '',
      prices: '',
      attributes_1: '',
      attrNames: ''
    }
  }

  changeProductAmount(sign, uniqueId) {  
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);
    let x = jsonCart.findIndex(item => item.uniqueId === uniqueId);
    let productAmount = jsonCart[x].amount

    if (sign === 'plus') {
      const name = this.props.name
      client.setEndpoint("http://localhost:4000/graphql");
      const queryInStock = new Query("product", true) // checking for inStock  
        .addArgument("id", "String!", name)   
        .addField("inStock")

      client.post(queryInStock).then(result => {
        if (result.product.inStock !== true) return ''        
          else {       
            const newAmount = productAmount + 1
            this.setState({
              productAmount: newAmount
            })
            jsonCart[x].amount = newAmount
            window.localStorage.setItem('cart', JSON.stringify(jsonCart));
            this.props.setMiniCartProductChanged('yes')
          } 
      })
    } else if (sign === 'minus' && productAmount > 0){
        const newAmount = productAmount - 1
        this.setState({
          productAmount: newAmount
        })

        jsonCart[x].amount = newAmount
        window.localStorage.setItem('cart', JSON.stringify(jsonCart));
        this.props.setMiniCartProductChanged('yes')        
      } 
  }

  showChosedAttribute() {
    if (this.state.attrNames === "") return ""
    else return (
      <div className={styles.attrButtons}>
        <button className={styles.firstBut}>
            <span>{this.state.attributes_1[0].value}</span>
            <span className={styles.butPrompt}>
              To view and change the selected attributes, click on the button VIEW BAG below to go to the cart 
            </span>
          </button>
          <button className={styles.choosedBut}>{this.state.attributes_1[1].value}</button>          
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
    const gallery = JSON.parse(cart)[x].gallery
    const prices = JSON.parse(cart)[x].prices 
    const attributes_1 = JSON.parse(cart)[x].attributes_1
    const attrNames = JSON.parse(cart)[x].attrNames
    this.setState({
      jsonCart: JSON.parse(JSON.stringify(newData)),
      productAmount: newAmount,
      uniqueId: uniqueId,
      gallery: gallery,
      prices: prices,
      attributes_1: attributes_1,
      attrNames: attrNames
    })      
  } 

  componentDidUpdate() {
      const cart = window.localStorage.getItem('cart');
      const jsonCart = JSON.parse(cart)

      let x = jsonCart.find(item => item.uniqueId === this.state.uniqueId);
      
      const newAmount = x ? x.amount : ''
      
      this.setState({
        productAmount: newAmount
        })
  } 

  render() { 
    return (
      <li className={styles.prodItem}>
        <div className={styles.prodInf}>
          <h4>{this.state.jsonCart.brand}<br/>{this.state.jsonCart.prodName}</h4>

          <div className={styles.prodPrice}>
            <span>{this.context.currencySimbol}</span>
            <span className={styles.priceNumber}>{this.state.prices[this.context.currencyNumber]}</span>
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
              <img src={this.state.gallery[0]} alt="#"/>            
          </div>                
        </div>            
      </li>        
    );  
  }  
}      

CartMiniProduct.contextType = OverallData;

export default CartMiniProduct;

