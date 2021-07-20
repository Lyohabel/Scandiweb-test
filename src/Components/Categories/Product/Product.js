import React from 'react';
import { client, Query, Field } from "@tilework/opus";
import OverallData from '../../../Context';
//import imgProd1 from '../../../ImagesTemp/black.png';
import * as styles from './Product.module.css'

class Product extends React.Component {
  constructor(props) { // eslint-disable-line
    super(props);
    this.state = {
      product: '',
      gallery: '',
      img: '',
      brand: '',
      name: '',
      price: '',
      xs: styles.size,
      s: styles.sizeActive,
      m: styles.size,
      l: styles.size      
    }

    //this.methodeName = this.methodeName.bind(this)
    //this.props.changeCountCart = this.props.changeCountCart.bind(this)
	
  }

  componentDidMount() {
    const id = window.location.href.split('/')[4];    
    console.log(id);    

    client.setEndpoint("http://localhost:4000/graphql");

    const query = new Query("product", true)
   .addArgument("id", "String!", id)   
   .addFieldList(["id", "name", "inStock", "gallery", "description", "brand", "attributes {items {value}}", "prices {currency,amount }"])

    client.post(query).then(result => {
      const product = result.product
      const gallery = result.product.gallery
      const brand = result.product.brand
      const name = result.product.name
      const img = gallery[0]
      const price = result.product.prices[this.context.currencyNumber].amount

      // let inf2 = inf.find((element) => {if(element.id === id) return element}) 

      this.setState({
      ...this.state,
      product: product,
      gallery: gallery,
      img: img,
      brand: brand,
      name: name,
      price: price    
      }); 
      
      console.log(this.state.product);      
     });   
    
  }

  markSize(event) {
    let categ = event.target.innerHTML.toLowerCase();
    if (categ === 'xs') {
      this.setState({
        xs: styles.sizeActive,
        s: styles.size,
        m: styles.size,
        l: styles.size
      })     
    } else if (categ === 's') {
        this.setState({
          xs: styles.size,
          s: styles.sizeActive,
          m: styles.size,
          l: styles.size
        })
      } else if (categ === 'm') {
          this.setState({
            xs: styles.size,
            s: styles.size,
            m: styles.sizeActive,
            l: styles.size
          })
        }  else if (categ === 'l') {
            this.setState({
              xs: styles.size,
              s: styles.size,
              m: styles.size,
              l: styles.sizeActive
            })
          }    
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
                <h4 className={styles.sizeTitle}>Size:</h4>

                <div className={styles.chooseSize}>
                  <button onClick={(event) => this.markSize(event)} className={this.state.xs}>XS</button>
                  <button onClick={(event) => this.markSize(event)} className={this.state.s}>S</button>
                  <button onClick={(event) => this.markSize(event)} className={this.state.m}>M</button>
                  <button onClick={(event) => this.markSize(event)} className={this.state.l}>L</button>
                  {/* <button onClick={() => this.creatGallery()} className={this.state.l}>CG</button> */}
                </div>

                <h4 className={styles.priceTitle}>Price:</h4>

                <div className={styles.prodPrice}><span>{this.context.currencySimbol}</span>{this.state.price}</div>

                <button onClick={() => this.props.changeCountCart()} className={styles.add}>Add to cart</button>

                <span className={styles.prodDescription}>Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.</span>

              </div>              
            </div>              
          </div>
      </section>
    );
  } 
} //{item.prices[this.context.currencyNumber].amount}

Product.contextType = OverallData;

export default Product;