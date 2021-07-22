import React from 'react';
import { client, Query} from "@tilework/opus";
import OverallData from '../../../Context';
//import imgProd1 from '../../../ImagesTemp/black.png';
import * as styles from './Product.module.css'

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: '',
      gallery: '',
      img: '',
      brand: '',
      name: '',
      prices: '',
      instok: '',
      attributes: '',
      description: '',
      sizesAndColors: '',
      colors: '',
      sizeButton: {
        a : styles.size,
        b : styles.sizeActive
      },
      colorButton: {
        a : styles.color,
        b : styles.colorActive
      },

      add: styles.add     
    }

    //this.methodeName = this.methodeName.bind(this)
    //this.props.changeCountCart = this.props.changeCountCart.bind(this)
	
  }

  componentDidMount() {
    const id = window.location.href.split('/')[4];    
    //console.log(id);    

    client.setEndpoint("http://localhost:4000/graphql");

    const query = new Query("product", true)
   .addArgument("id", "String!", id)   
   .addFieldList(["id", "name", "inStock", "gallery", "description", "brand", "attributes {items {value}}", "prices {currency,amount }"])

    client.post(query).then(result => {
      const product = result.product
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
      const sizesAndColors = result.product.attributes[0] ? result.product.attributes[0].items : ''
      const colors = result.product.attributes[1] ? result.product.attributes[1].items : ''
      const description = result.product.description

      // let inf2 = inf.find((element) => {if(element.id === id) return element}) 

      this.setState({
      ...this.state,
      product: product,
      gallery: gallery,
      img: img,
      brand: brand,
      name: name,
      instock: instock,
      prices: prices,
      attributes: attributes,
      sizesAndColors: sizesAndColors,
      colors: colors,
      description: description    
      }); 
      
      console.log(this.state.attributes);      
     });   
    
  }

  markSize(event) {
    //console.log(event.target)
    const carrentButton = event.target;
    const buttons = [...carrentButton.closest('div').children];    
    buttons.forEach(element => {
      element.classList.remove(this.state.sizeButton.b)
      element.classList.add(this.state.sizeButton.a)
    });
    carrentButton.classList.add(this.state.sizeButton.b)   
  }

  markColor(event) {    
    const carrentButton = event.target;
    const buttons = [...carrentButton.closest('div').children];    
    buttons.forEach(element => {
      element.classList.remove(this.state.colorButton.b)
      element.classList.add(this.state.colorButton.a)
    });
    carrentButton.classList.add(this.state.colorButton.b)   
  }

  creatGallery() {
    const gl = this.state.gallery;
    if (gl.length === 1) {
      return ''
    } else {
      return this.state.gallery && this.state.gallery.map(item =>
        <li key={item} className={styles.chooseColor}><img className={styles.imgChooseColor} src={item} alt="#"/></li>
      )
    }
  }

  showAttributeName() {
    if (this.state.attributes.length === 0) return ''
      else if (this.state.attributes.length === 1) return 'SIZE:'
        else if (this.state.attributes.length === 2) return 'COLOR:'
          else if (this.state.attributes.length > 2) return 'XXX'
  }

  createSizesButtons(attrs) {
    return attrs && attrs.map((item, index) =>
      <button id={index} key={item.value} onClick={(event) => this.markSize(event)} className={(index === 0) ? this.state.sizeButton.b : this.state.sizeButton.a}>{item.value}</button>
      )
  }

  createColorsButtons(attrs) {
    return attrs && attrs.map((item, index) =>
      <button id={index} key={item.value} onClick={(event) => this.markColor(event)} className={(index === 0) ? this.state.colorButton.b : this.state.colorButton.a} style={{backgroundColor: item.value}}></button>
      )
  }

  setAttributes() {
    if (this.state.attributes.length === 0) return ''
      else if (this.state.attributes.length === 1) {
         return (
          <div className={styles.chooseSize}>           {this.createSizesButtons(this.state.sizesAndColors)}           
          </div> 
          )} else if (this.state.attributes.length === 2) {
            const attrLength = this.state.sizesAndColors.length
            if (attrLength > 2) { return  (
              <div className={styles.chooseSize}>
                {this.createColorsButtons(this.state.sizesAndColors)}           
              </div> 
            )
              } else return (
                <div className={styles.chooseSize}>
                  {this.createColorsButtons(this.state.colors)}           
                </div>
                )
            } else if (this.state.attributes.length === 3) {
              return ('ZZZ')
              } 
  }

  insertDescriptions() {   
    const descrWrapper = document.querySelector('.Product_prodDescription__2eZrW');
    if (descrWrapper) {
      descrWrapper.innerHTML = this.state.description;
    }
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
                <h4 className={styles.sizeTitle}>{this.showAttributeName()}</h4>

                {this.setAttributes()}

                {/* <div className={styles.chooseSize}>
                  <button onClick={(event) => this.markSize(event)} className={this.state.xs}>XS</button>
                  <button onClick={(event) => this.markSize(event)} className={this.state.s}>S</button>
                  <button onClick={(event) => this.markSize(event)} className={this.state.m}>M</button>
                  <button onClick={(event) => this.markSize(event)} className={this.state.l}>L</button>                 
                </div> */}

                <h4 className={styles.priceTitle}>Price:</h4>

                <div className={styles.prodPrice}><span className={styles.currencySimbol}>{this.context.currencySimbol}</span><span className={styles.currencyAmount}>{this.state.prices[this.context.currencyNumber]}</span></div>

                <button onClick={() => this.props.changeCountCart(this.state.instock)} className={(this.state.instock ? styles.add : styles.inStockFalse)}><span className={styles.out}>Out of stock</span><span className={styles.inStock}>Add to cart</span></button>

                <span id="dis" className={styles.prodDescription}>{this.insertDescriptions()}</span>

              </div>              
            </div>              
          </div>
      </section>
    );
  } 
} //{item.prices[this.context.currencyNumber].amount}

Product.contextType = OverallData;

export default Product;