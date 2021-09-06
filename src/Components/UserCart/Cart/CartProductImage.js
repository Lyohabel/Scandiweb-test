import React from 'react';
import checkForInStock from '../../../Queries/CheckForInStock';
import * as styles from './CartProduct.module.css';
import creatGallery from './CartUtils/CreatGallery';

class CartProductImage extends React.PureComponent {
  constructor(props) {  
    super(props);
    this.state = {
      jsonCart: '',      
      gallery: '',
      sliderDisplayLeft: styles.sliderDisplayLeft,
      sliderDisplayRight: styles.sliderDisplayRight,
      imgStatus: 0,
      productAmount: ''
    }
  }

  creatGallery = () => creatGallery.call(this)

  showAnotherImage(dir) {
    const {gallery, imgStatus } = this.state
    
    if (dir === 'next' && imgStatus < gallery.length - 1) {
      const newImgStatus = imgStatus + 1
      this.setState({
        imgStatus: newImgStatus,        
      })
    } else if (dir === 'prev'  && imgStatus > 0) {
        const newImgStatus = imgStatus - 1
        this.setState({
        imgStatus: newImgStatus
        })
      }        
  }
  
  

  async changeProductAmount(sign) {
    const {id, name, setMiniCartProductChanged} = this.props

    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);
    if (jsonCart.length === 0) return
    const x = jsonCart.findIndex(item => item.uniqueId === id);
    let productAmount = jsonCart[x].amount

    if (sign === 'plus') {      
      const inStock = await JSON.parse(JSON.stringify((await checkForInStock(name))))

      if (inStock.product.inStock !== true) return ''        
      else {          
        const newAmount = productAmount + 1
        this.setState({
          productAmount: newAmount
        })
        jsonCart[x].amount = newAmount
        window.localStorage.setItem('cart', JSON.stringify(jsonCart));
        setMiniCartProductChanged('yes')
      } 
      
    } else if (sign === 'minus' && productAmount > 0){
        const newAmount = productAmount - 1
        this.setState({
          productAmount: newAmount
        })
        jsonCart[x].amount = newAmount
        window.localStorage.setItem('cart', JSON.stringify(jsonCart));
        setMiniCartProductChanged('yes') 
      } 
  }
  
  componentDidMount() {    
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');
    const jsonCart = JSON.parse(cart)
    const x = jsonCart.findIndex(item => item.uniqueId === this.props.id);
    const product = JSON.parse(JSON.stringify(jsonCart[x]))   
    const gallery = JSON.parse(cart)[x].gallery    
    
    this.setState({
      jsonCart: JSON.parse(JSON.stringify(product)),      
      gallery: gallery,
      productAmount: product.amount
    })       
  }

  render() {
    const {id} = this.props
    const {productAmount, gallery, sliderDisplayLeft, sliderDisplayRight, imgHidden} = this.state
    return (
      <section>
        <div className={styles.prodImage}>
          <div className={styles.countButtons}>
            <button onClick={() => this.changeProductAmount('plus', id)} className={styles.plusBut}>&#43;</button>
              <span>{productAmount}</span>                    
            <button onClick={() => this.changeProductAmount('minus', id)} className={styles.minusBut}>&#8722;</button>
            </div>

          <div className={styles.galleryWrapper}>

              {this.creatGallery()}

              <button  onClick={() => this.showAnotherImage('prev')} className={(gallery.length > 1) ? sliderDisplayLeft : imgHidden}></button>
                
              <button onClick={() => this.showAnotherImage('next')} className={(gallery.length > 1) ? sliderDisplayRight : imgHidden}></button>
          </div>
        </div>
      </section>          
    );  
  } 
}

export default CartProductImage;