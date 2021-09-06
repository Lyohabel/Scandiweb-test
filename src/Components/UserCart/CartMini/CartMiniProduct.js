import React from 'react';
import checkForInStock from '../../../Queries/CheckForInStock';
import OverallData from '../../../Context';
import * as styles from './CartMiniProduct.module.css';
import showChosedAttribute from './CartMiniUtils/ShowChosedAttribute';
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

  async changeProductAmount(sign, uniqueId) {  
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);
    let x = jsonCart.findIndex(item => item.uniqueId === uniqueId);
    let productAmount = jsonCart[x].amount

    if (sign === 'plus') {
      const name = this.props.name
      const inStock = await JSON.parse(JSON.stringify((await checkForInStock(name))))

      if (inStock.product.inStock !== true) return ''        
      else {       
        const newAmount = productAmount + 1
        this.setState({
          productAmount: newAmount
        })
            
        jsonCart[x].amount = newAmount
        window.localStorage.setItem('cart', JSON.stringify(jsonCart));
        this.props.setMiniCartProductChanged('yes')
      }      
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

  showChosedAttribute = () => showChosedAttribute.call(this)

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
    const {prices, uniqueId, productAmount, gallery} = this.state
    const {brand, prodName} = this.state.jsonCart
    return (
      <li className={styles.prodItem}>
        <div className={styles.prodInf}>
          <h4>{brand}<br/>{prodName}</h4>

          <div className={styles.prodPrice}>
            <span>{this.context.currencySimbol}</span>
            <span className={styles.priceNumber}>{prices[this.context.currencyNumber]}</span>
          </div>

          {this.showChosedAttribute()}

        </div>

        <div className={styles.prodImage}>
          <div className={styles.countButtons}>
            <button onClick={() => this.changeProductAmount('plus', uniqueId)} className={styles.plusBut}>&#43;</button>

            <span>{productAmount}</span>
            
            <button onClick={() => this.changeProductAmount('minus', uniqueId)} className={styles.minusBut}>&#8722;</button>
          </div>

          <div className={styles.imgProd}>           
              <img src={gallery[0]} alt="#"/>            
          </div>                
        </div>            
      </li>        
    );  
  }  
}      

CartMiniProduct.contextType = OverallData;

export default CartMiniProduct;

