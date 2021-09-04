import React from 'react';
import {NavLink} from 'react-router-dom';
import * as styles from './Nav.module.css';
import OverallData from '../../Context';
import linkOff from './NavUtils/LinkOff';
import creatCurrencyButtons from './NavUtils/CreatCurrencyButtons';
import showCurrencySimbol from './NavUtils/ShowCurrencySimbol';
class NavCarrencyAndCart extends React.PureComponent { 
  constructor(props) { // eslint-disable-line
    super(props);
  }

  linkOff = (event) => linkOff.call(this, event)

  showCurrencySimbol = (index) => showCurrencySimbol.call(this, index)  
  
  creatCurrencyButtons = () => creatCurrencyButtons.call(this)  

  render() {
    const {category, showCartMini, displayCountCart, countCart} = this.props
    return (
      <section className={styles.cartWrapper}>
        <span className={styles.currency}>{this.context.currencySimbol}</span>

        <div className={styles.chooseCurrency}>
          <ul>
            {this.creatCurrencyButtons()}                   
          </ul>
        </div>

        <div onClick={() => {showCartMini()}} className={styles.cartLink}>                  
          <span className={styles.cartLinkIcon} style={displayCountCart === "yes" ? {display: 'flex'} : {display: 'none'}}>{countCart}</span>

          <NavLink onClick={(event) => this.linkOff(event)} className={styles.fromCartLink}  to={"/fake-cart/" + category}>                  
          </NavLink>                  
        </div>
      </section>            
    );
  } 
}

NavCarrencyAndCart.contextType = OverallData;

export default NavCarrencyAndCart;