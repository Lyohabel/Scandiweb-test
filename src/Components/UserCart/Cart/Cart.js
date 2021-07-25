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
      productsNumber: '',           
      cartData: [],
      id: '',     
      gallery: '',
      img: '',
      brand: '',
      name: '',
      prices: '',
      instok: '',
      attributes: '',
      description: '',      
      attr_1: '',
      attr_2: '',
      attr_3: '',
      sizeButton: {
        a : styles.size,
        b : styles.sizeActive
      },
      colorButton: {
        a : styles.color,
        b : styles.colorActive
      }
    }
    
    this.createCartList = this.createCartList.bind(this)
	
  }
  createCartList() {        
    return this.state.jsonCart && this.state.jsonCart.map((item, index) =>
      <li className={styles.cartItem} key={index}>
        {item.name}
          <div>{this.state.name[index]}</div>
      </li>
    )
  }


  componentDidMount() {
    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);
    jsonCart.splice(0,1);

    this.setState({
      ...this.state,        
      jsonCart: jsonCart,
      productsNumber: jsonCart.length 
    })

    console.log(this.state.jsonCart)

    let queryArgs = []
    jsonCart.forEach(element => {
      queryArgs.push(element.name)
    })

    const uniqueQueryArgs = Array.from(new Set(queryArgs.map(JSON.stringify))).map(JSON.parse);

    console.log(jsonCart);
    console.log(jsonCart.length);
    console.log(uniqueQueryArgs);
    
    client.setEndpoint("http://localhost:4000/graphql");

    let cartId = [],
        cartGallery = [],
        cartBrand = [],
        cartName = [],
        cartInstock = [],
        cartImg = [],
        cartPrices = [],
        cartAttributes = [],
        cartAttr_1 = [],
        cartAttr_2 = [],
        cartAttr_3 = [],
        cartDescription = []
        

        queryArgs.forEach((element, index) => {
      let queryName = `${element}`
      queryName = new Query("product", true)
      .addArgument("id", "String!", element)   
      .addFieldList(["id", "name", "inStock", "gallery", "description", "brand", "attributes {id, name, type, items {displayValue, value, id}}", "prices {currency,amount }"])

      client.post(queryName).then(result => {
        const id = result.product.id
        const gallery = result.product.gallery
        const brand = result.product.brand
        const name = result.product.name
        const instock = result.product.inStock
        const img = gallery[0]
        const prices = [
          result.product.prices[0].amount,  
          result.product.prices[1].amount,
          result.product.prices[2].amount,
          result.product.prices[3].amount,
          result.product.prices[4].amount
        ]      
        const attributes = result.product.attributes
        const attr_1 = result.product.attributes[0] ? result.product.attributes[0].items : ''
        const attr_2 = result.product.attributes[1] ? result.product.attributes[1].items : ''
        const attr_3 = result.product.attributes[2] ? result.product.attributes[2].items : ''
        const description = result.product.description

        cartId.push(id)
        cartGallery.push(gallery)
        cartBrand.push(brand)
        cartName.push(name)
        cartInstock.push(instock)
        cartImg.push(img)
        cartPrices.push(prices)
        cartAttributes.push(attributes)
        cartAttr_1.push(attr_1)
        cartAttr_2.push(attr_2)
        cartAttr_3.push(attr_3)
        cartDescription.push(description)


        // const itemData = result.product.name
        // newCartData.push(itemData)        

        this.setState({
          ...this.state,          
          id: cartId,
          gallery: cartGallery,
          img: cartImg,
          brand: cartBrand,
          name: cartName,
          instock: cartInstock,
          prices: cartPrices,
          attributes: cartAttributes,
          attr_1: cartAttr_1,
          attr_2: cartAttr_2,
          attr_3: cartAttr_3,
          description: cartDescription    
          });
        //console.log(typeof itemData)
        console.log(this.state)
      })
    })
  } 

  render() {
    return (
      <section className={styles.cart}>                                     
        <div className='container'>
          <div className={styles.cartWrapper}>
            <h3 className={styles.cartTitle}>Cart</h3>
            <button onClick={() => console.log(this.state.cartData[0].name)}>XXXXX</button>
            <ul className={styles.productList}>

              {this.createCartList()}

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
            </ul>            
          </div>
        </div>
      </section>     
    );
  } 
}

export default Cart;