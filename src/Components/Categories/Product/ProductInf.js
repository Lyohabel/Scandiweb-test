import React from 'react';
import * as styles from './Product.module.css';
import OverallData from '../../../Context';
import signIn from '../../../Utils/SignIn';
import creatAttributeNameList from '../../../Utils/CreatAttributeNameList';
import creatAttributeOrdersList from '../../../Utils/CreatAttributeOrdersList';
import setAttributes from './ProdUtils/SetAttributes';
import returnAttributes from './ProdUtils/ReturnAttributes';
class ProductInf extends React.PureComponent { 
  constructor(props) {
    super(props);
    this.descrRef = React.createRef(); 
  }

  setAttributes = (order) => setAttributes.call(this, order)

  returnAttributes = (arr) => returnAttributes.call(this, arr)
  
  signIn = () => signIn.call(this)

  creatAttributeNameList = (arg) => creatAttributeNameList.call(this, arg)
  
  creatAttributeOrdersList = (arg) => creatAttributeOrdersList.call(this, arg)

  componentDidMount() {
    const {attributeOrders, changeAttributeOrders} = this.props
    const {attributes, description} = this.props.savedState.product

    this.descrRef.current.innerHTML = description
    if (attributeOrders === '') {
      const orders = this.creatAttributeOrdersList(attributes)
      changeAttributeOrders(orders)
    }         
  }

  componentDidUpdate() {
    const {changeAttributeOrders} = this.props
    const {attributes, description} = this.props.savedState.product

    this.descrRef.current.innerHTML = description
    if (this.props.attributeOrders === '') {
      const orders = this.creatAttributeOrdersList(attributes)
      changeAttributeOrders(orders)      
    }
  }

  componentWillUnmount() {
    this.props.changeAttributeOrders('')
  }

  render() {
    const {savedPrices, addToCart, attributeOrders, displaySignIn} = this.props
    const {instock, attributes_1, gallery} = this.props.savedState
    const {brand, name, attributes, id} = this.props.savedState.product
    return (
      <section className="Product">         
              <div className={styles.prodWrapper}>
                <h3 className={styles.title}>{brand}</h3>
                <span className={styles.subtitle}>{name}</span>

                {attributes ? this.returnAttributes(attributes) : ''}                

                <h4 className={styles.priceTitle}>Price:</h4>

                <div className={styles.prodPrice}><span className={styles.currencySimbol}>{this.context.currencySimbol}</span><span className={styles.currencyAmount}>{savedPrices[this.context.currencyNumber]}</span></div>

                <div className={styles.addWrapper}>
                  <button onClick={() => {
                    addToCart(instock, id, this.creatAttributeNameList(attributes), attributeOrders, attributes, attributes_1,  savedPrices, gallery, name, brand);}}
                  className={(instock ? styles.add : styles.inStockFalse)}>
                    <span className={styles.out}>Out of stock</span><span className={styles.inStock}>Add to cart</span>                  
                  </button>

                  <button onClick={() => this.signIn()} className={styles.signIn} style={displaySignIn === 'yes' ? {display: 'block'} : {display: 'none'}}>Press to sign in</button>
                </div>              

                <div ref={this.descrRef} className={styles.prodDescription}></div>

              </div>
      </section>
    );
  } 
}

ProductInf.contextType = OverallData;

export default ProductInf;