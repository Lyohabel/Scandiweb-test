import React from 'react';
import {NavLink} from 'react-router-dom'; // eslint-disable-line
import { client, Query} from "@tilework/opus";
import imgProd1 from '../../../ImagesTemp/black.png';
//import imgProd2 from '../../../ImagesTemp/glasses.png';
import * as styles from './Cart.module.css'

class Cart extends React.Component {
  constructor(props) { // eslint-disable-line
    super(props);
    this.state = {
      jsonCart: '',            
      cartData: []
    }
    
    this.createCartList = this.createCartList.bind(this)
	
  }
  createCartList() {        
    return this.state.jsonCart && this.state.jsonCart.map((item, index) =>
      <li key={index}>
        {item.name}     
      </li>
    )
  }


  componentDidMount() {
    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);
    jsonCart.splice(0,1);

    this.setState({
      ...this.state,        
      jsonCart: jsonCart 
    })

    console.log(this.state.jsonCart)

    let queryArg = []
    jsonCart.forEach(element => {
      queryArg.push(element.name)
    })

    const uniqueQueryArgs = Array.from(new Set(queryArg.map(JSON.stringify))).map(JSON.parse);

    console.log(jsonCart);
    console.log(uniqueQueryArgs);
    
    client.setEndpoint("http://localhost:4000/graphql");

    uniqueQueryArgs.forEach(element => {
      let queryName = `${element}`
      queryName = new Query("product", true)
      .addArgument("id", "String!", element)   
      .addFieldList(["id", "name", "inStock", "gallery", "description", "brand", "attributes {id, name, type, items {displayValue, value, id}}", "prices {currency,amount }"])

      client.post(queryName).then(result => {
        const itemData = result.product
        let newCartData = this.state.cartData
        newCartData.push(itemData)

        this.setState({
          ...this.state,        
          cartData: newCartData 
        })
        console.log(this.state.cartData)
      })
    })
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
              {this.createCartList()}

              {/* <li className={styles.cartItem}>
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
              </li> */}

                          
            </ul>            
          </div>
        </div>
      </section>     
    );
  } 
}

export default Cart;