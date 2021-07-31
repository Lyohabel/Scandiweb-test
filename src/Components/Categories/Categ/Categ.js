import React from 'react';
import { client, Query, Field } from "@tilework/opus";
import {NavLink} from 'react-router-dom';
import OverallData from '../../../Context';
import * as styles from './Categ.module.css';

class Categ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      
      currentCategoryData: '',
      attr_1Id: '',
      attr_2Id: '',
      attr_3Id: ''    
    }
    //this.createList = this.createList.bind(this)    
  }  

  createList() {    
    return this.state.currentCategoryData && this.state.currentCategoryData.map((item, index) =>
      <li className={styles.productItem} id={item.id} key={item.id}>
        <NavLink className={styles.prodLink} to={"/product/" + item.id}> 
          <img onClick={() => this.props.setCurrentProduct(item.id)} className={styles.imgProd} src={item.gallery[0] || item.gallery} alt="#"/>
        </NavLink>

        <h3 className={styles.prodTitle}>{item.brand} <span className={styles.subtitle}>{item.name}</span></h3>                

        <div className={styles.prodPrice}><span>{this.context.currencySimbol}</span><span className={styles.priceNumber}>{item.prices[this.context.currencyNumber].amount}</span></div>

        <button onClick={() => this.props.addToCart(item.inStock, item.id, this.state.attr_1Id[index], this.state.attr_2Id[index], this.state.attr_3Id[index])} 
        className={(item.inStock ? styles.prodAdd : styles.inStockFalse)}><span className={styles.cartIcon}><span className={styles.redLine}></span></span></button>       
      </li>
    )
  }  
  
  componentDidMount() { 
    client.setEndpoint("http://localhost:4000/graphql");    
  
    const query = new Query("category", true)
      .addArgument("input", "CategoryInput", { title : this.props.currentCategory})
      .addField(new Field("products", arguments.title, true).addFieldList(["id", "name", "brand", "attributes {id}", "inStock", "gallery", "prices {currency,amount }"]))

      const attr_1Id = []
      const attr_2Id = []
      const attr_3Id = []
  
    client.post(query).then(result => {
      const newData = result.category.products     

      newData.forEach(element => {
        attr_1Id.push(element.attributes && element.attributes[0] ? element.attributes[0].id : '')
        attr_2Id.push(element.attributes && element.attributes[1] ? element.attributes[1].id : '')
        attr_3Id.push(element.attributes && element.attributes[2] ? element.attributes[2].id : '')
      });

      this.setState({
        ...this.state,        
        currentCategoryData: newData,
        attr_1Id: attr_1Id,
        attr_2Id: attr_2Id,
        attr_3Id: attr_3Id            
      });
      // console.log(newData)
      // console.log(this.state.attr_1Id)
      // console.log(this.state.attr_2Id)
      // console.log(this.state.attr_3Id)          
    });    
  }

  componentDidUpdate() {    
    if (this.props.categoryChanged !== 'no') {
      client.setEndpoint("http://localhost:4000/graphql");    
    
      const query = new Query("category", true)
        .addArgument("input", "CategoryInput", { title : this.props.currentCategory})
        .addField(new Field("products", arguments.title, true).addFieldList(["id", "name", "brand", "attributes {id}", "inStock", "gallery", "prices {currency,amount }"]))

      const attr_1Id = []
      const attr_2Id = []
      const attr_3Id = []
    
      client.post(query).then(result => {
        const newData = result.category.products
        newData.forEach(element => {
          attr_1Id.push(element.attributes && element.attributes[0] ? element.attributes[0].id : '')
          attr_2Id.push(element.attributes && element.attributes[1] ? element.attributes[1].id : '')
          attr_3Id.push(element.attributes && element.attributes[2] ? element.attributes[2].id : '')
        });
  
        this.setState({
          ...this.state,        
          currentCategoryData: newData,
          attr_1Id: attr_1Id,
          attr_2Id: attr_2Id,
          attr_3Id: attr_3Id            
        });
        // console.log(newData) 
        // console.log(this.state.attr_1Id)
        // console.log(this.state.attr_2Id)
        // console.log(this.state.attr_3Id)

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