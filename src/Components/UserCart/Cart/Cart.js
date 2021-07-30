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
      attributes: '',
      description: '',

      attr_1Id: '',
      attr_2Id: '',
      attr_3Id: '',

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
      },
      sliderDisplayLeft: styles.sliderDisplayLeft,
      sliderDisplayRight: styles.sliderDisplayRight,
      imgDisplay: styles.imgDisplay,
      imgHidden: styles.imgHidden,
      imgStatus: '',
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
            <li key={index} className={styles.galleryItem} style={index === 0 ? {display: 'block'} : {display: 'none'}}>
              <NavLink onClick={() => this.props.setCurrentProduct(id)} className={styles.prodLink} to={"/product/" + id}> 
                <img className={styles.imgDisplay} src={item} alt="#"/>
              </NavLink>                  
            </li>
    )
  }

  // setIndicator(index, array, id) { ДОДЕЛАТЬ СЛАЙДЕР!!!
  //   array.forEach

  //   //if (index === 0 && )

  //   //this.state.imgStatus === index && this.state.galleryId === id

  // } style={(this.setIndicator(index, array, id)) ? {display: 'block'} : {display: 'none'}}

  showAnotherImage(dir, id) { // ДОДЕЛАТЬ СЛАЙДЕР!!!
      if (dir === 'next') {
        let newImgStatus = this.state.imgStatus + 1
        this.setState({
          ...this.state,
          imgStatus: newImgStatus,
          galleryId: id
        })
      }
       else if (dir === 'prev') {
        let newImgStatus = this.state.imgStatus - 1
        this.setState({
          ...this.state,
          imgStatus: newImgStatus,
          galleryId: id
        })
        }
  }

  creatChoosedAttributes() {
    return this.state.attr_1 && this.state.attr_1.map((item, index, array) =>
      <div key={index}>
        <button className={styles.attrBut}>{item[0][0].value}</button>
        <button className={styles.attrBut}>{item[0][1]}.value</button>
      </div>
    
    )
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
                <button className={styles.attrBut}>S</button>
                <button className={styles.attrBut}>M</button>
              </div>

              <div className={styles.attributeTypeWrapper}>
                <button className={styles.attrBut}>S</button>
                <button className={styles.attrBut}>M</button>
              </div>             
            </div>          

            {/* <div className={styles.colorButtons}>
              <button className={styles.sBut}>S</button>
              <button className={styles.mBut}>M</button>
            </div>             */}
          </div>

          <div className={styles.prodImage}>
            <div className={styles.countButtons}>
              <button className={styles.plusBut}>&#43;</button>
                <span>1</span>                    
              <button className={styles.minusBut}>&#8722;</button>
            </div>

            <div className={styles.galleryWrapper}>

              {this.creatGalleryList(index)}

              <button onClick={() => this.showAnotherImage('prev', item.id)} className={(this.state.galleryLength[index] > 1) ? this.state.sliderDisplayLeft : this.state.imgHidden}></button>
              
              <button onClick={() => this.showAnotherImage('next', item.id)} className={(this.state.galleryLength[index] > 1) ? this.state.sliderDisplayRight : this.state.imgHidden}></button>
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
    //jsonCart.splice(0,1);

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
        cartPrices = [],
        cartAttributes = [],

        cartAttr_1Id = [],
        cartAttr_2Id = [],
        cartAttr_3Id = [],

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
        const attributes = result.product.attributes

        const attr_1Id = result.product.attributes[0] ? result.product.attributes[0].id : ''
        const attr_2Id = result.product.attributes[1] ? result.product.attributes[1].id : ''
        const attr_3Id = result.product.attributes[2] ? result.product.attributes[2].id : ''

        const attr_1 = result.product.attributes[0] ? result.product.attributes[0].items[0].value : ''
        const attr_2 = result.product.attributes[1] ? result.product.attributes[1].items[0].value : ''
        const attr_3 = result.product.attributes[2] ? result.product.attributes[2].items[0].value : ''

        const description = result.product.description

        cartId.push(id)
        cartGallery.push(gallery)
        cartGalleryLength.push(galleryLength)
        cartBrand.push(brand)
        cartName.push(name)
        cartInstock.push(instock)
        cartImg.push(img)
        cartPrices.push(prices)
        cartAttributes.push(attributes)

        cartAttr_1Id.push(attr_1Id)
        cartAttr_2Id.push(attr_2Id)
        cartAttr_3Id.push(attr_3Id)

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
          galleryLength: cartGalleryLength,
          img: cartImg,
          brand: cartBrand,
          name: cartName,
          instock: cartInstock,
          prices: cartPrices,
          attributes: Array.from(cartAttributes),

          attr_1Id: cartAttr_1Id,
          attr_2Id: cartAttr_2Id,
          attr_3Id: cartAttr_3Id,

          attr_1: cartAttr_1,
          attr_2: cartAttr_2,
          attr_3: cartAttr_3,

          description: cartDescription    
          });
        //console.log(typeof itemData)
        //console.log(this.state.prices)

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

        // **********************************************************************************************************************************
        let newAttr_1_1 = [] // eslint-disable-line
        let newAttr_1_2 = [] // eslint-disable-line
        let newAttr_1_3 = [] // eslint-disable-line    
    
        // if (this.state.attr_1[3]) this.state.attr_1[3].map(item => { // eslint-disable-line
        //   let x = JSON.stringify(item).split('"value":"')[1]
        //   let y = JSON.stringify(x).split('"')[1]
        //   const nA0 = y.slice(0, y.length - 1)
        //   newAttr_1_1.push(nA0) 
        // })

        // if (this.state.attr_2[3]) this.state.attr_2[3].map(item => { // eslint-disable-line
        //   let x = JSON.stringify(item).split('"value":"')[1]
        //   let y = JSON.stringify(x).split('"')[1]
        //   const nA1 = y.slice(0, y.length - 1)
        //   newAttr_1_2.push(nA1) 
        // })

        // if (this.state.attr_3[3]) this.state.attr_3[3].map(item => { // eslint-disable-line
        //   let x = JSON.stringify(item).split('"value":"')[1]
        //   let y = JSON.stringify(x).split('"')[1]
        //   const nA2 = y.slice(0, y.length - 1)
        //   newAttr_1_3.push(nA2) 
        // })

        //console.log(JSON.stringify(this.state.attr_1[0]))
        // console.log(this.state.attr_1)
        // console.log(newAttr_1_1)
        // console.log(newAttr_1_2)
        // console.log(newAttr_1_3)
        //console.log(newAttr_1_2)
        // console.log(this.state.attributes)
        // console.log(this.state.attributes[0])
        console.log(this.state.attr_1Id, this.state.attr_1)
        // console.log(this.state.attr_1)
        // console.log(this.state.jsonCart)
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