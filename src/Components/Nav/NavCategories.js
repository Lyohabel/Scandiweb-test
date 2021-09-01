import React from 'react';
import {NavLink} from 'react-router-dom';
import * as styles from './Nav.module.css';
import OverallData from '../../Context';

class NavCategories extends React.PureComponent { 
  constructor(props) {
    super(props);
    this.menuRef = React.createRef();

    this.state = {
      menu: '',
      btnShow: '',
      btnClose: ''
    }   
  } 

  createLinksList() { // ????????????????????
    const {category, markActive, savedCategory, startPage, changeCurrentCategory} = this.props
    return this.context.categoriesList && this.context.categoriesList.map(item => // eslint-disable-next-line
      <li onClick={() => markActive(item.category)} className={(category === item.category || category === '' && savedCategory === item.category && startPage !== 'yes') ? styles.active : styles.menuItem} key={item.category}>
        <NavLink onClick={() => changeCurrentCategory(item.category)} className={styles.link} to={"/categ/" + item.category}>
           {item.category}
        </NavLink>
      </li>      
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
    const {menu, btnClose, btnShow} = this.state 
    return (      
      <section>
        <button onClick= {() => this.showMenu()} style={btnShow === 'visible' ? {display: 'block'} : {display: 'none'}}  className={styles.showMenu}>Menu</button>

         <button style={btnClose === 'hidden' ? {display: 'none'} : {display: 'block'}} className={styles.closeMenu}>Click outside to close menu</button>                   

        <div onClick= {(event) => this.closeMenu(event)} className={(menu === '' || menu === 'visible') ? styles.menuOpenWrapper : styles.menuWrapper}>
          <ul ref={this.menuRef} className={styles.menu} style={menu === 'hidden' ? {display: 'none'} : {display: 'flex'}}>                
            {this.createLinksList()}                
          </ul>
        </div>                 
      </section>
    );
  } 
}

NavCategories.contextType = OverallData;

export default NavCategories;