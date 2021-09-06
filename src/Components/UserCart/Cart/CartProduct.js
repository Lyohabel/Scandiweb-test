import React from 'react';
import * as styles from './CartProduct.module.css';
import CartProductImage from './CartProductImage';
import CartProductInf from './CartProductInf';

class CartProduct extends React.PureComponent { // eslint-disable-next-line
  constructor(props) {  
    super(props);
  }
  
  render() {
    const {id, name, setCurrentProduct, setMiniCartProductChanged} = this.props
    return (
      <section>
        <span className={styles.cartLine}></span>     
        <div className={styles.cartProdWrapper}>

          <CartProductInf id={id}/>

          <CartProductImage id={id} name={name} setCurrentProduct={setCurrentProduct}      
          setMiniCartProductChanged={setMiniCartProductChanged}/>

        </div>
      </section>          
    );  
  } 
}

export default CartProduct;