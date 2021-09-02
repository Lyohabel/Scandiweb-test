import React from 'react';
import {NavLink} from 'react-router-dom';
import checkForInStock from '../../../Queries/CheckForInStock';
import OverallData from '../../../Context';
import * as styles from './CartProduct.module.css';
import ProductAttrButtons from '../../../Elements/AttrButtons/ProductAttrButtons';

class CartProduct extends React.PureComponent {
  constructor(props) {  
    super(props);
    this.state = {
      jsonCart: '',
      jsonPrices: '',
      gallery: '',
      sliderDisplayLeft: styles.sliderDisplayLeft,
      sliderDisplayRight: styles.sliderDisplayRight,
      imgStatus: 0,
      productAmount: ''
    }
    this.setAttributes = this.setAttributes.bind(this)
  }
  
  setAttributes(order) { 
    if (!this.state.jsonCart.attributes || this.state.jsonCart.attributes.length < order + 1) return ''   
    return (
      <div className={styles.attrButtonsWrapper}>       
        <ProductAttrButtons cartProduct={'yes'} savedState={JSON.parse(JSON.stringify(this.state.jsonCart))} btnStyle={this.state.jsonCart.attributes[order].id} order={order} id={this.props.id} />
      </div>
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

  async changeProductAmount(sign) {
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);
    if (jsonCart.length === 0) return
    const x = jsonCart.findIndex(item => item.uniqueId === this.props.id);
    let productAmount = jsonCart[x].amount

    if (sign === 'plus') {
      const name = this.props.name
      const inStock = await JSON.parse(JSON.stringify((await checkForInStock(name))))

      if (inStock.product.inStock !== true) return ''        
      else {          
        const newAmount = productAmount + 1
        this.setState({
          productAmount: newAmount
        })
        jsonCart[x].amount = newAmount
        window.localStorage.setItem('cart', JSON.stringify(jsonCart));
        this.props.setMiniCartProductChanged('yes')
      } 
      
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
    const product = JSON.parse(JSON.stringify(jsonCart[x]))
    const jsonPrices = JSON.parse(cart)[x].prices
    const gallery = JSON.parse(cart)[x].gallery    
    
    this.setState({
      jsonCart: JSON.parse(JSON.stringify(product)),
      jsonPrices: jsonPrices,
      gallery: gallery,
      productAmount: product.amount
    })       
  }

  render() {
    return (
      <section>
        <span className={styles.cartLine}></span>     
        <div className={styles.cartProdWrapper}>
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