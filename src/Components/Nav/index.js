import React from 'react';
import {NavLink} from 'react-router-dom';
import imgLogo from '../../Images/a-logo.png'
import CartMini from '../UserCart/CartMini/CartMini';
import * as styles from './Nav.module.css';
import OverallData from '../../Context';
import NavCategories from './NavCategories';
import NavCarrencyAndCart from './NavCurrencyAndCart';
class Nav extends React.PureComponent { //setPopUpPosition
  constructor(props) {
    super(props);
    this.popUpRef = React.createRef();    

    this.state = {
      category: '',           
      popUp: styles.hidden     
    }    

    this.hideCartMini = this.hideCartMini.bind(this)
    this.markActive = this.markActive.bind(this)
    this.showCartMini = this.showCartMini.bind(this)   
  }  

  showCartMini() {
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

  markActive(category) {
    this.setState({
      category: category,
      popUp: styles.hidden      
    })
  }

  render() {
    const {category, popUp} = this.state
    const {StartPage, changeCurrentCategory, savedCategory, changeCurrency, countCart, displayCountCart, savedHref, setMiniCartChanged, miniCartChanged, setSavedHref, miniCartProductChanged, setMiniCartProductChanged} = this.props 
    return (      
      <nav className={styles.nav}>
          <div className="container">
            <div className={styles.wrapper}>

              <NavCategories category={category} markActive={this.markActive} startPage={StartPage} changeCurrentCategory={changeCurrentCategory} savedCategory={savedCategory}/>             

              <div className={styles.logo}>
                <NavLink onClick={() => {changeCurrentCategory(''); this.markActive('')}} className={styles.linkHome} to="/">
                  <img className={styles.imgLogo} src={imgLogo} alt="#"/>
                  <span className={styles.clue}>To All products</span>
                </NavLink>
              </div>

              <NavCarrencyAndCart changeCurrency={changeCurrency} countCart={countCart} displayCountCart={displayCountCart} savedHref={savedHref} setMiniCartChanged={setMiniCartChanged} category={category} showCartMini={this.showCartMini}/>              
            </div>
          </div>
              
          <div onClick={(event) => this.hideCartMini_2(event)} className={popUp}>
            <div ref={this.popUpRef} className={styles.innerPopUp}><CartMini hideCartMini={this.hideCartMini} category={category} miniCartChanged={miniCartChanged} setSavedHref={setSavedHref} savedHref={savedHref} setMiniCartChanged={setMiniCartChanged} miniCartProductChanged={miniCartProductChanged} setMiniCartProductChanged={setMiniCartProductChanged}
            /></div>
          </div>
      </nav>
    );
  } 
}

Nav.contextType = OverallData;

export default Nav;