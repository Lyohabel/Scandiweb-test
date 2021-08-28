import React from 'react';
import {NavLink} from 'react-router-dom'; 
import { client, Query} from "@tilework/opus";
import OverallData from '../../../Context';
import * as styles from './CartProduct.module.css'
import {COLOR, DEFAULT} from '../../../CONST';

class CartProduct extends React.PureComponent {
  constructor(props) {  
    super(props);
    this.state = {
      jsonCart: '',
      jsonPrices: '',
      gallery: '',

      activeAttribute_0: '',
      activeAttribute_1: '',
      activeAttribute_2: '',
      activeAttribute_3: '', // fallback unusing property
      activeAttribute_4: '', // fallback unusing property

      defaultActiveAttribute_0: '',
      defaultActiveAttribute_1: '',
      defaultActiveAttribute_2: '',
      defaultActiveAttribute_3: '', // fallback unusing property
      defaultActiveAttribute_4: '', // fallback unusing property

      sliderDisplayLeft: styles.sliderDisplayLeft,
      sliderDisplayRight: styles.sliderDisplayRight,
      imgStatus: 0,

      sizeButton: {
        a : styles.size,
        b : styles.sizeActive
      },

      colorButton: {
        a : styles.color,
        b : styles.colorActive
      },
      productAmount: ''
    }   
    
    this.addAttrToCart = this.addAttrToCart.bind(this)
    this.setAttributes = this.setAttributes.bind(this)
    this.defineButtonClass = this.defineButtonClass.bind(this)
  }

  addAttrToCart(attr, value) {
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);
    const x = jsonCart.findIndex(item => item.uniqueId === this.props.id);    
    const key = attr.toLowerCase()
    let newAttr = {}
    newAttr[key] = value

    if (this.state.jsonCart.attrs === DEFAULT) {
      jsonCart[x].attrs = [newAttr]
    } else {
      let y = jsonCart[x].attrs.findIndex(item => JSON.stringify(item).includes(key) === true)
      if(y !== -1) jsonCart[x].attrs.splice(y, 1)
      jsonCart[x].attrs.push(newAttr)
      }
     window.localStorage.setItem('cart', JSON.stringify(jsonCart));
  }

  markAttribute(value, order) {
    this.setState({
      ['defaultActiveAttribute_' + order]: order,    
      ['activeAttribute_' + order]: value
    });
  } 

  findAttrIndex(arr, name) {
    let ind = ''
    arr.forEach((element, index)=> {
      let y = JSON.stringify(element)
      let x = y.substring(1).split(':')[0]        
      if (x === JSON.stringify(name)) ind = index
    });
    return ind
  }

  defineButtonClass(condition, attrName, order, index, item) {
    switch(true) {  // eslint-disable-line
      case (condition && (this.state[`activeAttribute_${order}`] === item.value)): 
        return (condition !== COLOR ? this.state.sizeButton.b : this.state.colorButton.b);
      case (condition && (this.state.jsonCart.attrs === DEFAULT && index === 0 && this.state[`defaultActiveAttribute_${order}`] !== order)): 
        return (condition !== COLOR ? this.state.sizeButton.b : this.state.colorButton.b);

      case (condition && ((this.state.jsonCart.attrs !== DEFAULT && this.state.jsonCart.attrs[this.findAttrIndex(this.state.jsonCart.attrs, attrName)] && this.state[`defaultActiveAttribute_${order}`] !== order && this.state.jsonCart.attrs[this.findAttrIndex(this.state.jsonCart.attrs, attrName)][`${attrName}`] === item.value))): 
        return (condition !== COLOR ? this.state.sizeButton.b : this.state.colorButton.b);

      case (condition && (((index === 0 && this.state.jsonCart.attrs !== DEFAULT && this.state[`defaultActiveAttribute_${order}`] !== order && this.findAttrIndex(this.state.jsonCart.attrs, attrName) === '')))): 
        return (condition !== COLOR ? this.state.sizeButton.b : this.state.colorButton.b);

        default: 
        return (condition !== COLOR ? this.state.sizeButton.a : this.state.colorButton.a);      
    }
  }
  

  createButtons(attrs, btnStyle, order) {
    const attributeName = this.state.jsonCart.attrNames[order]
    const attrName = attributeName ? attributeName.toLowerCase() : ''   
    
    return attrs && attrs.map((item, index, array) =>
      <button id={index} key={item.value}
      className={this.defineButtonClass(btnStyle, attrName, order, index, item)        
      }
      
      style={btnStyle !== COLOR ? {width: `calc(95% / ${array.length})`} : {backgroundColor: item.value, width: `calc(95% / ${array.length})`, color: (item.id === 'Black' || item.id === 'Blue') ? '#fff' : '#1D1F22'}}
      
      onClick={() => {this.markAttribute(item.value, order); this.addAttrToCart(this.state.jsonCart.attrNames[order], item.value, );}}> 
        {btnStyle !== COLOR ? item.value : ''}      
      <span className={styles.displayValue}>{attributeName}</span>
      </button>    
    )
  }

  setAttributes(order) { 
    if (!this.state.jsonCart.attributes || this.state.jsonCart.attributes.length < order + 1) return ''   
    return (      
        this.createButtons(this.state.jsonCart.attributes[order].items, this.state.jsonCart.attributes[order].id, order)      
    )    
  }

  returnAttributes(arr) {
    return arr && arr.map((item, index) =>
      <div key={item.id} className={styles.attributeTypeWrapper}>       
        {this.setAttributes(index)}
      </div>
    )    
  } 

  creatGallery() {
    const gl = this.state.jsonCart.gallery;
    const id = this.state.jsonCart.name    
    
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
            style={(index === this.state.imgStatus) ? {display: 'block'} : {display: 'none'}}>
              <NavLink onClick={() => this.props.setCurrentProduct(id)} className={styles.prodLink} to={"/product/" + id}> 
                <img className={styles.imgDisplay} src={item} alt="#"/>
              </NavLink>                  
            </li>
    ) 
  }

  showAnotherImage(dir) { 
    if (dir === 'next' && this.state.imgStatus < this.state.gallery.length - 1) {
      let newImgStatus = this.state.imgStatus + 1
      this.setState({
        imgStatus: newImgStatus,        
      })
    } else if (dir === 'prev'  && this.state.imgStatus > 0) {
        let newImgStatus = this.state.imgStatus - 1
        this.setState({
        imgStatus: newImgStatus
        })
      }        
  }

  changeProductAmount(sign) {
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);
    if (jsonCart.length === 0) return
    const x = jsonCart.findIndex(item => item.uniqueId === this.props.id);
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
  
  componentDidMount() {
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');
    const jsonCart = JSON.parse(cart)
    let x = jsonCart.findIndex(item => item.uniqueId === this.props.id);
    const product = jsonCart[x]
    const jsonPrices = JSON.parse(cart)[x].prices
    const gallery = JSON.parse(cart)[x].gallery
    
    const name = this.props.name

    client.setEndpoint("http://localhost:4000/graphql");

    const queryInStock = new Query("product", true) // checking for inStock  
      .addArgument("id", "String!", name)   
      .addField("inStock")

    client.post(queryInStock).then(result => {
      if (result.product.inStock !== true) return ''
        else {
          this.setState({
            jsonCart: JSON.parse(JSON.stringify(product)),
            jsonPrices: jsonPrices,
            gallery: gallery,
            productAmount: product.amount
          })
        }
    })
  }

  render() {
    return (
      <section>
        <span className={styles.cartLine}></span>     
        <div className={styles.cartWrapper}>
          <div className={styles.prodInf}>
            <div className={styles.prodInfWrapper}>
              <h4 className={styles.cartItemTitle}>{this.state.jsonCart.brand}</h4>
              <span className={styles.cartItemSubtitle}>{this.state.jsonCart.prodName}</span>

              <div className={styles.prodPrice}><span className={styles.currencySimbol}>{this.context.currencySimbol}</span><span className={styles.currencyAmount}>{this.state.jsonPrices[this.context.currencyNumber]}</span>
              </div>
            </div>

            <div className={styles.attributesWrapper}>

            {this.state.jsonCart.attributes ? this.returnAttributes(this.state.jsonCart.attributes) : ''}
            </div>
          </div>        

          <div className={styles.prodImage}>
            <div className={styles.countButtons}>
              <button onClick={() => this.changeProductAmount('plus', this.props.id)} className={styles.plusBut}>&#43;</button>
                <span>{this.state.productAmount}</span>                    
              <button onClick={() => this.changeProductAmount('minus', this.props.id)} className={styles.minusBut}>&#8722;</button>
            </div>

            <div className={styles.galleryWrapper}>

                {this.creatGallery()}

                <button  onClick={() => this.showAnotherImage('prev')} className={(this.state.gallery.length > 1) ? this.state.sliderDisplayLeft : this.state.imgHidden}></button>
                
                <button onClick={() => this.showAnotherImage('next')} className={(this.state.gallery.length > 1) ? this.state.sliderDisplayRight : this.state.imgHidden}></button>
              </div>
          </div>
          
        </div>
      </section>          
    );  
  } 
}      

CartProduct.contextType = OverallData;

export default CartProduct;