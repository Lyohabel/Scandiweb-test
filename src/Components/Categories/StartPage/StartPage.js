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
    this.signIn = this.signIn.bind(this)     
  }  

  signIn() {
    document.cookie = 'login=user;'
    this.props.setDisplaySignIn('no')
  }

  creatAttributeNameList(index) {
    if (!this.state.startData[index].attributes[0]) return '';
    let list = [];
    this.state.startData[index].attributes.forEach(item => {
      list.push(item.id);
    });    
    return list;
  } // 

  createList() {      
    return this.state.startData && this.state.startData.map((item, index) =>
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

        <button onClick={() => {
          this.props.addToCart(item.inStock, item.id, this.creatAttributeNameList(index),
          item.attributes, (item.attributes[0] ? item.attributes[0].items : ''),
          item.prices.map(item => item.amount), item.gallery, item.name, item.brand);
        }} 
        className={(item.inStock ? styles.prodAdd : styles.inStockFalse)}><span className={styles.cartIcon}><span className={styles.redLine}></span></span></button>

        <button className={styles.prodSignIn} onClick={() => this.signIn()} style={this.props.displaySignIn === 'yes' ? {display: 'block'} : {display: 'none'}}>Press to sign in</button>      
      </li>
    )
  }  
  componentDidMount() {    
    client.setEndpoint("http://localhost:4000/graphql");
    
    const queryStartData = new Query("categories", true)     
      .addField(new Field("name"))
      .addField(new Field("products{id, name, brand, attributes{id, items{value, id}}, inStock, gallery, prices{amount}}"))      
  
      client.post(queryStartData).then(result => {       
        this.setState({               
        startData: JSON.parse(JSON.stringify(result.categories[0].products)),
        startTitle: result.categories[0].name           
        });
    });
  }

  render() {
    return (
      <section className="categ">
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