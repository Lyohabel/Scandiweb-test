import React from 'react';
//import { client, Query, Field } from "@tilework/opus";
import {NavLink} from 'react-router-dom';
import OverallData from '../../../Context';
import * as styles from './CategoryPage.module.css';

class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {           
      //products: ''
    }

    this.createList = this.createList.bind(this)	
  }

  showCurrency() {
    console.log(this.context.currency);
  }

  createList() {
    const thisCategoryData = this.context.categoriesData[0].category1
    return thisCategoryData && thisCategoryData.map(item =>
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
    // client.setEndpoint("http://localhost:4000/graphql");

    // const query = new Query("category", true)
    // .addArgument("input", "CategoryInput", { title : "tech"})
    // .addField(new Field("products", arguments.title, true).addFieldList(["id", "name", "inStock", "gallery", "description", "category", "attributes {items {value}}", "prices {currency,amount }"]))

    // client.post(query).then(result => {this.setState({
    //   ...this.state,
    //   products: result.category.products        
    //   });

    //   console.log(this.state.products);      
    // });
    
    //console.log(this.props.currencies.currencies[0])
    //console.log(this.context.currency.currency);
  }

  render() {
    return (
      <section className="men">
          <div className="container">
            <h3 className={styles.title}>Tech</h3>
            <ul className={styles.products}>
             {this.createList()}
             {/* <li><button onClick={() => this.showCurrency()}><div>'ZZZ'</div></button></li>             */}
            </ul>
          </div>
      </section>
    );
  } 
}

CategoryPage.contextType = OverallData;

export default CategoryPage;