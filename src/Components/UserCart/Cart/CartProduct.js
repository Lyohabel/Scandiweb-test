import React from 'react';
// import * as _ from 'lodash';
import {NavLink} from 'react-router-dom'; // eslint-disable-line
import { client, Query} from "@tilework/opus";
import OverallData from '../../../Context';
import * as styles from './CartProduct.module.css'

class CartProduct extends React.Component {
  constructor(props) { // eslint-disable-line
    super(props);
    this.state = {
      jsonCart: '',
      productsNumber: '',
      cartProductData: '',
      prices: '',
      gallery: '',
      sliderDisplayLeft: styles.sliderDisplayLeft,
      sliderDisplayRight: styles.sliderDisplayRight,
      imgStatus: 0
    }   
    
    // this.creatGallery = this.creatGallery.bind(this)
    // this.showAnoterImage = this.showAnotherImage.bind(this)
  }

  // markAttribute(value, order) {
  //   this.setState({
  //     ...this.state,
  //     ['defaultActiveAttribute_' + order]: order,    
  //     ['activeAttribute_' + order]: value
  //   });
  // } ===============================================================================

  // createButtons(attrs, btnStyle, order) {
  //   return attrs && attrs.map((item, index, array) =>
  //     <button id={index} key={item.value} value={item.value} 
  //     choosed={(this.state[`activeAttribute_${order}`] === item.value) ? "yes" : ((index === 0 && this.state[`defaultActiveAttribute_${order}`] !== order) ? "yes" : "no")}
  //     onClick={() => {this.markAttribute(item.value, order); 
  //       this.addAttrToCart(this.state.product.id, this.creatAttributeNameList()[order], index); 
  //       this.props.changeAttributes(this.creatAttributeNameList()[order], item.value)}}

  //     className={(btnStyle !== COLOR) ? ((this.state[`activeAttribute_${order}`] === item.value) ? this.state.sizeButton.b : ((index === 0 && this.state[`defaultActiveAttribute_${order}`] !== order) ? this.state.sizeButton.b : this.state.sizeButton.a)) : ((this.state[`activeAttribute_${order}`] === item.value) ? this.state.colorButton.b : ((index === 0 && this.state[`defaultActiveAttribute_${order}`] !== order) ? this.state.colorButton.b : this.state.colorButton.a))} 

  //     style={btnStyle !== COLOR ? {width: `calc(95% / ${array.length})`} : {backgroundColor: item.value, width: `calc(95% / ${array.length})`, color: (item.displayValue === 'Black' || item.displayValue === 'Blue') ? '#fff' : '#1D1F22'}}>
  //       {btnStyle !== COLOR ? item.value : ''}
  //       <span className={styles.displayValue}>{item.displayValue}</span>
  //     </button>
  //     )
  // } =================================================================================

  // setAttributes(order) {
  //   if (this.state.product.attributes.length < order + 1) return ''
  //   if (this.state.product.attributes[order].id !== COLOR) {
  //     return (
  //       <div className={styles.chooseSize}>
  //         {this.createButtons(this.state.attributes[`${order}`].items, '', order)}           
  //       </div> 
  //     )
  //   } else {
  //       return (
  //         <div className={styles.chooseSize}>
  //           {this.createButtons(this.state.attributes[`${order}`].items, COLOR, order)}           
  //         </div> 
  //       )
  //     }    
  // } =======================================================

  // returnAttributes(arr) {
  //   return arr && arr.map((item, index) =>
  //     <div key={item.id} className="attrWrapper">
  //       <h4 className={styles.sizeTitle}>{this.state.product.attributes[index] ? this.creatAttributeNameList()[index] : ''}</h4>
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
            .addFieldList(["id", "name", "gallery", "description", "brand", "attributes {id, name, type, items {displayValue, value, id}}", "prices {amount}"])

          client.post(queryName).then(result => {
            this.setState({
              ...this.state,        
              cartProductData: JSON.parse(JSON.stringify(result.product)),
              prices: result.product.prices.map(item => item.amount),
              gallery: result.product.gallery
            })  
            //console.log(this.state.gallery)
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
            {/* {this.state.product.attributes ? this.returnAttributes(this.state.product.attributes) : ''} */}
              <div className={styles.attributeTypeWrapper}>
                <button onClick={() => this.findChoosedAttributes()} className={styles.attrBut}>S</button>
                <button className={styles.attrBut}>M</button>
              </div>
            </div>
          </div>        

          <div className={styles.prodImage}>
            <div className={styles.countButtons}>
              <button className={styles.plusBut}>&#43;</button>
                <span>{this.props.savedData.amount}</span>                    
              <button className={styles.minusBut}>&#8722;</button>
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