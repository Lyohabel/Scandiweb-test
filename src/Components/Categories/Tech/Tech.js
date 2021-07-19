import React from 'react';
import { client, Query, Field } from "@tilework/opus";
import {NavLink} from 'react-router-dom';
import OverallData from '../../../Context';
import * as styles from './Tech.module.css';

class Tech extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategoryData: ''
    }

    this.createList = this.createList.bind(this)
  }

  createList() {    
    return this.state.currentCategoryData && this.state.currentCategoryData.map(item =>
      <li className={styles.productItem} id={item.id} key={item.id}>
        <NavLink className={styles.prodLink} to={"/product/" + "tech;" + item.id}> 
          <img className={styles.imgProd} src={item.gallery[0] || item.gallery} alt="#"/>
        </NavLink>

        <span onClick={(event) => this.props.makeProdData(event)} className={styles.prodName}>{item.name}</span>

        <div className={styles.prodPrice}><span>{this.context.currencySimbol}</span><span className={styles.priceNumber}>{item.prices[this.context.currencyNumber].amount}</span></div>

        <button onClick={() => this.props.changeCountCart()} className={styles.prodAdd}><span></span></button>       
      </li>
    )
  }
  
  componentDidMount() {  
    const fromHref = window.location.href.split('/')[3];
        
    client.setEndpoint("http://localhost:4000/graphql");    
  
    const query = new Query("category", true)
      .addArgument("input", "CategoryInput", { title : fromHref})
      .addField(new Field("products", arguments.title, true).addFieldList(["id", "name", "inStock", "gallery", "description", "category", "attributes {items {value}}", "prices {currency,amount }"]))
  
      client.post(query).then(result => {
        const newData = result.category.products
        this.setState({
        ...this.state,        
        currentCategoryData: newData           
      });     
    });
    
  }

  render() {
    return (
      <section className="men">
          <div className="container">
            <h3 className={styles.title}>Tech</h3>
            <ul className={styles.products}>
             {this.createList()}             
            </ul>
          </div>
      </section>
    );
  } 
}

Tech.contextType = OverallData;

export default Tech;