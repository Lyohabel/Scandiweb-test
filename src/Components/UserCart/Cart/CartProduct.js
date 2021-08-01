import React from 'react';
// import * as _ from 'lodash';
// import {NavLink} from 'react-router-dom'; // eslint-disable-line
// import { client, Query} from "@tilework/opus";
import OverallData from '../../../Context';
import * as styles from './CartProduct.module.css'

class CartProduct extends React.Component {
  constructor(props) { // eslint-disable-line
    super(props);
    this.state = {
      jsonCart: '',
      productsNumber: '' 
    }   
    
    // this.creatGallery = this.creatGallery.bind(this)
    // this.showAnoterImage = this.showAnotherImage.bind(this)
  }
  
  componentDidMount() {
    if (!window.localStorage.getItem('cart')) return;
    console.log(this.props.savedData.name)
  }

  render() {
    return (      
      <div className={styles.cartWrapper}>
        <span className={styles.cartLine}></span>
          {this.props.savedData.name}
      </div>          
    );
  } 
}

CartProduct.contextType = OverallData;

export default CartProduct;