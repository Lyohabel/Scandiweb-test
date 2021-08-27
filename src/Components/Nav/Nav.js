import React from 'react';
import {NavLink} from 'react-router-dom';
import imgLogo from '../../Images/a-logo.png'
import CartMini from '../UserCart/CartMini/CartMini';
import * as styles from './Nav.module.css';
import OverallData from '../../Context';
//import {POPUP} from '../../CONST';

class Nav extends React.Component { //setPopUpPosition
  constructor(props) {
    super(props);
    this.popUpRef = React.createRef();
    this.menuRef = React.createRef();

    this.state = {
      category: '',           
      popUp: styles.hidden,
      menu: '',
      btnShow: '',
      btnClose: ''
    }    

    this.hideCartMini = this.hideCartMini.bind(this)    
  }  

  showCartMini() {
    //this.props.setPopUpPosition(POPUP)   
    this.setState({
      popUp: styles.popUp      
    })    
  }

  hideCartMini() {    
    this.setState({        
      popUp: styles.hidden      
    })    
  }

  hideCartMini_2(event) {
    if (this.popUpRef.current && !this.popUpRef.current.contains(event.target)) {
      this.setState({
        popUp: styles.hidden      
      })
    }
  }

  linkOff(event) {
    if (this.props.savedHref !== '/cart') { // eslint-disable-next-line 
      event. preventDefault() 
    }     
  }

  markActive(category) {
    this.setState({
      category: category,
      popUp: styles.hidden      
    })
  }

  createLinksList() { 
    return this.context.categoriesList && this.context.categoriesList.map(item => // eslint-disable-next-line
      <li onClick={() => this.markActive(item.category)} className={(this.state.category === item.category || this.state.category === '' && this.props.savedCategory === item.category && this.props.startPage !== 'yes') ? styles.active : styles.menuItem} key={item.category}>
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
      menu: 'visible',
      btnClose: 'visible',
      btnShow: 'hidden'     
    })
  }

  closeMenu(event) {
    if (this.menuRef.current && !this.menuRef.current.contains(event.target)) {
    this.setState({
      menu: 'hidden',
      btnClose: 'hidden',
      btnShow: 'visible'     
    })
  }
  }

  render() {
    const {category, popUp, menu, btnClose, btnShow} = this.state 
    return (      
      <nav className={styles.nav}>
          <div className="container">
            <div className={styles.wrapper}>
              <button onClick= {() => this.showMenu()} style={btnShow === 'visible' ? {display: 'block'} : {display: 'none'}}  className={styles.showMenu}>Menu</button>

              <button style={btnClose === 'hidden' ? {display: 'none'} : {display: 'block'}} className={styles.closeMenu}>Click outside to close menu</button>                   

              <div onClick= {(event) => this.closeMenu(event)} className={(this.state.menu === '' || this.state.menu === 'visible') ? styles.menuOpenWrapper : styles.menuWrapper}>
                <ul ref={this.menuRef} className={styles.menu} style={menu === 'hidden' ? {display: 'none'} : {display: 'flex'}}>                
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

                  <NavLink onClick={(event) => this.linkOff(event)} className={styles.fromCartLink}  to={"/fake-cart/" + category}>                  
                  </NavLink>                  
                </div>
              </div>
            </div>
          </div>
              
          <div onClick={(event) => this.hideCartMini_2(event)} className={popUp}>
            <div ref={this.popUpRef} className={styles.innerPopUp}><CartMini hideCartMini={this.hideCartMini} category={category} miniCartChanged={this.props.miniCartChanged} setSavedHref={this.props.setSavedHref} savedHref={this.props.savedHref} setMiniCartChanged={this.props.setMiniCartChanged} miniCartProductChanged={this.props.miniCartProductChanged} setMiniCartProductChanged={this.props.setMiniCartProductChanged}
            /></div>
          </div>
      </nav>
    );
  } 
}

Nav.contextType = OverallData;

export default Nav;