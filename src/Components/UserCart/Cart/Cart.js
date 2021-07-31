import React from 'react';
import {NavLink} from 'react-router-dom'; // eslint-disable-line
import { client, Query} from "@tilework/opus";
import OverallData from '../../../Context';
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
      galleryLength: '',
      galleryIndicator: '',      
      img: '',
      brand: '',
      name: '',
      prices: '',

      price_0: '',
      price_1: '',
      price_2: '',
      price_3: '',
      price_4: '',

      instok: '',      

      sizeButton: {
        a : styles.size,
        b : styles.sizeActive
      },
      colorButton: {
        a : styles.color,
        b : styles.colorActive
      },
      sliderDisplayLeft: styles.sliderDisplayLeft,
      sliderDisplayRight: styles.sliderDisplayRight,
      imgDisplay: styles.imgDisplay,
      imgHidden: styles.imgHidden,
      imgStatus: 0,
      galleryId: ''
    }
    
    this.createCartList = this.createCartList.bind(this)
    this.selectCurrency = this.selectCurrency.bind(this)
    this.creatGallery = this.creatGallery.bind(this)
    this.showAnoterImage = this.showAnotherImage.bind(this)
  }  

  selectCurrency(index) {
    return this.state[`price_${this.context.currencyNumber}`][index]    
  }

  creatGalleryList(index) {    
    return (
      <ul id={this.state.id[index]} className={styles.gallery}>              
                {this.creatGallery(index)}              
      </ul>
    )

  }

  creatGallery(index) {
    const gl = this.state.gallery[index];
    const id = this.state.id[index]
    
    return gl && gl.map((item, index, array) =>
      (array.length === 1)
       ?     
        <li key={index} className={styles.galleryItem} style={{display: 'block'}}>
          <NavLink onClick={() => this.props.setCurrentProduct(id)} className={styles.prodLink} to={"/product/" + id}> 
            <img className={styles.imgDisplay} src={item} alt="#"/>
          </NavLink>                  
        </li>
          :
            <li key={index} className={styles.galleryItem}
            style={(this.state.galleryId === id) ? ((index === 0) ? {display: 'block'} : {display: 'none'}) : ((this.state.imgStatus === index) ? {display: 'block'} : {display: 'none'})}>
              <NavLink onClick={() => this.props.setCurrentProduct(id)} className={styles.prodLink} to={"/product/" + id}> 
                <img className={styles.imgDisplay} src={item} alt="#"/>
              </NavLink>                  
            </li>
    ) // && this.state.galleryId === id
  }

  // setIndicator(index) {
  //   this.setState({
  //     ...this.state,
  //     galleryIndicator: index
  //   })

  // }
    
  showAnotherImage(dir, id, index) { // ДОДЕЛАТЬ СЛАЙДЕР!!!
      if (dir === 'next' && this.state.imgStatus < this.state.galleryLength[index] - 1) {
        let newImgStatus = this.state.imgStatus + 1
        this.setState({
          ...this.state,
          imgStatus: newImgStatus,
          galleryId: id
        })
      }
       else if (dir === 'prev'  && this.state.imgStatus > 0) {
        let newImgStatus = this.state.imgStatus - 1
        this.setState({
          ...this.state,
          imgStatus: newImgStatus,
          galleryId: id
        })
        }
        console.log(id)
        console.log(this.state.galleryId)
        console.log(this.state.imgStatus)
  }

  

 
    
  createCartList() {        
    return this.state.jsonCart && this.state.jsonCart.map((item, index) =>
      <li className={styles.cartItem} key={index}>
         <span className={styles.cartLine}></span>

         <div className={styles.cartItemWrapper}>
          <div className={styles.prodInf}>
            <h4 className={styles.cartItemTitle}>{this.state.brand[index]}</h4>
            <span className={styles.cartItemSubtitle}>{this.state.name[index]}</span>

            <div className={styles.prodPrice}><span className={styles.currencySimbol}>{this.context.currencySimbol}</span><span className={styles.currencyAmount}>{this.selectCurrency(index)}</span>
            </div>

            <div className={styles.attributesWrapper}>
              {/* <div className={styles.attributeTypeWrapper}>
                <button className={styles.attrBut}>S</button>
                <button className={styles.attrBut}>M</button>
              </div> */}

              {/* {this.creatChoosedAttributes()} */}

              <div className={styles.attributeTypeWrapper}>
                <button onClick={() => this.findChoosedAttributes()} className={styles.attrBut}>S</button>
                <button className={styles.attrBut}>M</button>
              </div>

              <div className={styles.attributeTypeWrapper}>
                <button className={styles.attrBut}>S</button>
                <button className={styles.attrBut}>M</button>
              </div>             
            </div>
          </div>

          <div className={styles.prodImage}>
            <div className={styles.countButtons}>
              <button className={styles.plusBut}>&#43;</button>
                <span>1</span>                    
              <button className={styles.minusBut}>&#8722;</button>
            </div>

            <div className={styles.galleryWrapper}>

              {this.creatGalleryList(index)}

              <button onClick={() => this.showAnotherImage('prev', item.id, index)} className={(this.state.galleryLength[index] > 1) ? this.state.sliderDisplayLeft : this.state.imgHidden}></button>
              
              <button onClick={() => this.showAnotherImage('next', item.id, index)} className={(this.state.galleryLength[index] > 1) ? this.state.sliderDisplayRight : this.state.imgHidden}></button>
            </div>
          </div>
         </div>
      </li>
    )
  }
  
  componentDidMount() {
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);
    console.log(jsonCart[0].attrNames[0])    

    this.setState({
      ...this.state,        
      jsonCart: jsonCart,
      productsNumber: jsonCart.length 
    })

    let queryArgs = []
    jsonCart.forEach(element => {
      queryArgs.push(element.name)
    })
    
    client.setEndpoint("http://localhost:4000/graphql");

    let cartId = [],
        cartGallery = [],
        cartGalleryLength = [],
        cartBrand = [],
        cartName = [],
        cartInstock = [],
        cartImg = [],
        cartPrices = []             

        queryArgs.forEach((element, index) => {
      let queryName = `${element}`
      queryName = new Query("product", true)
      .addArgument("id", "String!", element)   
      .addFieldList(["id", "name", "inStock", "gallery", "description", "brand", "attributes {id, name, type, items {displayValue, value, id}}", "prices {currency,amount }"])

      client.post(queryName).then(result => {
        const id = result.product.id
        const gallery = result.product.gallery
        const galleryLength = result.product.gallery.length
        const brand = result.product.brand
        const name = result.product.name
        const instock = result.product.inStock
        const img = gallery[0]
        const prices = [
          result.product.prices[0],
          result.product.prices[1],
          result.product.prices[2],
          result.product.prices[3],
          result.product.prices[4]
        ]

        cartId.push(id)
        cartGallery.push(gallery)
        cartGalleryLength.push(galleryLength)
        cartBrand.push(brand)
        cartName.push(name)
        cartInstock.push(instock)
        cartImg.push(img)
        cartPrices.push(prices)
        
        this.setState({
          ...this.state,          
          id: cartId,
          gallery: cartGallery,
          galleryLength: cartGalleryLength,
          img: cartImg,
          brand: cartBrand,
          name: cartName,
          instock: cartInstock,
          prices: cartPrices             
          });
        
        let newPrice_0 = []
        let newPrice_1 = []
        let newPrice_2 = []
        let newPrice_3 = []
        let newPrice_4 = []
    
        this.state.prices.map(item => { // eslint-disable-line
          let price0 = JSON.stringify(item[0]).split(':')[2]
          const price_0 = price0.slice(0, price0.length - 1);

          let price1 = JSON.stringify(item[1]).split(':')[2]
          const price_1 = price1.slice(0, price1.length - 1);

          let price2 = JSON.stringify(item[2]).split(':')[2]
          const price_2 = price2.slice(0, price2.length - 1);

          let price3 = JSON.stringify(item[3]).split(':')[2]
          const price_3 = price3.slice(0, price3.length - 1);

          let price4 = JSON.stringify(item[4]).split(':')[2]
          const price_4 = price4.slice(0, price4.length - 1);
          
          
          newPrice_0.push(price_0)
          newPrice_1.push(price_1)
          newPrice_2.push(price_2)
          newPrice_3.push(price_3)
          newPrice_4.push(price_4)
    
          this.setState({
            ...this.state,
            price_0: newPrice_0,
            price_1: newPrice_1,
            price_2: newPrice_2,
            price_3: newPrice_3,
            price_4: newPrice_4
          })              
        })
      })
    })
  }

  render() {
    return (
      <section className={styles.cart}>                                     
        <div className='container'>
          <div className={styles.cartWrapper}>
            <h3 className={styles.cartTitle}>Cart</h3>
            {/* <button onClick={() => console.log(this.state.cartData[0].name)}>XXXXX</button> */}
            <ul className={styles.productList}>

              {this.createCartList()}
              
            </ul>            
          </div>
        </div>
      </section>     
    );
  } 
}

Cart.contextType = OverallData;

export default Cart;