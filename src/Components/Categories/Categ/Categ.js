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
    this.signIn = this.signIn.bind(this)     
  }  

  signIn() {
    document.cookie = 'login=user;'
    this.props.setDisplaySignIn('no')
  }
  
  creatAttributeNameList(index) {
    if (!this.state.currentCategoryData[index].attributes[0])  return '';
    let list = [];

    this.state.currentCategoryData[index].attributes.forEach(item => {
      list.push(item.id);
    }); 
      
    return list;
  }

  createList(data) {    
    return data && data.map((item, index) =>
      <li className={styles.productItem} id={item.id} key={item.id}>
        <NavLink className={styles.prodLink} to={"/product/" + item.id}> 
          <img onClick={() => this.props.setCurrentProduct(item.id)} className={styles.imgProd} src={item.gallery[0] || item.gallery} alt="#"/>
        </NavLink>

        <div className={styles.prodInf}>
          <h3 className={styles.prodTitle}>{item.brand} <span className={styles.subtitle}>{item.name}</span></h3>
       
          <div className={styles.prodPrice}>
            <span>{this.context.currencySimbol}</span><span className={styles.priceNumber}>{item.prices[this.context.currencyNumber].amount}</span>
          </div>
        </div>

        <div className={styles.prodAddWrapper}>
        <button onClick={() => {
          this.props.addToCart(item.inStock, item.id, this.creatAttributeNameList(index), item.attributes, (item.attributes[0] ? item.attributes[0].items : ''), item.prices.map(item => item.amount), item.gallery, item.name, item.brand);
        }}
        className={(item.inStock ? styles.prodAdd : styles.inStockFalse)}><span className={styles.cartIcon}><span className={styles.redLine}></span></span></button>

        <button className={styles.prodSignIn} onClick={() => this.signIn()} style={this.props.displaySignIn === 'yes' ? {display: 'block'} : {display: 'none'}}>Press to sign in</button>
        </div>    
      </li>
    )
  } 
  
  componentDidMount() { 
    client.setEndpoint("http://localhost:4000/graphql");
    
    if (this.props.startPage && this.props.startPage === 'yes') {
      const query = new Query("category", true)      
      .addField(new Field("products", arguments.title, true).addFieldList(["id", "name", "brand", "attributes{id, items{value, id}}", "inStock", "gallery", "prices{amount}"]))
  
      client.post(query).then(result => {
        this.setState({       
          currentCategoryData: JSON.parse(JSON.stringify(result.category.products))
        });      
      });
    } else {
        const category = this.props.currentCategory === '' ? this.props.match.params.categ : this.props.currentCategory
        this.props.setSavedCategory(category)

        const query = new Query("category", true)
          .addArgument("input", "CategoryInput", { title : category})
          .addField(new Field("products", arguments.title, true).addFieldList(["id", "name", "brand", "attributes{id, items{value, id}}", "inStock", "gallery", "prices{amount}"]))
      
        client.post(query).then(result => {
          this.setState({        
            currentCategoryData: JSON.parse(JSON.stringify(result.category.products))
          });      
        });
      }   
  }

  componentDidUpdate() {    
    if (this.props.categoryChanged !== 'no') {
      client.setEndpoint("http://localhost:4000/graphql");

    const category = this.props.currentCategory

      const query = new Query("category", true)
        .addArgument("input", "CategoryInput", { title : category})
        .addField(new Field("products", arguments.title, true).addFieldList(["id", "name", "brand", "attributes {id, items{value, id}}", "inStock", "gallery", "prices{amount}"]))
      
      client.post(query).then(result => {
        this.setState({       
          currentCategoryData: JSON.parse(JSON.stringify(result.category.products))
        });
        this.props.setDefaultCategoryChanged()                   
      });
    }
       
  }
  
  componentWillUnmount() {
    this.props.setDefaultCategoryChanged()    
  }  

  render() {
    return (
      <section className="categ">
          <div className="container">
            <h3 className={styles.title}>{this.props.currentCategory === '' ? "All products" : this.props.currentCategory}</h3>
            <ul className={styles.products}>
             {this.createList(this.state.currentCategoryData)}             
            </ul>
          </div>
      </section>
    );
  } 
}

Categ.contextType = OverallData;

export default Categ;