import React from 'react';
import { client, Query, Field } from "@tilework/opus";
import {NavLink} from 'react-router-dom';
import OverallData from '../../../Context';
import * as styles from './Categ.module.css';

class Categ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      currentCategoryData: ''
    }        
  }
  
  creatAttributeNameList(index) {
    if (!this.state.currentCategoryData[index].attributes[0]) return '';
    let list = [];
    this.state.currentCategoryData[index].attributes.forEach(item => {
      list.push(item.id);
    });    
    return list;
  }

  createList() {    
    return this.state.currentCategoryData && this.state.currentCategoryData.map((item, index) =>
      <li className={styles.productItem} id={item.id} key={item.id}>
        <NavLink className={styles.prodLink} to={"/product/" + item.id}> 
          <img onClick={() => this.props.setCurrentProduct(item.id)} className={styles.imgProd} src={item.gallery[0] || item.gallery} alt="#"/>
        </NavLink>

        <h3 className={styles.prodTitle}>{item.brand} <span className={styles.subtitle}>{item.name}</span></h3>                

        <div className={styles.prodPrice}><span>{this.context.currencySimbol}</span><span className={styles.priceNumber}>{item.prices[this.context.currencyNumber].amount}</span></div>

        <button onClick={() => this.props.addToCart(item.inStock, item.id, this.creatAttributeNameList(index) )}
        className={(item.inStock ? styles.prodAdd : styles.inStockFalse)}><span className={styles.cartIcon}><span className={styles.redLine}></span></span></button>       
      </li>
    )
  }  
  
  componentDidMount() { 
    client.setEndpoint("http://localhost:4000/graphql");    
  
    const query = new Query("category", true)
      .addArgument("input", "CategoryInput", { title : this.props.currentCategory})
      .addField(new Field("products", arguments.title, true).addFieldList(["id", "name", "brand", "attributes {id}", "inStock", "gallery", "prices{amount}"]))
  
    client.post(query).then(result => {
      this.setState({
        ...this.state,        
        currentCategoryData: JSON.parse(JSON.stringify(result.category.products)) 
      });   
    });    
  }

  componentDidUpdate() {    
    if (this.props.categoryChanged !== 'no') {
      client.setEndpoint("http://localhost:4000/graphql");    
    
      const query = new Query("category", true)
        .addArgument("input", "CategoryInput", { title : this.props.currentCategory})
        .addField(new Field("products", arguments.title, true).addFieldList(["id", "name", "brand", "attributes {id}", "inStock", "gallery", "prices{amount}"]))
    
      client.post(query).then(result => {
        this.setState({
          ...this.state,        
          currentCategoryData: JSON.parse(JSON.stringify(result.category.products))
        });
        
        this.props.setDefaultCategoryChanged()            
      });
    }   
  }  

  render() {
    return (
      <section className="men">
          <div className="container">
            <h3 className={styles.title}>{this.props.currentCategory}</h3>
            <ul className={styles.products}>
             {this.createList()}             
            </ul>
          </div>
      </section>
    );
  } 
}

Categ.contextType = OverallData;

export default Categ;