import React from 'react';
import {NavLink} from 'react-router-dom';
import imgProd1 from '../../../ImagesTemp/black.png';
import imgProd2 from '../../../ImagesTemp/bag.png';
import imgProd3 from '../../../ImagesTemp/beige.png';
import imgProd4 from '../../../ImagesTemp/grey.png';
import imgProd5 from '../../../ImagesTemp/white.png'
import * as styles from './Men.module.css'

class Men extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {text: 'default'}

    //this.methodeName = this.methodeName.bind(this)
	
  }

  // createList = () => {
  //   let htmlList = []
  //   htmlList = products.map((product, index) => {
  //     return (
  //       <li key={index} id={index}>
  //         <div>
  //           <NavLink to={"/product/" + index} className="image">
  //             <img src={product.image} alt="#"/>
  //           </NavLink> 
  //           <div className="description">
  //             <h3 className="prod-name">{product.title}</h3>
  //             <span className="prod-inf">{product.category}</span>
  //             <div className="price-and-button">
  //               <span className="prod-price">{product.price} $</span>
  //               <button onClick={addToCart} className="button-add">
  //                 <img src={add} alt="#"/>
  //                 </button>
  //             </div>
  //           </div>
  //         </div>
  //       </li>
  //     )
  //   })

  //   return htmlList.length > 0 ? htmlList : ''    
  // }

  componentDidMount() {

  }

  render() {
    return (
      <section className="men">
          <div className="container">
            <h3 className={styles.title}>Men</h3>
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

export default Men;