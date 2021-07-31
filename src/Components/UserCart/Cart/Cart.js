import React from 'react';
import {NavLink} from 'react-router-dom'; // eslint-disable-line
import { client, Query} from "@tilework/opus";
import OverallData from '../../../Context';
import * as styles from './Cart.module.css'

class Cart extends React.Component {
  constructor(props) { // eslint-disable-line
    super(props);
    this.state = {  
      currentProducts: [],
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
    
    this.creatGallery = this.creatGallery.bind(this)
    this.showAnoterImage = this.showAnotherImage.bind(this)
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
          <NavLink className={styles.prodLink} to={"/product/" + id}> 
            <img className={styles.imgDisplay} src={item} alt="#"/>
          </NavLink>                  
        </li>
          :
            <li key={index} className={styles.galleryItem} style={index === 0 ? {display: 'block'} : {display: 'none'}}>
              <NavLink className={styles.prodLink} to={"/product/" + id}> 
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
  
  componentDidMount() {
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);
    //jsonCart.splice(0,1);

    // this.setState({
    //   ...this.state,      
    //   currentProducts: [],  
    //   jsonCart: jsonCart,
    //   productsNumber: jsonCart.length 
    // })

    let queryArgs = []
    jsonCart.forEach(element => {
      queryArgs.push(element.name)
    })

    
    client.setEndpoint("http://localhost:4000/graphql");

     queryArgs.forEach((element, index) => {
      let queryName = `${element}`;
      queryName = new Query("product", true)
      .addArgument("id", "String!", element)   
      .addFieldList(["id", "name", "inStock", "gallery", "description", "brand", "prices { amount }, attributes {id, name, type, items {displayValue, value, id}}"])

      client.post(queryName).then(result => {
        result = JSON.parse(JSON.stringify(result.product))
        result.prices = result.prices.map(item => item.amount)
        this.setState((prev) => ({
          ...prev, currentProducts: [...prev.currentProducts, result]
      }))
      }
       
      )
  })
}

  render() {

  console.log(this.state.currentProducts)
    return (
      <section className={styles.cart}>                                     
        <div className='container'>
          <div className={styles.cartWrapper}>
            <h3 className={styles.cartTitle}>Cart</h3>
            {/* <button onClick={() => console.log(this.state.cartData[0].name)}>XXXXX</button> */}
            <ul className={styles.productList}>

              {this.state.currentProducts && this.state.currentProducts.length && this.state.currentProducts.map((item, index) => {
                console.log(item)
                return (
                  <li className={styles.cartItem} key={index}>
                  <span className={styles.cartLine}></span>
         
                  <div className={styles.cartItemWrapper}>
                   <div className={styles.prodInf}>
                     <h4 className={styles.cartItemTitle}>{item.brand}</h4>
                     <span className={styles.cartItemSubtitle}>{item.name}</span>
         
                     <div className={styles.prodPrice}><span className={styles.currencySimbol}>{this.context.currencySimbol}</span>
                     <span className={styles.currencyAmount}>{item.prices[this.context.currencyNumber]}</span>
                     </div>
         
                     <div className={styles.attributesWrapper}>
                       {item.attributes && item.attributes.map(item => item.items.map(attr => <>{attr.displayValue} {attr.name}</>))}
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
         
                       {/* {this.creatGalleryList(index)} */}
         
                       {/* <button onClick={() => this.showAnotherImage('prev', item.id)} className={(this.state.galleryLength[index] > 1) ? this.state.sliderDisplayLeft : this.state.imgHidden}></button> */}
                       
                       {/* <button onClick={() => this.showAnotherImage('next', item.id)} className={(this.state.galleryLength[index] > 1) ? this.state.sliderDisplayRight : this.state.imgHidden}></button> */}
                     </div>
                   </div>
                  </div>
               </li>
             
                )
              }
    )}
            </ul>            
          </div>
        </div>
      </section>     
    );
  } 
}

Cart.contextType = OverallData;

export default Cart;