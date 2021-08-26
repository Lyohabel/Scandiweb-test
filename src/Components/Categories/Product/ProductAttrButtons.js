import React from 'react';
//import { client, Query} from "@tilework/opus";
import OverallData from '../../../Context';
import * as styles from './ProductAttrButtons.module.css'
import {COLOR} from '../../../CONST';

class ProductAttrButtons extends React.Component { 
  constructor(props) {
    super(props);
    this.descrRef = React.createRef();
    this.state = {      
      product: '',
      gallery: '',     
      prices: '',
      instok: '',
      attributes_1: '',
      activeAttribute: '',
      defaultActiveAttribute: '',
      productAdded: 'no',
      add: styles.add        
    }
    //this.signIn = this.signIn.bind(this)     
  }

  markAttribute(value) {
    this.setState({    
      activeAttribute: value,
      defaultActiveAttribute: 1
    });
  }

  creatAttributeName(order) {
    if (!this.props.savedState.product.attributes[0]) return '';
    return this.props.savedState.product.attributes[order].id;
  }

  changeAttributeOrders(order, index) {
    let list = this.props.attributeOrders;
    list[order] = index;
    this.props.changeAttributeOrders(list)
  }
  // creatDefaultAttributesList() {
  //   if (!this.state.product.attributes[0]) return '';
  //   let list = [];
  //   this.state.product.attributes.forEach(item => {
  //     list.push(item.id);
  //   });
  //   return list;
  // }

  createButtons(btnStyle, order) {
    const attrs = JSON.parse(JSON.stringify(this.props.savedState.product.attributes[order].items)) 
    return attrs && attrs.map((item, index, array) =>
      <button id={index} key={item.value} value={item.value}
      className={(btnStyle !== COLOR) ? this.state.activeAttribute === item.value ? styles.sizeActive : 
        index === 0 && this.state.activeAttribute === '' ? styles.sizeActive : styles.size :
        this.state.activeAttribute === item.value ? styles.colorActive : 
        index === 0 && this.state.activeAttribute === '' ? styles.colorActive : styles.size
      }
      
      onClick={() => {this.markAttribute(item.value);        
        this.props.changeAttributes(this.creatAttributeName(order), item.value); this.changeAttributeOrders(order, index)
      }}

      style={btnStyle !== COLOR ? {width: `calc(95% / ${array.length})`} : {backgroundColor: item.value, width: `calc(95% / ${array.length})`}}
      
      >
        {btnStyle !== COLOR ? item.value : ''}
        <span className={styles.displayValue}>{item.id}</span> 
      </button>
      )
  }

  render() {//onClick={console.log(this.props.savedState.product.attributes)}
    return (
      <section className={styles.productAttrButtons}>        
         {this.createButtons(this.props.btnStyle, this.props.order)}
      </section>
    );
  } 
}

ProductAttrButtons.contextType = OverallData;

export default ProductAttrButtons;