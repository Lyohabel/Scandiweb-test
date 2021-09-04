import React from 'react';
import {NavLink} from 'react-router-dom';
import * as styles from './Nav.module.css';
import OverallData from '../../Context';
import linkOff from '../../Utils/LinkOff';
import showCurrencySimbol from '../../Utils/ShowCurrencySimbol';

class NavCarrencyAndCart extends React.PureComponent { // setMiniCartChanged
  constructor(props) { // eslint-disable-line
    super(props);
  }

  showCurrencySimbol = (index) => showCurrencySimbol.call(this, index)

  linkOff = (event) => linkOff.call(this, event)

  creatCurrencyButtons() { // ????????????
    const {currencies} = this.context
    return currencies && currencies.map((item, index) => 
      <li key={item} onClick={() => this.props.changeCurrency(this.showCurrencySimbol(index), currencies[index], index )}>{this.showCurrencySimbol(index)} {currencies[index]}</li>
    )
  }

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
  } //; setMiniCartChanged('yes')
}

NavCarrencyAndCart.contextType = OverallData;

export default NavCarrencyAndCart;