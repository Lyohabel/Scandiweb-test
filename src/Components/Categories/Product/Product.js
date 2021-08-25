import React from 'react';
import { client, Query} from "@tilework/opus";
import * as styles from './Product.module.css';
import ProductImages from './ProductImages';
import ProductInf from './ProductInf';
import ProductAttrButtons from './ProductAttrButtons';
//import getProduct from '../../../Queries/GetProduct';
//import {testUtil} from '../../../Utils/TestUtil';
//import returnDescription from '../../../Utils/ReturnDescription';
class Product extends React.Component { 
  constructor(props) {
    super(props);
    this.descrRef = React.createRef();
    this.state = {      
      product: '',
      gallery: '',     
      prices: '',
      instok: '',
      attributes_1: '',
      productAdded: 'no',
      add: styles.add        
    }
    this.signIn = this.signIn.bind(this)     
  }  

  signIn() {
    document.cookie = 'login=user;'
    this.props.setDisplaySignIn('no')
  } 

  creatAttributeNameList() {
    if (!this.state.product.attributes[0]) return '';
    let list = [];
    this.state.product.attributes.forEach(item => {
      list.push(item.id);
    });
    return list;
  }

  // creatDefaultAttributesList() {
  //   if (!this.state.product.attributes[0]) return '';
  //   let list = [];
  //   this.state.product.attributes.forEach(item => {
  //     list.push(item.id);
  //   });
  //   return list;
  // }

  setAttributes(order) {
    if (this.state.product.attributes.length < order + 1) return ''   
    return (
      <div>
        <ProductAttrButtons savedState={this.state} order={order} btnStyle={this.state.product.attributes[order].id} changeAttributes={this.props.changeAttributes}/>
      </div>
      
    )    
  }

  returnAttributes(arr) {
    return arr && arr.map((item, index) =>
      <div key={item.id} className="attrWrapper">
        <h4 className={styles.sizeTitle}>{this.state.product.attributes[index] ? this.creatAttributeNameList()[index] : ''}</h4>
        {this.setAttributes(index)}
      </div>
    )    
  }

  //returnDescription = () => returnDescription.call(this, 'arg1', 'arg2') // объявление имп функцииб потом ее можно вызвать

  componentDidMount() {      
    const product = this.props.currentProduct !== '' ? this.props.currentProduct : this.props.match.params.id;

    //console.log(getProduct(product))

    //testUtil('XXX')

    client.setEndpoint("http://localhost:4000/graphql"); 

    const query = new Query("product", true)
   .addArgument("id", "String!", product)   
   .addFieldList(["id", "name", "inStock", "gallery", "description", "brand", "attributes {id, items {value, id}}", "prices {amount}"])

    client.post(query).then(result => {
      this.setState({
      product: JSON.parse(JSON.stringify(result.product)),
      gallery: result.product.gallery,      
      instock: result.product.inStock,
      prices: result.product.prices.map(item => item.amount),
      attributes_1: ((result.product.attributes[0]) ? JSON.parse(JSON.stringify(result.product.attributes[0].items)) : '')
      });
      //this.descrRef.current.innerHTML = this.state.product.description
      //this.returnDescription();
      //console.log(this.state.product.description)                       
     });
         
  }
 
  componentWillUnmount() {
    this.props.setDefaultAttributes()
  }  

  render() {
    return (
      <section className="Product">
          <div className="container">                       
            <div className={styles.productItem}>

              <ProductImages gallery={this.state.gallery} currentProduct={this.props.currentProduct} savedProduct={this.props.match.params.id}/>

              <ProductInf savedState={JSON.parse(JSON.stringify(this.state))} changeAttributes={this.props.changeAttributes}/>

              {/* <div className={styles.prodWrapper}>
                <h3 className={styles.title}>{this.state.product.brand}</h3>
                <span className={styles.subtitle}>{this.state.product.name}</span>

                {this.state.product.attributes ? this.returnAttributes(this.state.product.attributes) : ''}                

                <h4 className={styles.priceTitle}>Price:</h4>

                <div className={styles.prodPrice}><span className={styles.currencySimbol}>{this.context.currencySimbol}</span><span className={styles.currencyAmount}>{this.state.prices[this.context.currencyNumber]}</span></div>

                <div className={styles.addWrapper}>
                  <button onClick={() => {
                    this.props.addToCart(this.state.instock, this.state.product.id, this.creatAttributeNameList(), this.state.product.attributes, this.state.attributes_1,  this.state.prices, this.state.gallery, this.state.product.name, this.state.product.brand);}}
                  className={(this.state.instock ? styles.add : styles.inStockFalse)}>
                    <span className={styles.out}>Out of stock</span><span className={styles.inStock}>Add to cart</span>                  
                  </button>

                  <button onClick={() => this.signIn()} className={styles.signIn} style={this.props.displaySignIn === 'yes' ? {display: 'block'} : {display: 'none'}}>Press to sign in</button>
                </div>              

                <div ref={this.descrRef} className={styles.prodDescription}></div>

              </div>               */}
            </div>              
          </div>
      </section>
    );
  } 
}

export default Product;