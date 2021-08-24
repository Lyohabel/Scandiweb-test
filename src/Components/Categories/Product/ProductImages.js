import React from 'react';
import * as styles from './Product.module.css';

class ProductImages extends React.Component { 
  constructor(props) {
    super(props);    
    this.state = {
      bigImage: ''   
    }         
  }

  setBigImage(arg) {
    this.setState({   
      bigImage: arg    
      });
  }

  creatGallery() {
    const gl = this.props.gallery.length;
    if (gl === 1) {
      return ''
    } else {
      return this.props.gallery && this.props.gallery.map((item, index) =>
        <li key={item} className={styles.galleryItem}>
          <div className={this.state.bigImage === index ? styles.imgBig : styles.imgSmall}>
            <button onClick={() => this.setBigImage('')} className={styles.closeBigImage} style={this.state.bigImage === index ? {display: 'block'} : {display: 'none'}}>&times;</button>
            <img onClick={() => this.setBigImage(index)} className={styles.imgGalleryItem} src={item} alt="#"/>            
          </div>          
        </li>
      )
    }
  } 

  render() {
    return (
      <section className="ProductImages">
        <div className={styles.galleryWrapper}>
          <ul className={styles.galleryList}>
            {this.creatGallery()}
          </ul>

          <div className={this.state.bigImage === 'main' ? styles.mainImgBig : styles.imgProd}>
            <button onClick={() => this.setBigImage('')} className={styles.closeBigImage} style={this.state.bigImage === 'main' ? {display: 'block'} : {display: 'none'}}>&times;</button>
            <img onClick={() => this.setBigImage('main')} src={this.props.gallery[0]} alt="#"/>
          </div>
        </div>
      </section>
    );
  } 
}

export default ProductImages;