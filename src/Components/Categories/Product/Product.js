import React from 'react';
import { client, Query} from "@tilework/opus";
import OverallData from '../../../Context';
import * as styles from './Product.module.css'

const COLOR = 'color'
const COLOR_C = 'Color'

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      product: '',
      gallery: '',
      img: '',
      brand: '',
      name: '',
      prices: '',
      instok: '',
      attributes: '',
      description: '',

      attr_1: '',
      attr_2: '',
      attr_3: '',

      attr_1Id: '',
      attr_2Id: '',
      attr_3Id: '',

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

  componentDidMount() {
    const id = window.location.href.split('/')[4];

    client.setEndpoint("http://localhost:4000/graphql");

    const query = new Query("product", true)
   .addArgument("id", "String!", id)   
   .addFieldList(["id", "name", "inStock", "gallery", "description", "brand", "attributes {id, name, type, items {displayValue, value, id}}", "prices {currency,amount }"])

    client.post(query).then(result => {
      const product = result.product
      const id = result.product.id
      const gallery = result.product.gallery
      const brand = result.product.brand
      const name = result.product.name
      const instock = result.product.inStock
      const img = gallery[0]

      const prices = [
        result.product.prices[0].amount,
        result.product.prices[1].amount,
        result.product.prices[2].amount,
        result.product.prices[3].amount,
        result.product.prices[4].amount
      ]

      const attributes = result.product.attributes

      const attr_1Id = result.product.attributes[0] ? result.product.attributes[0].id : ''
      const attr_2Id = result.product.attributes[1] ? result.product.attributes[1].id : ''        
      const attr_3Id = result.product.attributes[2] ? result.product.attributes[2].id : ''

      const attr_1 = result.product.attributes[0] ? result.product.attributes[0].items : ''
      const attr_2 = result.product.attributes[1] ? result.product.attributes[1].items : ''
      const attr_3 = result.product.attributes[2] ? result.product.attributes[2].items : ''
      const description = result.product.description     

      this.setState({
      ...this.state,
      product: product,
      id: id,
      gallery: gallery,
      img: img,
      brand: brand,
      name: name,
      instock: instock,
      prices: prices,
      attributes: attributes,

      attr_1Id: attr_1Id,
      attr_2Id: attr_2Id,
      attr_3Id: attr_3Id,

      attr_1: attr_1,
      attr_2: attr_2,
      attr_3: attr_3,

      description: description    
      });              
     });
     
  }

  componentDidUpdate() {
    if (this.state.productAdded !== 'no') {

      const id = window.location.href.split('/')[4];

      client.setEndpoint("http://localhost:4000/graphql");

      const query = new Query("product", true)
    .addArgument("id", "String!", id)   
    .addFieldList(["id", "name", "inStock", "gallery", "description", "brand", "attributes {id, name, type, items {displayValue, value, id}}", "prices {currency,amount }"])

      client.post(query).then(result => {
        const product = result.product
        const id = result.product.id
        const gallery = result.product.gallery
        const brand = result.product.brand
        const name = result.product.name
        const instock = result.product.inStock
        const img = gallery[0]

        const prices = [
          result.product.prices[0].amount,
          result.product.prices[1].amount,
          result.product.prices[2].amount,
          result.product.prices[3].amount,
          result.product.prices[4].amount
        ]      
        const attributes = result.product.attributes

        const attr_1Id = result.product.attributes[0] ? result.product.attributes[0].id : ''
        const attr_2Id = result.product.attributes[1] ? result.product.attributes[1].id : ''
        const attr_3Id = result.product.attributes[2] ? result.product.attributes[2].id : ''

        const attr_1 = result.product.attributes[0] ? result.product.attributes[0].items : ''
        const attr_2 = result.product.attributes[1] ? result.product.attributes[1].items : ''
        const attr_3 = result.product.attributes[2] ? result.product.attributes[2].items : ''
        const description = result.product.description     

        this.setState({
        ...this.state,
        product: product,
        id: id,
        gallery: gallery,
        img: img,
        brand: brand,
        name: name,
        instock: instock,
        prices: prices,
        attributes: attributes,

        attr_1Id: attr_1Id,
        attr_2Id: attr_2Id,
        attr_3Id: attr_3Id,

        attr_1: attr_1,
        attr_2: attr_2,
        attr_3: attr_3,

        description: description,
        productAdded: 'no'    
        });                                       
      });
    }
  }

  resetProduct() {
    this.setState({
      ...this.state,     
      productAdded: 'yes'    
      });
  } 

  addAttrToCart(id, attr, value) {
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);    

    jsonCart.forEach(element => {      
      if (element.name === id) {
        element[attr] = +value;             
      }      
    })   

    window.localStorage.setItem('cart', JSON.stringify(jsonCart));
  }

  findAttributeName(event) {
    const currentButton = event.target;
    const attrNAME = currentButton.closest('.attrWrapper').firstElementChild.innerHTML.toLowerCase()
    const attrName = attrNAME.slice(0, attrNAME.length - 1)
    
    return attrName
  }

  markAttribute(event) {      
    const currentButton = event.target;       
    const buttons = [...currentButton.closest('div').children];
    const attributeName = this.findAttributeName(event);    
       
    buttons.forEach(element => {
      element.classList.remove((attributeName !== COLOR) ? this.state.sizeButton.b : this.state.colorButton.b)
      element.classList.add((attributeName !== COLOR) ? this.state.sizeButton.a : this.state.colorButton.a)
      element.setAttribute('choosed', "no");
    });
    currentButton.classList.add((attributeName !== COLOR) ? this.state.sizeButton.b : this.state.colorButton.b)    
    currentButton.setAttribute('choosed', "yes");     
  }

  creatGallery() {
    const gl = this.state.gallery;
    if (gl.length === 1) {
      return ''
    } else {
      return this.state.gallery && this.state.gallery.map(item =>
        <li key={item} className={styles.galleryItem}><img className={styles.imgGalleryItem} src={item} alt="#"/></li>
      )
    }
  }

  showAttributeName(ind) {
    if (this.state.attributes.length === 0) return '';
      else return `${this.state.attributes[ind].id.toUpperCase()}:`        
  }

  createButtons(attrs, btnStyle, order) {
    return attrs && attrs.map((item, index, array) =>
      <button id={index} key={item.value} value={item.value} choosed={(index === 0) ? "yes" : "no"}
      onClick={(event) => {this.markAttribute(event); this.addAttrToCart(this.state.id, this.findAttributeName(event), event.target.id); this.props.changeAttributes(this.showAttributeName(order), item.value)}}          
      className={(btnStyle !== COLOR_C) ? ((index === 0) ? this.state.sizeButton.b : this.state.sizeButton.a) : ((index === 0) ? this.state.colorButton.b : this.state.colorButton.a)}
      style={btnStyle !== COLOR_C ? {width: `calc(95% / ${array.length})`} : {backgroundColor: item.value, width: `calc(95% / ${array.length})`, color: (item.displayValue === 'Black' || item.displayValue === 'Blue') ? '#fff' : '#1D1F22'}}>
        {btnStyle !== COLOR_C ? item.value : ''}
        <span className={styles.displayValue}>{item.displayValue}</span>
      </button>
      )
  }

  setAttributes(order) {
    switch(order) {  // eslint-disable-line
      case 1:  
      if (!this.state.attributes.length) return ''
      else if (this.state.attributes[0].id !== COLOR_C) {
         return (
          <div className={styles.chooseSize}>
            {this.createButtons(this.state.attr_1, '', 0)}           
          </div> 
          )} else {
            return (
              <div className={styles.chooseSize}>
                {this.createButtons(this.state.attr_1, COLOR_C, 0)}           
              </div> 
            )}
    
      case 2:  
      if (this.state.attributes.length < 2) return ''
      else if (this.state.attributes[1].id !== COLOR_C) {
         return (
          <div className={styles.chooseSize}>
            {this.createButtons(this.state.attr_2, '', 1)}           
          </div> 
          )} else {
            return (
              <div className={styles.chooseSize}>
                {this.createButtons(this.state.attr_2, COLOR_C, 1)}           
              </div> 
            )}

        case 3:
          if (this.state.attributes.length < 3) return ''
          else if (this.state.attributes[2].id !== COLOR_C) {
             return (
              <div className={styles.chooseSize}>
                {this.createButtons(this.state.attr_3, '', 2)}           
              </div> 
              )} else {
                return (
                  <div className={styles.chooseSize}>
                    {this.createButtons(this.state.attr_3, COLOR_C, 2)}           
                  </div> 
                )}        
    }    
  }

  returnAttributes(arr) {
    return arr && arr.map((item, index) =>
      <div key={item.id} className="attrWrapper">
        <h4 className={styles.sizeTitle}>{this.state.attributes[index] ? this.showAttributeName(index) : ''}</h4>
        {this.setAttributes(index+1)}
      </div>
    )    
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

              <img className={styles.imgProd} src={this.state.img} alt="#"/>

              <div className={styles.prodWrapper}>
                <h3 className={styles.title}>{this.state.brand}</h3>
                <span className={styles.subtitle}>{this.state.name}</span>

                {this.state.attributes ? this.returnAttributes(this.state.attributes) : ''}                

                <h4 className={styles.priceTitle}>Price:</h4>

                <div className={styles.prodPrice}><span className={styles.currencySimbol}>{this.context.currencySimbol}</span><span className={styles.currencyAmount}>{this.state.prices[this.context.currencyNumber]}</span></div>

                <button onClick={() => {this.props.addToCart(this.state.instock, this.state.id); this.resetProduct()}} className={(this.state.instock ? styles.add : styles.inStockFalse)}><span className={styles.out}>Out of stock</span><span className={styles.inStock}>Add to cart</span></button>

                <span id="dis" className={styles.prodDescription} dangerouslySetInnerHTML={{__html: this.state.description}}></span>

              </div>              
            </div>              
          </div>
      </section>
    );
  } 
}

Product.contextType = OverallData;

export default Product;