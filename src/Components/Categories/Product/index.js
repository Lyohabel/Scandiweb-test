import React from 'react';
//import { client, Query} from "@tilework/opus";
import * as styles from './Product.module.css';
import ProductImages from './ProductImages';
import ProductInf from './ProductInf';
import getProduct from '../../../Queries/GetProduct';
//import returnDescription from '../../../Utils/ReturnDescription';
class Product extends React.PureComponent { 
  constructor(props) {
    super(props);
    this.descrRef = React.createRef();
    this.state = {      
      product: '',
      gallery: '',     
      prices: '',
      instok: '',
      attributes: '',
      attributes_1: '',
      productAdded: 'no',
      add: styles.add        
    }    
  }

  async componentDidMount() { 
    const {currentProduct} = this.props

    const product = currentProduct !== '' ? currentProduct : this.props.match.params.id;   

    const result = await JSON.parse(JSON.stringify((await getProduct(product)).product))

    this.setState({
      product: result,
      gallery: result.gallery,      
      instock: result.inStock,
      prices: result.prices.map(item => item.amount),
      attributes: JSON.parse(JSON.stringify(result.attributes)),
      attributes_1: ((result.attributes[0]) ? JSON.parse(JSON.stringify(result.attributes[0].items)) : '')
      });
  }
 
  componentWillUnmount() {
    this.props.setDefaultAttributes()
  }  

  render() {
    const {gallery, prices} = this.state
    const {currentProduct, changeAttributes, addToCart, attributeOrders, changeAttributeOrders, setDisplaySignIn, displaySignIn} = this.props

    return (
      <section className="Product">
          <div className="container">                       
            <div className={styles.productItem}>

              <ProductImages gallery={gallery} currentProduct={currentProduct} savedProduct={this.props.match.params.id}/>

              <ProductInf savedState={JSON.parse(JSON.stringify(this.state))} savedPrices={JSON.parse(JSON.stringify(prices))} changeAttributes={changeAttributes} addToCart={addToCart} attributeOrders={attributeOrders} changeAttributeOrders={changeAttributeOrders} setDisplaySignIn={setDisplaySignIn} displaySignIn={displaySignIn}/>
            </div>              
          </div>
      </section>
    );
  } 
}

export default Product;