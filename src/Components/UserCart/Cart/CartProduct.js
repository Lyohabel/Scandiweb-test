import React from 'react';
// import * as _ from 'lodash';
import {NavLink} from 'react-router-dom'; // eslint-disable-line
import { client, Query} from "@tilework/opus";
import OverallData from '../../../Context';
import * as styles from './CartProduct.module.css'

const COLOR_ = 'Color'

class CartProduct extends React.Component {
  constructor(props) { // eslint-disable-line
    super(props);
    this.state = {
      jsonCart: '',
      productsNumber: '',
      cartProductData: '',
      prices: '',
      gallery: '',
      attributes: '',

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
      productAmount: this.props.savedData.amount
    }   
    
    this.addAttrToCart = this.addAttrToCart.bind(this)
    this.setAttributes = this.setAttributes.bind(this)
  }

  addAttrToCart(attr, value, index) {
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);

    const key = attr.toLowerCase()
    let newAttr = {}
    newAttr[key] = value

    if (jsonCart[index].attrs === "default") {
      jsonCart[index].attrs = [newAttr]
    } else {      
      let x = jsonCart[index].attrs.findIndex(item => JSON.stringify(item).includes(key) === true)
      if(x !== -1) jsonCart[index].attrs.splice(x, 1)
      jsonCart[index].attrs.push(newAttr)      
    }
    window.localStorage.setItem('cart', JSON.stringify(jsonCart));
  }

  changeProductAmountInData(index, amount) {
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);

    jsonCart[index].amount = amount
    
    window.localStorage.setItem('cart', JSON.stringify(jsonCart));
  }

  markAttribute(value, order) {
    this.setState({
      ...this.state,
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

  creatButtons(attrs, btnStyle, order) {
    const attributeName = this.state.cartProductData.attributes[order].id
    const attrName = attributeName.toLowerCase()    
    
    return attrs && attrs.map((item, index, array) =>
      <button id={index} key={item.value}
      className={(btnStyle !== COLOR_) ? 
        ((this.state[`activeAttribute_${order}`] === item.value) ? // ok
        this.state.sizeButton.b : 
        ((this.props.savedData.attrs === "default" && index === 0 && this.state[`defaultActiveAttribute_${order}`] !== order) ? 
        this.state.sizeButton.b : // ok
        ((this.props.savedData.attrs !== "default" && this.props.savedData.attrs[this.findAttrIndex(this.props.savedData.attrs, attrName)] && this.state[`defaultActiveAttribute_${order}`] !== order && this.props.savedData.attrs[this.findAttrIndex(this.props.savedData.attrs, attrName)][`${attrName}`] === item.value)) ? 
        this.state.sizeButton.b :
        (((index === 0 && this.props.savedData.attrs !== "default" && this.state[`defaultActiveAttribute_${order}`] !== order && this.findAttrIndex(this.props.savedData.attrs, attrName) === ''))) ? 
        this.state.sizeButton.b :
        this.state.sizeButton.a))        
        :        
        ((this.state[`activeAttribute_${order}`] === item.value) ? 
        this.state.colorButton.b : 
        ((this.props.savedData.attrs === "default" && index === 0 && this.state[`defaultActiveAttribute_${order}`] !== order) ? 
        this.state.colorButton.b :
        ((this.props.savedData.attrs !== "default" && this.state[`defaultActiveAttribute_${order}`] !== order && this.props.savedData.attrs[this.findAttrIndex(this.props.savedData.attrs, attrName)] && this.props.savedData.attrs[this.findAttrIndex(this.props.savedData.attrs, attrName)][`${attrName}`] === item.value)) ? 
        this.state.colorButton.b :
        (((index === 0 && this.props.savedData.attrs !== "default" && this.state[`defaultActiveAttribute_${order}`] !== order && this.findAttrIndex(this.props.savedData.attrs, attrName) === ''))) ? 
        this.state.colorButton.b :
        this.state.colorButton.a))}
      
      style={btnStyle !== COLOR_ ? {width: `calc(95% / ${array.length})`} : {backgroundColor: item.value, width: `calc(95% / ${array.length})`, color: (item.id === 'Black' || item.id === 'Blue') ? '#fff' : '#1D1F22'}}
      
      onClick={() => {this.markAttribute(item.value, order); this.addAttrToCart(this.props.savedData.attrNames[order], item.value, this.props.id);}}> 
        {btnStyle !== COLOR_ ? item.value : ''}      
      <span className={styles.displayValue}>{attributeName}</span>
      </button>    
    )
  }

  setAttributes(order) { // Почему-то в этом компоненте не рработает ?????????
    if (!this.state.cartProductData.attributes || this.state.cartProductData.attributes.length < order + 1) return ''   
    return (
      <div className={styles.attributeTypeWrapper}>
        {this.createButtons(this.state.cartProductData.attributes[order].items, this.state.cartProductData.attributes[order].id, order)}
      </div> 
    )    
  }

  // returnAttributes(arr) {
  //   return arr && arr.map((item, index) =>
  //     <div key={item.id} className="attrWrapper">  //       
  //       {this.setAttributes(index)}
  //     </div>
  //   )    
  // }  =========================================================

  creatGallery() {
    const gl = this.state.gallery;
    const id = this.state.cartProductData.id    
    
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
        ...this.state,
        imgStatus: newImgStatus,        
      })
    } else if (dir === 'prev'  && this.state.imgStatus > 0) {
        let newImgStatus = this.state.imgStatus - 1
        this.setState({
        ...this.state,
        imgStatus: newImgStatus
        })
      }        
  }

  changeProductAmount(sign) {
    if (sign === 'plus') {
      const newAmount = this.state.productAmount + 1
      this.setState({
        ...this.state,
        productAmount: newAmount
        })
      this.changeProductAmountInData(this.props.id, newAmount) 
    } else if (this.state.productAmount > 0){
          const newAmount = this.state.productAmount - 1
      this.setState({
        ...this.state,
        productAmount: newAmount
        })
      this.changeProductAmountInData(this.props.id, newAmount) 
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
              gallery: result.product.gallery,
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
      <section>
        <span className={styles.cartLine}></span>     
        <div className={styles.cartWrapper}>
          <div className={styles.prodInf}>
            <h4 className={styles.cartItemTitle}>{this.state.cartProductData.brand}</h4>
            <span className={styles.cartItemSubtitle}>{this.state.cartProductData.name}</span>

            <div className={styles.prodPrice}><span className={styles.currencySimbol}>{this.context.currencySimbol}</span><span className={styles.currencyAmount}>{this.state.prices[this.context.currencyNumber]}</span>
            </div>

            <div className={styles.attributesWrapper}>

              {/* {this.setAttributes(0)} */}

              <div className={styles.attributeTypeWrapper}>
                {(this.state.cartProductData.attributes && this.state.cartProductData.attributes[0]) ? this.creatButtons(this.state.cartProductData.attributes[0].items, this.state.cartProductData.attributes[0].id, 0) : ''}
              </div>

              <div className={styles.attributeTypeWrapper}>
                {(this.state.cartProductData.attributes && this.state.cartProductData.attributes[1]) ? this.creatButtons(this.state.cartProductData.attributes[1].items, this.state.cartProductData.attributes[1].id, 1) : ''}
              </div>              

              <div className={styles.attributeTypeWrapper}>
                {(this.state.cartProductData.attributes && this.state.cartProductData.attributes[2]) ? this.creatButtons(this.state.cartProductData.attributes[2].items, this.state.cartProductData.attributes[2].id, 2) : ''}
              </div>
            </div>
          </div>        

          <div className={styles.prodImage}>
            <div className={styles.countButtons}>
              <button onClick={() => this.changeProductAmount('plus')} className={styles.plusBut}>&#43;</button>
                <span>{this.state.productAmount}</span>                    
              <button onClick={() => this.changeProductAmount('minus')} className={styles.minusBut}>&#8722;</button>
            </div>

            <div className={styles.galleryWrapper}>

                {this.creatGallery()}

                <button  onClick={() => this.showAnotherImage('prev')} className={(this.state.gallery.length > 1) ? this.state.sliderDisplayLeft : this.state.imgHidden}></button>
                
                <button onClick={() => this.showAnotherImage('next')} className={(this.state.gallery.length > 1) ? this.state.sliderDisplayRight : this.state.imgHidden}></button>
              </div>
          </div>
          
        </div>
      </section>          
    ); // onClick={() => this.showAnotherImage('prev')} onClick={() => this.showAnotherImage('next')} 
  } 
}      

CartProduct.contextType = OverallData;

export default CartProduct;