import React from 'react';
import imgProd1 from '../../../ImagesTemp/black.png';
import * as styles from './Product.module.css'

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xs: styles.size,
      s: styles.sizeActive,
      m: styles.size,
      l: styles.size 
    }

    //this.methodeName = this.methodeName.bind(this)
    //this.props.changeCountCart = this.props.changeCountCart.bind(this)
	
  }

  componentDidMount() {

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

  render() {
    return (
      <section className="Product">
          <div className="container">                       
            <div className={styles.productItem}>
              <ul>
                <li className={styles.chooseColor}><img className={styles.imgChooseColor} src={imgProd1} alt="#"/></li>
                <li className={styles.chooseColor}><img className={styles.imgChooseColor} src={imgProd1} alt="#"/></li>
                <li className={styles.chooseColor}><img className={styles.imgChooseColor} src={imgProd1} alt="#"/></li>
              </ul>

              <img className={styles.imgProd} src={imgProd1} alt="#"/>

              <div className={styles.prodWrapper}>
                <h3 className={styles.title}>Apollo</h3>
                <span className={styles.subtitle}>Running Short</span>
                <h4 className={styles.sizeTitle}>Size:</h4>

                <div className={styles.chooseSize}>
                  <button onClick={(event) => this.markSize(event)} className={this.state.xs}>XS</button>
                  <button onClick={(event) => this.markSize(event)} className={this.state.s}>S</button>
                  <button onClick={(event) => this.markSize(event)} className={this.state.m}>M</button>
                  <button onClick={(event) => this.markSize(event)} className={this.state.l}>L</button>
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