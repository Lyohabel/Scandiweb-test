import React from 'react';
import { client, Query} from "@tilework/opus";
import OverallData from '../../../Context';
import * as styles from './Product.module.css'
import {COLOR} from '../../../CONST';
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      product: '',
      gallery: '',     
      prices: '',
      instok: '',

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
      
      sizeButton: {
        a : styles.size,
        b : styles.sizeActive
      },

      colorButton: {
        a : styles.color,
        b : styles.colorActive
      },

      productAdded: 'no',
      add: styles.add     
    }
  }

  

  resetProduct() {
    this.setState({
      ...this.state,     
      productAdded: 'yes'    
      });
  }

  creatGallery() {
    const gl = this.state.gallery.length;
    if (gl === 1) {
      return ''
    } else {
      return this.state.gallery && this.state.gallery.map(item =>
        <li key={item} className={styles.galleryItem}><img className={styles.imgGalleryItem} src={item} alt="#"/></li>
      )
    }
  }

  markAttribute(value, order) {
    this.setState({
      ...this.state,
      ['defaultActiveAttribute_' + order]: order,    
      ['activeAttribute_' + order]: value
    });
  }

  creatAttributeNameList() {
    if (!this.state.product.attributes[0]) return '';
    let list = [];
    this.state.product.attributes.forEach(item => {
      list.push(item.id);
    });
    return list;
  }

  createButtons(attrs, btnStyle, order) {
    return attrs && attrs.map((item, index, array) =>
      <button id={index} key={item.value} value={item.value} 
      choosed={(this.state[`activeAttribute_${order}`] === item.value) ? "yes" : ((index === 0 && this.state[`defaultActiveAttribute_${order}`] !== order) ? "yes" : "no")}
      onClick={() => {this.markAttribute(item.value, order);
        this.props.changeAttributes(this.creatAttributeNameList()[order], item.value, this.state.prices, this.state.gallery, this.state.product.name, this.state.product.brand)}}

      className={(btnStyle !== COLOR) ? ((this.state[`activeAttribute_${order}`] === item.value) ? this.state.sizeButton.b : ((index === 0 && this.state[`defaultActiveAttribute_${order}`] !== order) ? this.state.sizeButton.b : this.state.sizeButton.a)) : ((this.state[`activeAttribute_${order}`] === item.value) ? this.state.colorButton.b : ((index === 0 && this.state[`defaultActiveAttribute_${order}`] !== order) ? this.state.colorButton.b : this.state.colorButton.a))} 

      style={btnStyle !== COLOR ? {width: `calc(95% / ${array.length})`} : {backgroundColor: item.value, width: `calc(95% / ${array.length})`, color: (item.displayValue === 'Black' || item.displayValue === 'Blue') ? '#fff' : '#1D1F22'}}>
        {btnStyle !== COLOR ? item.value : ''}
        <span className={styles.displayValue}>{item.displayValue}</span>
      </button>
      )
  }

  setAttributes(order) {
    if (this.state.product.attributes.length < order + 1) return ''   
    return (
      <div className={styles.chooseSize}>
        {this.createButtons(this.state.product.attributes[order].items, this.state.product.attributes[order].id, order)}           
      </div> 
    )    
  }

  returnAttributes(arr) {
    return arr && arr.map((item, index) =>
      <div key={item.id} className="attrWrapper">
        <h4 className={styles.sizeTitle}>{this.state.product.attributes[index] ? this.creatAttributeNameList()[index] : ''}</h4>
        {this.setAttributes(index)}
      </div>
    )    
  }

  componentDidMount() {    
    const product = this.props.currentProduct;    

    client.setEndpoint("http://localhost:4000/graphql");

    const query = new Query("product", true)
   .addArgument("id", "String!", product)   
   .addFieldList(["id", "name", "inStock", "gallery", "description", "brand", "attributes {id, name, type, items {displayValue, value, id}}", "prices {amount}"])

    client.post(query).then(result => {      
      
      this.setState({
      ...this.state,
      product: JSON.parse(JSON.stringify(result.product)),
      gallery: result.product.gallery,      
      instock: result.product.inStock,
      prices: result.product.prices.map(item => item.amount)
      });
      console.log(this.state.product)                   
     });     
  }

  componentDidUpdate() {
    if (this.state.productAdded !== 'no') {
      
      const product = this.props.currentProduct;      

      client.setEndpoint("http://localhost:4000/graphql");

      const query = new Query("product", true)
    .addArgument("id", "String!", product)   
    .addFieldList(["id", "name", "inStock", "gallery", "description", "brand", "attributes {id, name, type, items {displayValue, value, id}}", "prices {amount}"])

      client.post(query).then(result => {        

        this.setState({
          ...this.state,
          product: JSON.parse(JSON.stringify(result.product)),
          gallery: result.product.gallery,      
          instock: result.product.inStock,
          prices: result.product.prices.map(item => item.amount),
          productAdded: 'no'
          });
        //console.log(this.state.product.inStock)                                               
      });
    }
  }
 
  componentWillUnmount() {
    this.props.setDefaultAttributes()
  }  

  render() {
    return (
      <section className="Product">
          <div className="container">                       
            <div className={styles.productItem}>
              <ul>
                {this.creatGallery()}
              </ul>              

              <img className={styles.imgProd} src={this.state.gallery[0]} alt="#"/>

              <div className={styles.prodWrapper}>
                <h3 className={styles.title}>{this.state.product.brand}</h3>
                <span className={styles.subtitle}>{this.state.product.name}</span>

                {this.state.product.attributes ? this.returnAttributes(this.state.product.attributes) : ''}                

                <h4 className={styles.priceTitle}>Price:</h4>

                <div className={styles.prodPrice}><span className={styles.currencySimbol}>{this.context.currencySimbol}</span><span className={styles.currencyAmount}>{this.state.prices[this.context.currencyNumber]}</span></div>

                <button onClick={() => {this.props.addToCart(this.state.instock, this.state.product.id, this.creatAttributeNameList(), this.state.prices, this.state.gallery, this.state.product.name, this.state.product.brand); this.props.setCartChanged('yes'); this.resetProduct()}}
                className={(this.state.instock ? styles.add : styles.inStockFalse)}>
                  <span className={styles.out}>Out of stock</span><span className={styles.inStock}>Add to cart</span>
                </button>

                <span id="dis" className={styles.prodDescription} dangerouslySetInnerHTML={{__html: this.state.product.description}}></span>

              </div>              
            </div>              
          </div>
      </section>
    );
  } 
}

Product.contextType = OverallData;

export default Product;