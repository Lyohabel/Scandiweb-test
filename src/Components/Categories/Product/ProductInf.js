import React from 'react';
import { client, Query} from "@tilework/opus";
import * as styles from './Product.module.css';
import OverallData from '../../../Context';
import ProductImages from './ProductImages';
import ProductAttrButtons from './ProductAttrButtons';
//import getProduct from '../../../Queries/GetProduct';
//import {testUtil} from '../../../Utils/TestUtil';
//import returnDescription from '../../../Utils/ReturnDescription';
class ProductInf extends React.Component { 
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
    if (!this.props.savedState.product.attributes[0]) return '';
    let list = [];
    this.props.savedState.product.attributes.forEach(item => {
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
    if (this.props.savedState.product.attributes.length < order + 1) return ''   
    return (
      <div>
        <ProductAttrButtons savedState={JSON.parse(JSON.stringify(this.props.savedState))} order={order} btnStyle={this.props.savedState.product.attributes[order].id} changeAttributes={this.props.changeAttributes}/>
      </div>
      
    )    
  }

  returnAttributes(arr) {
    return arr && arr.map((item, index) =>
      <div key={item.id} className="attrWrapper">
        <h4 className={styles.sizeTitle}>{this.props.savedState.product.attributes[index] ? this.creatAttributeNameList()[index] : ''}</h4>
        {this.setAttributes(index)}
      </div>
    )    
  }

  //returnDescription = () => returnDescription.call(this, 'arg1', 'arg2') // объявление имп функцииб потом ее можно вызвать

  componentDidMount() {      
  //   const product = this.props.currentProduct !== '' ? this.props.currentProduct : this.props.match.params.id;

  //   //console.log(getProduct(product))

  //   //testUtil('XXX')

  //   client.setEndpoint("http://localhost:4000/graphql"); 

  //   const query = new Query("product", true)
  //  .addArgument("id", "String!", product)   
  //  .addFieldList(["id", "name", "inStock", "gallery", "description", "brand", "attributes {id, items {value, id}}", "prices {amount}"])

  //   client.post(query).then(result => {
  //     this.setState({
  //     product: JSON.parse(JSON.stringify(result.product)),
  //     gallery: result.product.gallery,      
  //     instock: result.product.inStock,
  //     prices: result.product.prices.map(item => item.amount),
  //     attributes_1: ((result.product.attributes[0]) ? JSON.parse(JSON.stringify(result.product.attributes[0].items)) : '')
  //     });
      // this.descrRef.current.innerHTML = this.props.savedState.product.description
      // console.log(this.props.savedState.product.prices) 
      //this.returnDescription();                       
     //});     
  }

  componentDidUpdate() {
    this.descrRef.current.innerHTML = this.props.savedState.product.description
    const x = this.props.savedState.product.prices ? this.props.savedState.product.prices[this.context.currencyNumber].amount : 'XXX'
    console.log(x) 
  }
 
  // componentWillUnmount() {
  //   this.props.setDefaultAttributes()
  // }  

  render() {
    return (
      <section className="Product">         
              <div className={styles.prodWrapper}>
                <h3 className={styles.title}>{this.props.savedState.product.brand}</h3>
                <span className={styles.subtitle}>{this.props.savedState.product.name}</span>

                {this.props.savedState.product.attributes ? this.returnAttributes(this.props.savedState.product.attributes) : ''}                

                <h4 className={styles.priceTitle}>Price:</h4>

                <div className={styles.prodPrice}><span className={styles.currencySimbol}>{this.context.currencySimbol}</span><span className={styles.currencyAmount}>{this.props.savedState.prices ? this.props.savedState.prices[this.context.currencyNumber].amount : '999'}</span></div>

                <div className={styles.addWrapper}>
                  <button onClick={() => {
                    this.props.addToCart(this.state.instock, this.props.savedState.product.id, this.creatAttributeNameList(), this.props.savedState.product.attributes, this.props.savedState.attributes_1,  this.props.savedState.prices, this.props.savedState.gallery, this.props.savedState.product.name, this.props.savedState.product.brand);}}
                  className={(this.props.savedState.instock ? styles.add : styles.inStockFalse)}>
                    <span className={styles.out}>Out of stock</span><span className={styles.inStock}>Add to cart</span>                  
                  </button>

                  <button onClick={() => this.signIn()} className={styles.signIn} style={this.props.displaySignIn === 'yes' ? {display: 'block'} : {display: 'none'}}>Press to sign in</button>
                </div>              

                <div ref={this.descrRef} className={styles.prodDescription}></div>

              </div>
      </section>
    );
  } 
}

ProductInf.contextType = OverallData;

export default ProductInf;