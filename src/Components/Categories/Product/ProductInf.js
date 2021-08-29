import React from 'react';
import * as styles from './Product.module.css';
import OverallData from '../../../Context';
import ProductAttrButtons from '../../../Elements/AttrButtons/ProductAttrButtons';
import signIn from '../../../Utils/SignIn';
//import returnDescription from '../../../Utils/ReturnDescription';
class ProductInf extends React.PureComponent { 
  constructor(props) {
    super(props);
    this.descrRef = React.createRef();

    this.signIn = this.signIn.bind(this)     
  }

  creatAttributeNameList() {
    if (!this.props.savedState.product.attributes[0]) return '';
    let list = [];
    this.props.savedState.product.attributes.forEach(item => {
      list.push(item.id);
    });
    return list;
  }

  creatAttributeOrdersList() {
    if (!this.props.savedState.product.attributes) return '';
    let list = [];
    const attrLength = this.props.savedState.product.attributes.length
    for (let i = 0; i < attrLength; i++) {
      list.push(0)
    }
    this.props.changeAttributeOrders(list)
    return list
  }

  setAttributes(order) {
    if (this.props.savedState.product.attributes.length < order + 1) return ''       
    return (
      <div>
        <ProductAttrButtons savedState={JSON.parse(JSON.stringify(this.props.savedState.product))} order={order} btnStyle={this.props.savedState.product.attributes[order].id} changeAttributes={this.props.changeAttributes} attributeOrders={this.props.attributeOrders} changeAttributeOrders={this.props.changeAttributeOrders}/>
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

  //returnDescription = (в пропсах - здесь аргс) => returnDescription.call(this, 'arg1', 'arg2') // объявление имп функцииб потом ее можно вызвать

  componentDidMount() {
      this.descrRef.current.innerHTML = this.props.savedState.product.description
      if (this.props.attributeOrders === '') {
        this.creatAttributeOrdersList()
      }         
  }

  componentDidUpdate() {
    this.descrRef.current.innerHTML = this.props.savedState.product.description
    if (this.props.attributeOrders === '') {
      this.creatAttributeOrdersList()      
    }
  }

  componentWillUnmount() {
    this.props.changeAttributeOrders('')
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
                    this.props.addToCart(this.props.savedState.instock, this.props.savedState.product.id, this.creatAttributeNameList(), this.props.attributeOrders, this.props.savedState.product.attributes, this.props.savedState.attributes_1,  this.props.savedPrices, this.props.savedState.gallery, this.props.savedState.product.name, this.props.savedState.product.brand);}}
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