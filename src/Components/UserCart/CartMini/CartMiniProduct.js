import React from 'react';
// import * as _ from 'lodash';
import {NavLink} from 'react-router-dom'; // eslint-disable-line
import { client, Query} from "@tilework/opus";
import OverallData from '../../../Context';
import * as styles from './CartMiniProduct.module.css'
import {COLOR, DEFAULT} from '../../../CONST';

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

  render() {
    return (
      <li className={styles.prodItem}>
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
                <img className={styles.imgProd} src={this.state.img} alt="#"/>
              </div>            
            </li>        
    ); // onClick={() => this.showAnotherImage('prev')} onClick={() => this.showAnotherImage('next')} 
  } 
}      

CartMiniProduct.contextType = OverallData;

export default CartMiniProduct;