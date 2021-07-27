import React from 'react';
import { client, Query} from "@tilework/opus";
import OverallData from '../../../Context';
//import imgProd1 from '../../../ImagesTemp/black.png';
import * as styles from './Product.module.css'

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

    //this.methodeName = this.methodeName.bind(this)
    //this.props.changeCountCart = this.props.changeCountCart.bind(this)
	
  }

  componentDidMount() {
    //console.log(this.state.productAdded)
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
      attr_1: attr_1,
      attr_2: attr_2,
      attr_3: attr_3,
      description: description    
      });
      //this.props.setDefaultAttributes()
      //console.log(this.props.def)                
     });
     
  }
//******************************************************************** */
  componentDidUpdate() {
    if (this.state.productAdded !== 'no') {
      //console.log(this.state.productAdded)     

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
        attr_1: attr_1,
        attr_2: attr_2,
        attr_3: attr_3,
        description: description,
        productAdded: 'no'    
        });
        //console.log(this.state.productAdded)                                
      });
    }
  }

  resetProduct() {
    this.setState({
      ...this.state,     
      productAdded: 'yes'    
      });
  }
  //*************************************************************************** */

  addAttrToCart(id, attr, value) {
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);    

    jsonCart.forEach(element => {      
      if (element.name === id) {
        element[attr] = +value;             
      }      
    })
    //console.log(attr)
    //console.log(jsonCart);

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
      element.classList.remove((attributeName !== 'color') ? this.state.sizeButton.b : this.state.colorButton.b)
      element.classList.add((attributeName !== 'color') ? this.state.sizeButton.a : this.state.colorButton.a)
     //if (attributeName !== 'color')
      element.setAttribute('choosed', "no");
    });
    currentButton.classList.add((attributeName !== 'color') ? this.state.sizeButton.b : this.state.colorButton.b)
    //if (attributeName !== 'color')
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

  createButtons(attrs, attrName) {
    return attrs && attrs.map((item, index, array) =>
      <button id={index} key={item.value} value={item.value} choosed={(index === 0) ? "yes" : "no"}
      onClick={(event) => {this.markAttribute(event); this.addAttrToCart(this.state.id, this.findAttributeName(event), event.target.id); this.props.changeAttributes(event)}}          
      className={(attrName !== 'COLOR') ? ((index === 0) ? this.state.sizeButton.b : this.state.sizeButton.a) : ((index === 0) ? this.state.colorButton.b : this.state.colorButton.a)}
      style={attrName !== 'COLOR' ? {width: `calc(95% / ${array.length})`} : {backgroundColor: item.value, width: `calc(95% / ${array.length})`, color: (item.displayValue === 'Black' || item.displayValue === 'Blue') ? '#fff' : '#000'}}>
        {item.value}
        <span>{item.displayValue}</span>
      </button>
      )
  }  

  //  style={{width: `calc(95% / ${array.length})`}}>{item.displayValue}</button>
  // style={{backgroundColor: item.value, width: `calc(95% / ${array.length})`, color: (item.displayValue === 'Black' || item.displayValue === 'Blue') ? //'#fff' : '#000'}}>{item.displayValue}</button> 

  createSizesButtons(attrs) {
    //console.log(attrs)
    return attrs && attrs.map((item, index, array) =>
      <button id={index} key={item.value} value={item.value} onClick={(event) => {this.markAttribute(event); this.addAttrToCart(this.state.id, this.findAttributeName(event), event.target.id); this.props.changeAttributes(event)}} className={(index === 0) ? this.state.sizeButton.b : this.state.sizeButton.a} choosed={(index === 0) ? "yes" : "no"}  style={{width: `calc(95% / ${array.length})`}}>{item.displayValue}</button>
      )
  }

  createColorsButtons(attrs) {
    return attrs && attrs.map((item, index, array) =>
      <button id={index} key={item.value} value={item.value} onClick={(event) => {this.markAttribute(event); this.addAttrToCart(this.state.id, this.findAttributeName(event), event.target.id); this.props.changeAttributes(event)}} className={(index === 0) ? this.state.colorButton.b : this.state.colorButton.a} style={{backgroundColor: item.value, width: `calc(95% / ${array.length})`, color: (item.displayValue === 'Black' || item.displayValue === 'Blue') ? '#fff' : '#000'}}>{item.displayValue}</button>
      )
  }
  
  createCapacityButtons(attrs) {
    return attrs && attrs.map((item, index, array) =>
      <button id={index} key={item.value} value={item.value} onClick={(event) => {this.markAttribute(event); this.addAttrToCart(this.state.id, this.findAttributeName(event), event.target.id); this.props.changeAttributes(event)}} className={(index === 0) ? this.state.sizeButton.b : this.state.sizeButton.a} style={{width: `calc(95% / ${array.length})`}}>{item.displayValue}</button>
      )
  }

  createOptionButtons(attrs) {
    return attrs && attrs.map((item, index, array) =>
      <button id={index} key={item.value} value={item.value} onClick={(event) => {this.markAttribute(event); this.addAttrToCart(this.state.id, this.findAttributeName(event), event.target.id); this.props.changeAttributes(event)}} className={(index === 0) ? this.state.sizeButton.b : this.state.sizeButton.a} style={{width: `calc(95% / ${array.length})`}}>{item.displayValue}</button>
      )
  }

  setAttributes() {
    if (this.state.attributes.length === 0) return ''
      else if (this.state.attributes[0].id === 'Size') {
         return (
          <div className={styles.chooseSize}>
            {this.createSizesButtons(this.state.attr_1)}           
          </div> 
          )} else if (this.state.attributes[0].id === 'Color') {
            return (
              <div className={styles.chooseSize}>
                {this.createColorsButtons(this.state.attr_1)}           
              </div> 
            )} else if (this.state.attributes[0].id === 'Capacity') {
              return (
                <div className={styles.chooseSize}>
                  {this.createCapacityButtons(this.state.attr_1)}           
                </div> 
              )} 
  }

  setAttributes_2() {
    if (this.state.attributes.length < 2) return ''
      else if (this.state.attributes[1].id === 'Size') {
         return (
          <div className={styles.chooseSize}>
            {this.createSizesButtons(this.state.attr_2)}           
          </div> 
          )} else if (this.state.attributes[1].id === 'Color') {
            return (
              <div className={styles.chooseSize}>
                {this.createColorsButtons(this.state.attr_2)}           
              </div> 
            )} else if (this.state.attributes[1].id === 'Capacity') {
              return (
                <div className={styles.chooseSize}>
                  {this.createCapacityButtons(this.state.attr_2)}           
                </div> 
              )} else { return (
                  <div className={styles.chooseSize}>
                    {this.createOptionButtons(this.state.attr_2)}           
                  </div> 
                )} 
  }

  setAttributes_3() {
    if (this.state.attributes.length < 3) return ''
      else if (this.state.attributes[1].id === 'Size') {
         return (
          <div className={styles.chooseSize}>
            {this.createSizesButtons(this.state.attr_3)}           
          </div> 
          )} else if (this.state.attributes[1].id === 'Color') {
            return (
              <div className={styles.chooseSize}>
                {this.createColorsButtons(this.state.attr_3)}           
              </div> 
            )} else if (this.state.attributes[1].id === 'Capacity') {
              return (
                <div className={styles.chooseSize}>
                  {this.createCapacityButtons(this.state.attr_3)}           
                </div> 
              )} else { return (
                  <div className={styles.chooseSize}>
                    {this.createOptionButtons(this.state.attr_3)}           
                  </div> 
                )} 
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

                <div className="attrWrapper">
                <h4 className={styles.sizeTitle}>{this.showAttributeName(0)}</h4>
                {this.setAttributes()}
                </div>

                <div className="attrWrapper">
                  <h4 className={styles.sizeTitle}>{this.state.attributes[1] ? this.showAttributeName(1) : ''}</h4>
                  {this.setAttributes_2()}
                </div>

                <div className="attrWrapper">
                <h4 className={styles.sizeTitle}>{this.state.attributes[2] ? this.showAttributeName(2) : ''}</h4>
                {this.setAttributes_3()}                  
                </div>

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