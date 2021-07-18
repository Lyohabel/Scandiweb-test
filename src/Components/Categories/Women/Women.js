import React from 'react';
import {NavLink} from 'react-router-dom';
import imgProd1 from '../../../ImagesTemp/black.png';
import imgProd2 from '../../../ImagesTemp/bag.png';
import imgProd3 from '../../../ImagesTemp/beige.png';
import imgProd4 from '../../../ImagesTemp/grey.png';
import imgProd5 from '../../../ImagesTemp/white.png'
import * as styles from './Women.module.css'

class Women extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {text: 'default'}

    //this.methodeName = this.methodeName.bind(this)
	
  }

  componentDidMount() {

  }

  render() {
    return (
      <section className="men">
          <div className="container">
            <h3 className={styles.title}>Women</h3>
            <ul className={styles.products}>
              <li className={styles.productItem}>
                <NavLink className={styles.prodLink} to="/product">
                  <img className={styles.imgProd} src={imgProd1} alt="#"/>
                </NavLink>
               
                <span className={styles.prodName}>Apollo Running Short</span>
                <div className={styles.prodPrice}><span>$</span><span className={styles.priceNumber}>50</span><span>.00</span></div>
              </li>
              <li className={styles.productItem}>               
                <img className={styles.imgProd} src={imgProd2} alt="#"/>                               
                <span className={styles.prodName}>Apollo Running Short</span>
                <div className={styles.prodPrice}><span>$</span><span className={styles.priceNumber}>50</span><span>.00</span></div>
              </li>
              <li className={styles.productItem}>
                <img className={styles.imgProd} src={imgProd3} alt="#"/>
                <span className={styles.prodName}>Apollo Running Short</span>
                <div className={styles.prodPrice}><span>$</span><span className={styles.priceNumber}>50</span><span>.00</span></div>
              </li>
              <li className={styles.productItem}>
                <img className={styles.imgProd} src={imgProd4} alt="#"/>
                <span className={styles.prodName}>Apollo Running Short</span>
                <div className={styles.prodPrice}><span>$</span><span className={styles.priceNumber}>50</span><span>.00</span></div>
              </li>
              <li className={styles.productItem}>
                <img className={styles.imgProd} src={imgProd1} alt="#"/>
                <span className={styles.prodName}>Apollo Running Short</span>
                <div className={styles.prodPrice}><span>$</span><span className={styles.priceNumber}>50</span><span>.00</span></div>
              </li>
              <li className={styles.productItem}>
                <img className={styles.imgProd} src={imgProd5} alt="#"/>
                <span className={styles.prodName}>Apollo Running Short</span>
                <div className={styles.prodPrice}><span>$</span><span className={styles.priceNumber}>50</span><span>.00</span></div>
              </li>
            </ul>
          </div>
      </section>
    );
  } 
}

export default Women;