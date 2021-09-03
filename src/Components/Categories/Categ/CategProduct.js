import React from 'react';
import {NavLink} from 'react-router-dom';
import OverallData from '../../../Context';
import * as styles from './Categ.module.css';
import signIn from '../../../Utils/SignIn';
import creatAttributeOrdersList from '../../../Utils/CreatAttributeOrdersList';
import creatAttributeNameList from '../../../Utils/CreatAttributeNameList';

class CategProduct extends React.PureComponent {
  constructor(props) { // eslint-disable-line
    super(props);   
  }
  
  signIn = () => signIn.call(this)

  creatAttributeNameList = (arg) => creatAttributeNameList.call(this, arg)
  
  creatAttributeOrdersList = (arg) => creatAttributeOrdersList.call(this, arg)  

  render() {
    return (
      <section className={styles.categProduct}>
        <NavLink className={styles.prodLink} to={"/product/" + this.props.id}> 
          <img onClick={() => this.props.setCurrentProduct(this.props.id)} className={styles.imgProd} src={this.props.gallery[0] || this.props.gallery} alt="#"/>
        </NavLink>

        <div className={styles.prodInf}>
          <h3 className={styles.prodTitle}>{this.props.item.brand} <span className={styles.subtitle}>{this.props.item.name}</span></h3>
       
          <div className={styles.prodPrice}>
            <span>{this.context.currencySimbol}</span><span className={styles.priceNumber}>{this.props.prices[this.context.currencyNumber].amount}</span>
          </div>
        </div>

        <div className={styles.prodAddWrapper}>
        <button onClick={() => {
          this.props.addToCart(this.props.item.inStock, this.props.id, this.creatAttributeNameList(this.props.currentCategoryData.attributes), this.creatAttributeOrdersList(this.props.currentCategoryData.attributes), this.props.attributes, (this.props.attributes[0] ? this.props.attributes[0].items : ''), this.props.prices.map(item => item.amount), this.props.gallery, this.props.item.name, this.props.item.brand);
        }}
        className={(this.props.item.inStock ? styles.prodAdd : styles.inStockFalse)}><span className={styles.cartIcon}><span className={styles.redLine}></span></span></button>

        <button className={styles.prodSignIn} onClick={() => this.signIn()} style={this.props.displaySignIn === 'yes' ? {display: 'block'} : {display: 'none'}}>Press to sign in</button>
        </div>
      </section>
    );
  } 
}

CategProduct.contextType = OverallData;

export default CategProduct;