import React from 'react';
import * as styles from './Product.module.css';
import PopUp from '../../../Elements/PopUp';

class ProductImages extends React.PureComponent { 
  constructor(props) {
    super(props);    
    this.state = {
      bigImage: '',
      imageIndex: 0    
    }
    this.setBigImage = this.setBigImage.bind(this)         
  }

  setBigImage(arg) {
    this.setState({   
      bigImage: arg,
         
      });
  }

  changeMainImage(index) {
    this.setState({   
      imageIndex: index,         
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
            <img onClick={() => this.changeMainImage(index)} className={styles.imgGalleryItem} src={item} alt="#"/>            
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

          <div className={styles.imgProd} style={this.state.bigImage === 'main' ? {display: 'none'} : {display: 'block'}}>
            <img onClick={() => this.setBigImage('main')} src={this.props.gallery[this.state.imageIndex]} alt="#"/>
          </div>

          <PopUp inner={'img'} img={this.props.gallery[this.state.imageIndex]} style={this.state.bigImage === 'main' ? {display: 'block'} : {display: 'none'}} bigImage={this.state.bigImage} setBigImage={this.setBigImage}/>

        </div>
      </section>
    ); 
  } 
}

export default ProductImages;