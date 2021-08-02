import React from 'react';
import {NavLink} from 'react-router-dom';
import imgLogo from '../../Images/a-logo.png'
import CartMini from '../UserCart/CartMini/CartMini';
import * as styles from './Nav.module.css';
import OverallData from '../../Context';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      count: this.props.countCart,      
      popUp: styles.hidden
    }

    this.hideCartMini = this.hideCartMini.bind(this)    
	
  }

  showCartMini() {    
    this.setState({
      ...this.state,
      popUp: styles.popUp      
    }) 
  }

  hideCartMini() {    
    this.setState({
      ...this.state,
      popUp: styles.hidden      
    }) 
  }

  markActive(category) {
    this.setState({
      ...this.state,
      category: category      
    })
  }

  createLinksList() {    
    return this.context.categoriesList && this.context.categoriesList.map(item =>
      <li onClick={() => this.markActive(item.category)} className={this.state.category === item.category ? styles.active : styles.menuItem} key={item.category}>
        <NavLink onClick={() => this.props.changeCurrentCategory(item.category)} className={styles.link} to={"/categ/" + item.category}>
           {item.category}
        </NavLink>
      </li>      
    )
  }

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
    return this.context.currencies && this.context.currencies.map((item, index) => 
      <li key={item} onClick={() => this.props.changeCurrency(this.showCurrencySimbol(index), this.context.currencies[index], index )}>{this.showCurrencySimbol(index)} {this.context.currencies[index]}</li>
    )
  }

  // showMenu(event) {}

  // closeMenu(event) {}

  render() {
    return (
      <nav className={styles.nav}>
          <div className="container">
            <div className={styles.wrapper}>
              {/* <button onClick= {(event) => this.showMenu(event)} className={styles.showMenu}>Menu</button>                     */}

              <ul className={styles.menu}>
                
                {this.createLinksList()}               
                
                <li onClick={(event) => this.markActive(event)} className={this.state.test}>
                  <NavLink className={styles.link} to="/test">
                    TEST
                  </NavLink>
                </li>                   
              </ul>

              <div className={styles.logo}>
                <img className={styles.imgLogo} src={imgLogo} alt="#"/>
              </div>

              <div className={styles.cartWrapper}>
                <span className={styles.currency}>{this.context.currencySimbol}</span>

                <div className={styles.chooseCurrency}>
                  <ul>
                    {this.creatCurrencyButtons()}                   
                  </ul>
                </div>

                <div onClick={() => this.showCartMini()} className={styles.cartLink}>
                  <span className={styles.cartLinkIcon} style={this.props.displayCountCart === "yes" ? {display: 'flex'} : {display: 'none'}}>{this.props.countCart}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={this.state.popUp}>
            <div className={styles.innerPopUp}><CartMini hideCartMini={this.hideCartMini} setCurrentProduct={this.props.setCurrentProduct}/></div>
          </div>
      </nav>
    );
  } 
}

Nav.contextType = OverallData;

export default Nav;