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
      test: styles.menuItem,
      tech: styles.menuItem,
      women: styles.menuItem,
      count: this.props.countCart,
      //cartCountIcon:  styles.hidden,
      popUp: styles.hidden
    }

    this.hideCartMini = this.hideCartMini.bind(this)    
	
  }  

  componentDidMount() {    
    //console.log(this.context.currency)
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
    let categ = event.target.innerHTML.toLowerCase();
    if (categ === 'women') {
      this.setState({
        ...this.state,
        women: styles.active,
        tech: styles.menuItem,
        test: styles.menuItem
      })     
    } else if (categ === 'tech') {
        this.setState({
          ...this.state,
          women: styles.menuItem,
          tech: styles.active,
          test: styles.menuItem
        })
      } else if (categ === 'test') {
        this.setState({
          ...this.state,
          women: styles.menuItem,
          test: styles.active,
          tech: styles.menuItem
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
                <li onClick={(event) => this.markActive(event)} className={this.state.tech}>
                  <NavLink className={styles.link} to="/tech">
                    TECH
                  </NavLink>
                </li>

                <li onClick={(event) => this.markActive(event)} className={this.state.women}>
                  <NavLink className={styles.link} to="/women">
                    WOMEN
                  </NavLink>
                </li> 

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