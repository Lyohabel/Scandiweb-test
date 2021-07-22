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
      categ: {
        a : styles.menuItem,
        b : styles.active
      },
      count: this.props.countCart,
      //cartCountIcon:  styles.hidden,
      popUp: styles.hidden
    }

    this.hideCartMini = this.hideCartMini.bind(this)    
	
  }  

  componentDidMount() {    
    
  }

  showCartMini() {    
    this.setState({
      popUp: styles.popUp,
      //cartCountIcon:  styles.cartLinkIcon     
    }) 
  }

  hideCartMini() {    
    this.setState({
      popUp: styles.hidden      
    }) 
  }

  markActive(event) {
    const carrentLink = event.target.closest('li');
    const links = [...carrentLink.closest('ul').children];    
    links.forEach(element => {
      element.classList.remove(this.state.categ.b)
      element.classList.add(this.state.categ.a)
    });
    carrentLink.classList.add(this.state.categ.b)    
  }

  createLinksList() {    
    return this.context.categoriesList && this.context.categoriesList.map(item =>
      <li onClick={(event) => this.markActive(event)} className={this.state.categ.a} key={item.category}>
        <NavLink onClick={(event) => this.props.changeCurrentCategory(event)} className={styles.link} to={"/categ/" + item.category}>
           {item.category}
        </NavLink>
      </li>      
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
                {/* <li className={styles.menuItem}>
                    <button onClick= {() => this.closeMenu()} className={styles.closeMenu}>Close</button>
                </li> */}
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
                    <li onClick={(event) => this.props.changeCurrency(event)}>$ USD</li>
                    <li onClick={(event) => this.props.changeCurrency(event)}>&pound; GBP</li>
                    <li onClick={(event) => this.props.changeCurrency(event)}>A$ AUD</li>
                    <li onClick={(event) => this.props.changeCurrency(event)}>&#165; JPY</li>
                    <li onClick={(event) => this.props.changeCurrency(event)}>&#8381; RUB</li>
                  </ul>
                </div>

                <div onClick={() => this.showCartMini()} className={styles.cartLink}>
                  <span className={styles.cartLinkIcon} style={{display: this.props.display}}>{this.props.countCart}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={this.state.popUp}>
            <div className={styles.innerPopUp}><CartMini hideCartMini={this.hideCartMini}/></div>
          </div>
      </nav>
    );
  } 
}

Nav.contextType = OverallData;

export default Nav;