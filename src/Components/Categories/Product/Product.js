import React from 'react';
import { client, Query} from "@tilework/opus";
import OverallData from '../../../Context';
import * as styles from './Product.module.css'
import {COLOR} from '../../../CONST';
import getProduct from '../../../Queries/GetProduct';
//import {testUtil} from '../../../Utils/TestUtil';
import returnDescription from '../../../Utils/ReturnDescription';
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

      activeAttribute_0: '',
      activeAttribute_1: '',
      activeAttribute_2: '',
      activeAttribute_3: '', // fallback unusing property
      activeAttribute_4: '', // fallback unusing property

      defaultActiveAttribute_0: '',
      defaultActiveAttribute_1: '',
      defaultActiveAttribute_2: '',
      defaultActiveAttribute_3: '', // fallback unusing property
      defaultActiveAttribute_4: '', // fallback unusing property      
      
      sizeButton: {
        a : styles.size,
        b : styles.sizeActive
      },

      colorButton: {
        a : styles.color,
        b : styles.colorActive
      },

      productAdded: 'no',
      add: styles.add,
      bigImage: ''   
    }
    this.signIn = this.signIn.bind(this)     
  }  

  signIn() {
    document.cookie = 'login=user;'
    this.props.setDisplaySignIn('no')
  }

  setBigImage(arg) {
    this.setState({   
      bigImage: arg    
      });
  }

  creatGallery() {
    const gl = this.state.gallery.length;
    if (gl === 1) {
      return ''
    } else {
      return this.state.gallery && this.state.gallery.map((item, index) =>
        <li key={item} className={styles.galleryItem}>
          <div className={this.state.bigImage === index ? styles.imgBig : styles.imgSmall}>
            <button onClick={() => this.setBigImage('')} className={styles.closeBigImage} style={this.state.bigImage === index ? {display: 'block'} : {display: 'none'}}>&times;</button>
            <img onClick={() => this.setBigImage(index)} className={styles.imgGalleryItem} src={item} alt="#"/>            
          </div>          
        </li>
      )
    }
  }

  markAttribute(value, order) {
    this.setState({
      ['defaultActiveAttribute_' + order]: order,    
      ['activeAttribute_' + order]: value
    });
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

  createButtons(attrs, btnStyle, order) {
    return attrs && attrs.map((item, index, array) =>
      <button id={index} key={item.value} value={item.value} 
      choosed={(this.state[`activeAttribute_${order}`] === item.value) ? "yes" : ((index === 0 && this.state[`defaultActiveAttribute_${order}`] !== order) ? "yes" : "no")}
      onClick={() => {this.markAttribute(item.value, order);
        this.props.changeAttributes(this.creatAttributeNameList()[order], item.value, this.state.prices, this.state.gallery, this.state.product.name, this.state.product.brand)}}

      className={(btnStyle !== COLOR) ? ((this.state[`activeAttribute_${order}`] === item.value) ? this.state.sizeButton.b : ((index === 0 && this.state[`defaultActiveAttribute_${order}`] !== order) ? this.state.sizeButton.b : this.state.sizeButton.a)) : ((this.state[`activeAttribute_${order}`] === item.value) ? this.state.colorButton.b : ((index === 0 && this.state[`defaultActiveAttribute_${order}`] !== order) ? this.state.colorButton.b : this.state.colorButton.a))} 

      style={btnStyle !== COLOR ? {width: `calc(95% / ${array.length})`} : {backgroundColor: item.value, width: `calc(95% / ${array.length})`}}>
        {btnStyle !== COLOR ? item.value : ''}
        <span className={styles.displayValue}>{item.id}</span>
      </button>
      )
  }

  setAttributes(order) {
    if (this.state.product.attributes.length < order + 1) return ''   
    return (
      <div className={styles.chooseSize}>
        {this.createButtons(this.state.product.attributes[order].items, this.state.product.attributes[order].id, order)}           
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
  // returnDescription() {
  //   returnDescription(this.state.product.description)
  //   // console.log(this.descrRef)
  //   // return this.state.product.description
  // }

  returnDescription = () => returnDescription.call(this, 'arg1', 'arg2') // объявление имп функцииб потом ее можно вызвать
  componentDidMount() {      
    const product = this.props.currentProduct !== '' ? this.props.currentProduct : this.props.match.params.id;   

   
    
    console.log(getProduct(product))

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
      this.descrRef.current.innerHTML = this.state.product.description
      this.returnDescription();                       
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
              <div className={styles.galleryWrapper}>
                <ul className={styles.galleryList}>
                  {this.creatGallery()}
                </ul>

                <div className={this.state.bigImage === 'main' ? styles.mainImgBig : styles.imgProd}>
                  <button onClick={() => this.setBigImage('')} className={styles.closeBigImage} style={this.state.bigImage === 'main' ? {display: 'block'} : {display: 'none'}}>&times;</button>
                  <img onClick={() => this.setBigImage('main')} src={this.state.gallery[0]} alt="#"/>
                </div>
              </div>

              <div className={styles.prodWrapper}>
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

              </div>              
            </div>              
          </div>
      </section>
    );
  } 
}

Product.contextType = OverallData;

export default Product;