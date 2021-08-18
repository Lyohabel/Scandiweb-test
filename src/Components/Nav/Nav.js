import React from 'react';
import {NavLink} from 'react-router-dom';
import imgLogo from '../../Images/a-logo.png'
import CartMini from '../UserCart/CartMini/CartMini';
import * as styles from './Nav.module.css';
import OverallData from '../../Context';
import {POPUP} from '../../CONST';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      count: this.props.countCart,      
      popUp: styles.hidden,
      menu: '',
      btnShow: '',
      btnClose: ''
    }

    this.hideCartMini = this.hideCartMini.bind(this)    
  }

  showCartMini() {
    this.props.setPopUpPosition(POPUP)   
    this.setState({
      ...this.state,
      popUp: styles.popUp      
    })    
  }

  hideCartMini(event) {        
    this.setState({
      ...this.state,
      popUp: styles.hidden      
    })
  }

  linkOff(event) {
    if (this.props.savedHref !== '/cart') { // eslint-disable-next-line 
      event. preventDefault() 
    }     
  }

  markActive(category) {
    this.setState({
      ...this.state,
      category: category,
      popUp: styles.hidden      
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

  showMenu() {
    this.setState({
      ...this.state,
      menu: 'visible',
      btnClose: 'visible',
      btnShow: 'hidden'     
    })
  }

  closeMenu() {
    this.setState({
      ...this.state,
      menu: 'hidden',
      btnClose: 'hidden',
      btnShow: 'visible'     
    })
  }
  render() {     
    return (
      <nav className={styles.nav}>
          <div className="container">
            <div className={styles.wrapper}>
              <button onClick= {() => this.showMenu()} style={this.state.btnShow === 'visible' ? {display: 'block'} : {display: 'none'}}  className={styles.showMenu}>Menu</button>

              <button onClick= {() => this.closeMenu()} style={this.state.btnClose === 'hidden' ? {display: 'none'} : {display: 'block'}} className={styles.closeMenu}>Close menu</button>                   

              <div className={styles.menuWrapper}>
                <ul className={styles.menu} style={this.state.menu === 'hidden' ? {display: 'none'} : {display: 'flex'}}>                
                  {this.createLinksList()}                
                </ul>
              </div>              

              <div className={styles.logo}>
                <NavLink onClick={() => {this.props.changeCurrentCategory(''); this.markActive('')}} className={styles.linkHome} to="/">
                  <img className={styles.imgLogo} src={imgLogo} alt="#"/>
                  <span className={styles.clue}>To All products</span>
                </NavLink>
              </div>

              <div className={styles.cartWrapper}>
                <span className={styles.currency}>{this.context.currencySimbol}</span>

                <div className={styles.chooseCurrency}>
                  <ul>
                    {this.creatCurrencyButtons()}                   
                  </ul>
                </div>

                <div onClick={() => {this.showCartMini(); this.props.setMiniCartChanged('yes')}} className={styles.cartLink}>                  
                  <span className={styles.cartLinkIcon} style={this.props.displayCountCart === "yes" ? {display: 'flex'} : {display: 'none'}}>{this.props.countCart}</span>

                  <NavLink onClick={(event) => this.linkOff(event)} className={styles.fromCartLink}  to={"/fake-cart/" + this.state.category}>                  
                  </NavLink>                  
                </div>
              </div>
            </div>
          </div>
              
          <div  className={this.state.popUp}>
            <div className={styles.innerPopUp}><CartMini hideCartMini={this.hideCartMini} category={this.state.category}          
            miniCartChanged={this.props.miniCartChanged} setSavedHref={this.props.setSavedHref} savedHref={this.props.savedHref}
            setMiniCartChanged={this.props.setMiniCartChanged}            
            miniCartProductChanged={this.props.miniCartProductChanged}           
            setMiniCartProductChanged={this.props.setMiniCartProductChanged}
            /></div>
          </div>
      </nav>
    ); // onClick={(event) => this.hideCartMini(event)}
  } 
}

Nav.contextType = OverallData;

export default Nav;