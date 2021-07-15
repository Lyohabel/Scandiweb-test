import React from 'react';
import { client, Query, Field } from "@tilework/opus";
import {NavLink} from 'react-router-dom';
import imgProd1 from '../../../ImagesTemp/black.png';
import imgProd2 from '../../../ImagesTemp/bag.png';
import imgProd3 from '../../../ImagesTemp/beige.png';
import imgProd4 from '../../../ImagesTemp/grey.png';
import imgProd5 from '../../../ImagesTemp/white.png'
import * as styles from './Men.module.css'
class Men extends React.Component {
  constructor(props) {
    super(props);
    this.state = {     
      products: ''
    }

    this.createList = this.createList.bind(this)	
  }

  createList() {
    return this.state.products && this.state.products.map(item =>
      <li className={styles.productItem} id={item.id}>
        <NavLink className={styles.prodLink} to="/product">
          <img className={styles.imgProd} src={item.gallery[0] || item.gallery} alt="#"/>
        </NavLink>

        <span className={styles.prodName}>{item.name}</span>

        <div className={styles.prodPrice}><span>$</span><span className={styles.priceNumber}>{item.prices[0].amount}</span></div>        
      </li>
    )
  }
  
  componentDidMount() {
    client.setEndpoint("http://localhost:4000/graphql");

    const query = new Query("category", true)//.addArgument("products", "String", { title : "tech"})
    //.addField("name")
    .addField(new Field("products", arguments.title, true).addFieldList(["id", "name", "inStock", "gallery", "description", "category", "attributes {items {value}}", "prices {currency,amount }"]))

    client.post(query).then(result => {this.setState({
      ...this.state,
      products: result.category.products        
      });

      console.log(this.state.products[1]);      
    });    
  }

  render() {
    return (
      <section className="men">
          <div className="container">
            <h3 className={styles.title}>Men</h3>
            <ul className={styles.products}>
             {this.createList()}
             {/* <button onClick={() => this.showList()}>show</button> */}
              {/* <li >
                <NavLink className={styles.prodLink} to="/product">
                  <img className={styles.imgProd} src={imgProd1} alt="#"/>
                </NavLink>
               
                <span className={styles.prodName}>Apollo Running Short</span>
                <div className={styles.prodPrice}><span>$</span><span className={styles.priceNumber}>50</span><span>.00</span></div>
                <button onClick={() => this.showList()}>show</button>
              </li>
               */}
            </ul>
          </div>
      </section>
    );
  } 
}

export default Men;