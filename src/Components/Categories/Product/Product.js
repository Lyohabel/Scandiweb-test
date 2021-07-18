import React from 'react';
import { client, Query, Field } from "@tilework/opus";
import imgProd1 from '../../../ImagesTemp/black.png';
import * as styles from './Product.module.css'

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: 5,
      xs: styles.size,
      s: styles.sizeActive,
      m: styles.size,
      l: styles.size      
    }

    //this.methodeName = this.methodeName.bind(this)
    //this.props.changeCountCart = this.props.changeCountCart.bind(this)
	
  }

  componentDidMount() {
    const fromHref = window.location.href.split('/')[4];
    const categ = fromHref.split(';')[0];
    const id = fromHref.split(';')[1];
    console.log(fromHref);
    console.log(id);
    console.log(this.state.product);

    client.setEndpoint("http://localhost:4000/graphql");

    const query = new Query("category", true)
    .addArgument("input", "CategoryInput", {title : categ})
    .addField(new Field("products", arguments.title, true).addFieldList(["id", "name", "inStock", "gallery", "description", "category", "attributes {items {value}}", "prices {currency,amount }"]))

    client.post(query).then(result => {
      let inf = result.category.products

      let inf2 = inf.find((element) => {if(element.id === id) return element})

      this.setState({
      ...this.state,
      product: inf2        
      }); 
      
      console.log(result.category.products);
      console.log(inf2); 
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
    const gl = this.state.product.gallery.length;
    if (gl === 1) {
      return ''
    } else {
      return this.state.product.gallery && this.state.product.gallery.map(item =>
        <li key={item.index} className={styles.chooseColor}><img className={styles.imgChooseColor} src={item} alt="#"/></li>
      )
    }
  }

  render() {
    return (
      <section className="Product">
          <div className="container">                       
            <div className={styles.productItem}>
              <ul></ul>
              {/* <ul>
                <li className={styles.chooseColor}><img className={styles.imgChooseColor} src={imgProd1} alt="#"/></li>
                <li className={styles.chooseColor}><img className={styles.imgChooseColor} src={imgProd1} alt="#"/></li>
                <li className={styles.chooseColor}><img className={styles.imgChooseColor} src={imgProd1} alt="#"/></li>
              </ul> */}

              <img className={styles.imgProd} src={this.state.product.gallery} alt="#"/>

              <div className={styles.prodWrapper}>
                <h3 className={styles.title}>Apollo</h3>
                <span className={styles.subtitle}>Running Short</span>
                <h4 className={styles.sizeTitle}>Size:</h4>

                <div className={styles.chooseSize}>
                  <button onClick={(event) => this.markSize(event)} className={this.state.xs}>XS</button>
                  <button onClick={(event) => this.markSize(event)} className={this.state.s}>S</button>
                  <button onClick={(event) => this.markSize(event)} className={this.state.m}>M</button>
                  <button onClick={(event) => this.markSize(event)} className={this.state.l}>L</button>
                  {/* <button onClick={() => this.creatGallery()} className={this.state.l}>CG</button> */}
                </div>

                <h4 className={styles.priceTitle}>Price:</h4>

                <div className={styles.prodPrice}><span>$</span>50</div>

                <button onClick={() => this.props.changeCountCart()} className={styles.add}>Add to cart</button>

                <span className={styles.prodDescription}>Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.</span>

              </div>              
            </div>              
          </div>
      </section>
    );
  } 
}

export default Product;