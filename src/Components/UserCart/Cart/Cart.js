import React from 'react';
import {NavLink} from 'react-router-dom'; // eslint-disable-line
import { client, Query, Field } from "@tilework/opus";
import imgProd1 from '../../../ImagesTemp/black.png';
import imgProd2 from '../../../ImagesTemp/glasses.png';
import * as styles from './Cart.module.css'

class Cart extends React.Component {
  constructor(props) { // eslint-disable-line
    super(props);
    
    //this.methodeName = this.methodeName.bind(this)
	
  }

  componentDidMount() {
    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);
    jsonCart.splice(0,1);
    console.log(jsonCart);
    
    client.setEndpoint("http://localhost:4000/graphql");

    const query = new Query("category", true)     
    .addField(new Field("products", arguments.title, true).addFieldList(["id", "name", "inStock", "gallery", "description", "category", "attributes {items {value}}", "prices {currency,amount }"]))

    // .addField(new Field("products{id, name, inStock, gallery, description, category, attributes {id, name, type, items {displayValue, value, id}}, prices {currency,amount}, brand }"))
  
      client.post(query).then(result => {
        const newData = result.category.products
        this.setState({
        ...this.state,        
        currentCategoryData: newData           
      });     
    });   

  } 

  render() {
    return (
      <section className={styles.cart}>                                     
        <div className='container'>
          <div className={styles.cartWrapper}>
            <h3 className={styles.cartTitle}>Cart</h3>
            <ul className={styles.productList}>
              <li className={styles.cartItem}>
                <span className={styles.cartLine}></span>
                <div className={styles.cartItemWrapper}>
                  <div className={styles.prodInf}>
                    <h4 className={styles.cartItemTitle}>Apollo</h4>
                    <span className={styles.cartItemSubtitle}>Running Short</span>                
                    <div className={styles.prodPrice}><span>$</span><span className={styles.priceNumber}>50</span><span>.00</span></div>
                    <div className={styles.colorButtons}>
                      <button className={styles.sBut}>S</button>
                      <button className={styles.mBut}>M</button>
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
                </div>           
              </li>

              <li className={styles.cartItem}>
                <span className={styles.cartLine}></span>
                <div className={styles.cartItemWrapper}>
                  <div className={styles.prodInf}>
                    <h4 className={styles.cartItemTitle}>Jupiter</h4>
                    <span className={styles.cartItemSubtitle}>Wayfarer</span>                
                    <div className={styles.prodPrice}><span>$</span><span className={styles.priceNumber}>75</span><span>.00</span></div>
                    <div className={styles.colorButtons}>
                      <button className={styles.sBut}>S</button>
                      <button className={styles.mBut}>M</button>
                    </div>
                  </div>

                  <div className={styles.prodImage}>
                    <div className={styles.countButtons}>
                      <button className={styles.plusBut}>&#43;</button>
                      <span>1</span>
                      <button className={styles.minusBut}>&#8722;</button>
                    </div>
                    <img className={styles.imgProd} src={imgProd2} alt="#"/>
                  </div>
                </div>           
              </li>

                          
            </ul>            
          </div>
        </div>
      </section>     
    );
  } 
}

export default Cart;