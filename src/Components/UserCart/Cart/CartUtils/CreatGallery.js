import * as styles from '../CartProduct.module.css';
import {NavLink} from 'react-router-dom';

function creatGallery() {
  const {gallery, name: id, } = this.state.jsonCart
  
   return gallery && gallery.map((item, index, array) =>
    (array.length === 1)
     ?     
      <li key={index} className={styles.galleryItem} style={{display: 'block'}}>
        <NavLink onClick={() => this.props.setCurrentProduct(id)} className={styles.prodLink} to={"/product/" + id}> 
          <img className={styles.imgDisplay} src={item} alt="#"/>
        </NavLink>                  
      </li>
        :
          <li key={index} className={styles.galleryItem}
          style={(index === this.state.imgStatus) ? {display: 'block'} : {display: 'none'}}>
            <NavLink onClick={() => this.props.setCurrentProduct(id)} className={styles.prodLink} to={"/product/" + id}> 
              <img className={styles.imgDisplay} src={item} alt="#"/>
            </NavLink>                  
          </li>
  ) 
}

export default creatGallery