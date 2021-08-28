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

  //returnDescription = () => returnDescription.call(this, 'arg1', 'arg2') // объявление имп функцииб потом ее можно вызвать

  async componentDidMount() {      
    const product = this.props.currentProduct !== '' ? this.props.currentProduct : this.props.match.params.id;   

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
    return (
      <section className="Product">
          <div className="container">                       
            <div className={styles.productItem}>

              <ProductImages gallery={this.state.gallery} currentProduct={this.props.currentProduct} savedProduct={this.props.match.params.id}/>

              <ProductInf savedState={JSON.parse(JSON.stringify(this.state))} savedPrices={JSON.parse(JSON.stringify(this.state.prices))} changeAttributes={this.props.changeAttributes} addToCart={this.props.addToCart} attributeOrders={this.props.attributeOrders} changeAttributeOrders={this.props.changeAttributeOrders} setDisplaySignIn={this.props.setDisplaySignIn} displaySignIn={this.props.displaySignIn}/>
            </div>              
          </div>
      </section>
    );
  } 
}

export default Product;