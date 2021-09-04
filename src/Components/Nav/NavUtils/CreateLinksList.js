import {NavLink} from 'react-router-dom';
import * as styles from '../Nav.module.css';

function createLinksList() {
  const {category, markActive, savedCategory, changeCurrentCategory} = this.props
  return this.context.categoriesList && this.context.categoriesList.map(item => // eslint-disable-next-line
    <li onClick={() => markActive(item.category)} className={(category === item.category || category === '' && savedCategory === item.category) ? styles.active : styles.menuItem} key={item.category}>
      <NavLink onClick={() => changeCurrentCategory(item.category)} className={styles.link} to={"/categ/" + item.category}>
         {item.category}
      </NavLink>
    </li>      
  )
}

export default createLinksList