import React from 'react';
//import { client, Query} from "@tilework/opus";
import * as styles from './Product.module.css';
import OverallData from '../../../Context';
import ProductAttrButtons from './ProductAttrButtons';
//import getProduct from '../../../Queries/GetProduct';
import signIn from '../../../Utils/SignIn';
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

  // signIn() {
  //   document.cookie = 'login=user;'
  //   this.props.setDisplaySignIn('no')
  // } 

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

  signIn = () => signIn.call(this)

  //returnDescription = () => returnDescription.call(this, 'arg1', 'arg2') // объявление имп функцииб потом ее можно вызвать

  componentDidMount() {
      this.descrRef.current.innerHTML = this.props.savedState.product.description
      console.log(this.props.savedState.attributes)         
  }

  componentDidUpdate() {
    this.descrRef.current.innerHTML = this.props.savedState.product.description
    console.log(this.props.savedState.attributes)   
  }

  render() {
    return (
      <section className="Product">         
              <div className={styles.prodWrapper}>
                <h3 className={styles.title}>{this.props.savedState.product.brand}</h3>
                <span className={styles.subtitle}>{this.props.savedState.product.name}</span>

                {this.props.savedState.product.attributes ? this.returnAttributes(this.props.savedState.product.attributes) : ''}                

                <h4 className={styles.priceTitle}>Price:</h4>

                <div className={styles.prodPrice}><span className={styles.currencySimbol}>{this.context.currencySimbol}</span><span className={styles.currencyAmount}>{this.props.savedPrices[this.context.currencyNumber]}</span></div>

                <div className={styles.addWrapper}>
                  <button onClick={() => {
                    this.props.addToCart(this.props.savedState.instock, this.props.savedState.product.id, this.creatAttributeNameList(), this.props.savedState.product.attributes, this.props.savedState.attributes_1,  this.props.savedPrices, this.props.savedState.gallery, this.props.savedState.product.name, this.props.savedState.product.brand);}}
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