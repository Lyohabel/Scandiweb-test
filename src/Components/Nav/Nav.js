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
      women: styles.active,
      men: styles.menuItem,
      kids: styles.menuItem,
      count: this.props.countCart,
      cartCountIcon:  styles.hidden,
      popUp: styles.hidden
    }

    this.hideCartMini = this.hideCartMini.bind(this)    
	
  }  

  componentDidMount() {    
    console.log(this.context.currency)
  }

  showCartMini() {    
    this.setState({
      popUp: styles.popUp,
      cartCountIcon:  styles.cartLinkIcon     
    }) 
  }

  hideCartMini() {    
    this.setState({
      popUp: styles.hidden      
    }) 
  }

  markActive(event) {
    let categ = event.target.innerHTML.toLowerCase();
    if (categ === 'women') {
      this.setState({
        women: styles.active,
        men: styles.menuItem,
        kids: styles.menuItem
      })     
    } else if (categ === 'men') {
        this.setState({
          women: styles.menuItem,
          men: styles.active,
          kids: styles.menuItem
        })
      } else if (categ === 'kids') {
        this.setState({
          women: styles.menuItem,
          men: styles.menuItem,
          kids: styles.active
        })
      }    
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
                <li onClick={(event) => this.markActive(event)} className={this.state.women}>
                  <NavLink className={styles.link} to="/">
                    WOMEN
                  </NavLink>
                </li>

                <li onClick={(event) => this.markActive(event)} className={this.state.men}>
                  <NavLink className={styles.link} to="/men">
                    MEN
                  </NavLink>
                </li>

                <li onClick={(event) => this.markActive(event)} className={this.state.kids}>
                  <NavLink className={styles.link} to="/kids">
                    KIDS
                  </NavLink>
                </li>                       
              </ul>

              <div className={styles.logo}>
                <img className={styles.imgLogo} src={imgLogo} alt="#"/>
              </div>

              <div className={styles.cartWrapper}>
                <span className={styles.currency}>{this.context.currency}</span>

                <div className={styles.chooseCurrency}>
                  <ul>
                    <li onClick={(event) => this.props.changeCurrency(event)}>$ USD</li>
                    <li onClick={(event) => this.props.changeCurrency(event)}>&#8364; EUR </li>
                    <li onClick={(event) => this.props.changeCurrency(event)}>&#165; JPY</li>
                  </ul>
                </div>

                <div onClick={() => this.showCartMini()} className={styles.cartLink}>
                  <span className={this.state.cartCountIcon}>{this.props.countCart}</span>
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