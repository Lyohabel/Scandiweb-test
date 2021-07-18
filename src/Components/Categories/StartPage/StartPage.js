import React from 'react';
import { client, Query, Field } from "@tilework/opus";
import OverallData from '../../../Context';
import {NavLink} from 'react-router-dom';
import * as styles from './StartPage.module.css'

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
      
    // }

    //this.methodeName = this.methodeName.bind(this)
	
  }  

  componentWillMount() {
    
  }

  createCategoriesList() {
    const categoriesList = this.context.categoriesList
    return categoriesList && categoriesList.map(item =>
      <li className={styles.category} id={item.category} key={item.category}>
        {item.category}     
      </li>
    )
  }
  componentDidMount() {
      
  }

  componentWillUnmount() {
    
  }  

  render() {
    return (
      <section className="men">
          <div className="container">            
            <div className={styles.startTitle}>
              <span className={styles.startPointer}></span>
              <h3>Select a Product Category from the menu at the top of the page:</h3>              
            </div>
            <ul className={styles.categoriesList}>
              {this.createCategoriesList()}
            </ul>
          </div>
      </section>
    );
  } 
}

StartPage.contextType = OverallData;

export default StartPage;