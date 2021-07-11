import React from 'react';
import {NavLink} from 'react-router-dom';
import imgProd1 from '../../../ImagesTemp/black.png';
import imgProd2 from '../../../ImagesTemp/glasses.png';
import * as styles from './CartMini.module.css'

class CartMini extends React.Component {
  constructor(props) {
    super(props);
    
    //this.methodeName = this.methodeName.bind(this)
	
  }

  componentDidMount() {

  } 

  render() {
    return (
      <div className={styles.cartMiniWrapper}>                                     
        <div className={styles.cartMini}>
          <div className={styles.cartTitle}>My bag, <span>2</span><span> items</span></div>
          <ul className={styles.productList}>
            <li className={styles.prodItem}>
              <div className={styles.prodInf}>
                <h4>Apollo<br/>Running Short</h4>              
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
            </li>

            <li className={styles.prodItem}>
              <div className={styles.prodInf}>
                <h4>Jupiter<br/>Wayfarer</h4>              
                <div className={styles.prodPrice}><span>$</span><span className={styles.priceNumber}>75</span><span>.00</span></div>
                <div className={styles.colorButtons}>
                  <button className={styles.sBut}>S</button>
                  <button className={styles.mBut}>M</button>
                </div>
              </div>

              <div className={styles.prodImage}>
                <div className={styles.countButtons}>
                  <button className={styles.plusBut}>&#43;</button>
                  <span>2</span>
                  <button className={styles.minusBut}>&#8722;</button>
                </div>
                <img className={styles.imgProd} src={imgProd2} alt="#"/>
              </div>            
            </li>                          
          </ul>

          <div className={styles.prodSumm}>
            <h4>Total</h4>
            <div className={styles.prodSummNumber}><span>$</span><span className={styles.priceNumber}>100</span><span>.00</span></div>
          </div>

          <div className={styles.prodButtons}>
            <button onClick={() => this.props.hideCartMini()} className={styles.viewButton}>
              <NavLink className={styles.cartLink} to="/cart">
                View bag
              </NavLink>              
            </button>
            <button className={styles.checkButton}>Check out</button>
          </div>
        </div>
      </div>     
    );
  } 
}

export default CartMini;