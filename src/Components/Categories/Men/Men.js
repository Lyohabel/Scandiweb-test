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
      list: '',
      products: ''
    }

    this.showList = this.showList.bind(this)
    this.createList = this.createList.bind(this)
	
  }

  createList = () => {
    console.log(this.state.products);
    console.log(this.state.list);   
    let htmlList = []
    htmlList = this.state.products.map((product, index) => {
      return (<div>"XXXXXXX"</div>
        // <li className={styles.productItem} key={index} id={index}>
        //   <NavLink className={styles.prodLink} to="/product">
        //     <img className={styles.imgProd} src={imgProd1} alt="#"/>
        //   </NavLink>               
        //   <span className={styles.prodName}>Apollo Running Short</span>
        //   <div className={styles.prodPrice}><span>$</span><span className={styles.priceNumber}>50</span><span>.00</span></div>
        // </li>
      )
    })

    console.log(htmlList);
    //return htmlList.length > 0 ? htmlList : ''

    this.setState({
      ...this.state,
      list: (htmlList.length > 0 ? htmlList : '')
    })    
     
  }



  showList() {
    console.log(this.state.products);   
    this.createList()
    // this.setState({
    //   ...this.state,
    //   list: newList
    // })
    console.log(this.state.list);
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

      console.log(this.state.products);      
    });    
  }

  render() {
    return (
      <section className="men">
          <div className="container">
            <h3 className={styles.title}>Men</h3>
            <ul className={styles.products}>
             {"MEN"}
             <button onClick={() => this.showList()}>show</button>
              {/* <li className={styles.productItem}>
                <NavLink className={styles.prodLink} to="/product">
                  <img className={styles.imgProd} src={imgProd1} alt="#"/>
                </NavLink>
               
                <span className={styles.prodName}>Apollo Running Short</span>
                <div className={styles.prodPrice}><span>$</span><span className={styles.priceNumber}>50</span><span>.00</span></div>
                <button onClick={() => this.showList()}>show</button>
              </li>
              <li className={styles.productItem}>               
                <img className={styles.imgProd} src={imgProd2} alt="#"/>                               
                <span className={styles.prodName}>Apollo Running Short</span>
                <div className={styles.prodPrice}><span>$</span><span className={styles.priceNumber}>50</span><span>.00</span></div>
              </li>
              <li className={styles.productItem}>
                <img className={styles.imgProd} src={imgProd3} alt="#"/>
                <span className={styles.prodName}>Apollo Running Short</span>
                <div className={styles.prodPrice}><span>$</span><span className={styles.priceNumber}>50</span><span>.00</span></div>
              </li>
              <li className={styles.productItem}>
                <img className={styles.imgProd} src={imgProd4} alt="#"/>
                <span className={styles.prodName}>Apollo Running Short</span>
                <div className={styles.prodPrice}><span>$</span><span className={styles.priceNumber}>50</span><span>.00</span></div>
              </li>
              <li className={styles.productItem}>
                <img className={styles.imgProd} src={imgProd1} alt="#"/>
                <span className={styles.prodName}>Apollo Running Short</span>
                <div className={styles.prodPrice}><span>$</span><span className={styles.priceNumber}>50</span><span>.00</span></div>
              </li>
              <li className={styles.productItem}>
                <img className={styles.imgProd} src={imgProd5} alt="#"/>
                <span className={styles.prodName}>Apollo Running Short</span>
                <div className={styles.prodPrice}><span>$</span><span className={styles.priceNumber}>50</span><span>.00</span></div>
              </li> */}
            </ul>
          </div>
      </section>
    );
  } 
}

export default Men;