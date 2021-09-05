import * as styles from '../Product.module.css';

function creatGallery() {
  const {gallery} = this.props
  const gl = gallery.length;
  if (gl === 1) {
    return ''
  } else {
    return gallery && gallery.map((item, index) =>
      <li key={item} className={styles.galleryItem}>
        <div className={this.state.bigImage === index ? styles.imgBig : styles.imgSmall}>
          <img onClick={() => this.changeMainImage(index)} className={styles.imgGalleryItem} src={item} alt="#"/>            
        </div>          
      </li>
    )
  }
} 

  export default creatGallery