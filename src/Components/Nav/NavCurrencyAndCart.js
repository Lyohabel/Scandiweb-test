import React from 'react';
import {NavLink} from 'react-router-dom';
import * as styles from './Nav.module.css';
import OverallData from '../../Context';
import linkOff from '../../Utils/LinkOff';

class NavCarrencyAndCart extends React.PureComponent {
  constructor(props) { // eslint-disable-line
    super(props);
  }

  linkOff = (event) => linkOff.call(this, event)

  showCurrencySimbol(index) {
    switch(this.context.currencies[index]) {  // eslint-disable-line
      case 'USD': 
        return (<span>$</span>);

      case 'GBP':
        return (<span>&pound;</span>);      

      case 'AUD':
        return (<span>A$</span>);

      case 'JPY':
        return (<span>&#165;</span>);
       
      case 'RUB':
        return (<span>&#8381;</span>);
    }
  }

  creatCurrencyButtons() {
    const {currencies} = this.context
    return currencies && currencies.map((item, index) => 
      <li key={item} onClick={() => this.props.changeCurrency(this.showCurrencySimbol(index), currencies[index], index )}>{this.showCurrencySimbol(index)} {currencies[index]}</li>
    )
  }

  render() {
    const {category, showCartMini, setMiniCartChanged, displayCountCart, countCart} = this.props
    return (
      <section className={styles.cartWrapper}>
        <span className={styles.currency}>{this.context.currencySimbol}</span>

        <div className={styles.chooseCurrency}>
          <ul>
            {this.creatCurrencyButtons()}                   
          </ul>
        </div>

        <div onClick={() => {showCartMini(); setMiniCartChanged('yes')}} className={styles.cartLink}>                  
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