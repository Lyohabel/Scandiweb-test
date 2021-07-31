import React from 'react';
import { client, Query, Field } from "@tilework/opus";
import {NavLink} from 'react-router-dom';
import OverallData from '../../../Context';
import * as styles from './StartPage.module.css'

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      startData: '',
      startTitle: ''
    }
  }

  createList() {      
    return this.state.startData && this.state.startData.map(item =>
      <li className={styles.productItem} id={item.id} key={item.id}>
        <NavLink className={styles.prodLink} to={"/product/" + item.id}> 
          <img onClick={() => this.props.setCurrentProduct(item.id)} className={styles.imgProd} src={item.gallery[0] || item.gallery} alt="#"/>
        </NavLink>

        <h3 className={styles.prodTitle}>{item.brand} <span className={styles.subtitle}>{item.name}</span></h3>
       
        <div className={styles.prodPrice}><span>{this.context.currencySimbol}</span><span className={styles.priceNumber}>{item.prices[this.context.currencyNumber].amount}</span></div>

        <button onClick={() => this.props.addToCart(item.inStock, item.id, ((item.attributes) ? item.attributes[0].id : ''), ((item.attributes && item.attributes[1]) ? item.attributes[1].id : ''), ((item.attributes && item.attributes[2]) ? item.attributes[2].id : ''), )} 
        className={(item.inStock ? styles.prodAdd : styles.inStockFalse)}><span className={styles.cartIcon}><span className={styles.redLine}></span></span></button>       
      </li>
    )
  }  
  componentDidMount() {    
    client.setEndpoint("http://localhost:4000/graphql");
    
    const queryStartData = new Query("categories", true)     
      .addField(new Field("name"))
      .addField(new Field("products{id, name, brand, attributes {id}, inStock, gallery, prices{amount}}"))      
  
      client.post(queryStartData).then(result => {        
        const newData = JSON.parse(JSON.stringify(result.categories[0].products))
        const newTitle = result.categories[0].name
        this.setState({               
        startData: newData,
        startTitle: newTitle           
        });           
      console.log(this.state.startData[0].attributes[0].id) 
    });
  }

  render() {
    return (
      <section className="men">
          <div className="container">
            <h3 className={styles.title}>{this.state.startTitle}</h3>
            <ul className={styles.products}>
             {this.createList()}             
            </ul>
          </div>
      </section>
    );
  } 
}

StartPage.contextType = OverallData;

export default StartPage;