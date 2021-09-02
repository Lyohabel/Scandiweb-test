import React from 'react';
import {NavLink} from 'react-router-dom';
import OverallData from '../../../Context';
import * as styles from './Categ.module.css';

class CategProduct extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {   
      currentCategoryData: ''
    }        
    this.signIn = this.signIn.bind(this)     
  }  

  signIn() {
    document.cookie = 'login=user;'
    this.props.setDisplaySignIn('no')
  }
  
  creatAttributeNameList(index) {
    if (!this.state.currentCategoryData[index].attributes[0])  return '';
    let list = [];

    this.state.currentCategoryData[index].attributes.forEach(item => {
      list.push(item.id);
    }); 
      
    return list;
  }  

  render() {
    return (
      <section className={styles.categProduct}>
        {/* <NavLink className={styles.prodLink} to={"/product/" + item.id}> 
          <img onClick={() => this.props.setCurrentProduct(item.id)} className={styles.imgProd} src={item.gallery[0] || item.gallery} alt="#"/>
        </NavLink>

        <div className={styles.prodInf}>
          <h3 className={styles.prodTitle}>{item.brand} <span className={styles.subtitle}>{item.name}</span></h3>
       
          <div className={styles.prodPrice}>
            <span>{this.context.currencySimbol}</span><span className={styles.priceNumber}>{item.prices[this.context.currencyNumber].amount}</span>
          </div>
        </div>

        <div className={styles.prodAddWrapper}>
        <button onClick={() => {
          this.props.addToCart(item.inStock, item.id, this.creatAttributeNameList(index), this.creatAttributeOrdersList(index), item.attributes, (item.attributes[0] ? item.attributes[0].items : ''), item.prices.map(item => item.amount), item.gallery, item.name, item.brand);
        }}
        className={(item.inStock ? styles.prodAdd : styles.inStockFalse)}><span className={styles.cartIcon}><span className={styles.redLine}></span></span></button>

        <button className={styles.prodSignIn} onClick={() => this.signIn()} style={this.props.displaySignIn === 'yes' ? {display: 'block'} : {display: 'none'}}>Press to sign in</button>
        </div> */}
      </section>
    );
  } 
}

CategProduct.contextType = OverallData;

export default CategProduct;