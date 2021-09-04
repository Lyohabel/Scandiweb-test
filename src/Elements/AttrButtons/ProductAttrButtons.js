import React from 'react';
import OverallData from '../../Context';
import * as styles from './ProductAttrButtons.module.css'
import {COLOR, DEFAULT} from '../../CONST';

class ProductAttrButtons extends React.PureComponent { 
  constructor(props) { // {названия пропсов}
    super(props);
    this.descrRef = React.createRef();
    this.state = {
      attributes: '',      
      activeAttribute: '',
      defaultActiveAttribute: ''
    } 

  }


  markAttribute(value) {
    this.setState({    
      activeAttribute: value,
      defaultActiveAttribute: 1
    });
  }

  creatAttributeName(order) {
    if (!this.state.attributes[0]) return '';
    return this.state.attributes[order].id;
  }

  addAttrToCart(attr, value, order, index) {
    if (!window.localStorage.getItem('cart')) return;

    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);
    const x = jsonCart.findIndex(item => item.uniqueId === this.props.id);
    jsonCart[x].attrOrders[order] = index
    const key = attr.toLowerCase()
    let newAttr = {}
    newAttr[key] = value

    if (jsonCart[x].attrs === DEFAULT) {
      jsonCart[x].attrs = [newAttr]      
    } else {
      let y = jsonCart[x].attrs.findIndex(item => JSON.stringify(item).includes(key) === true)
      if(y !== -1) jsonCart[x].attrs.splice(y, 1)
      jsonCart[x].attrs.push(newAttr)
      }
     window.localStorage.setItem('cart', JSON.stringify(jsonCart));
  }

  changeAttributeOrders(order, index) {
    let list = this.props.attributeOrders;
    list[order] = index;
    this.props.changeAttributeOrders(list)
  }

  callFunctions(attrName, value, order, index) {
    if (this.props.cartProduct) {
      this.addAttrToCart(attrName, value, order, index)
    } else {
      this.props.changeAttributes(attrName, value, order, index);
      this.changeAttributeOrders(order, index);
    }
  }
  
  defineButtonClass(condition, index, item) { 
    switch(true) {  // eslint-disable-line      
      case (condition && (this.state.activeAttribute === item.value)): 
        return (condition !== COLOR ? styles.sizeActive : styles.colorActive);
      case (condition && (index === 0 && this.state.activeAttribute === '')): 
        return (condition !== COLOR ? styles.sizeActive : styles.colorActive);

      default: 
        return (styles.size);      
    }    
  }

  findSavedActiveAttribute() {
    if (this.props.cartProduct) {
      if (!window.localStorage.getItem('cart')) return;
      if (this.props.savedState.attrs === DEFAULT) return

      const attrName = this.props.savedState.attrNames[this.props.order]
      const attrIndex = this.props.savedState.attrs.findIndex(item => JSON.stringify(item).includes(attrName.toLowerCase()))      
      if (attrIndex === -1) return      
      const choosedAttrValue = Object.values(this.props.savedState.attrs[attrIndex])[0]     
      
      this.setState({    
        activeAttribute: choosedAttrValue        
      });
    }      
  }

  createButtons(btnStyle, order) {    
    const attrs = JSON.parse(JSON.stringify(this.props.savedState.attributes[order].items))
    const attrName = JSON.parse(JSON.stringify(this.props.savedState.attributes[order].id))
    
    return attrs && attrs.map((item, index, array) =>
      <button id={index} key={index} value={item.value}
      className={this.defineButtonClass(btnStyle, index, item)}
      
      onClick={() => {this.markAttribute(item.value); this.callFunctions(attrName, item.value, order, index)
      }}

      style={btnStyle !== COLOR ? {width: `calc(95% / ${array.length})`} : {backgroundColor: item.value, width: `calc(95% / ${array.length})`}}
      
      >
        {btnStyle !== COLOR ? item.value : ''}
        <span className={styles.displayValue}>{btnStyle === COLOR ? item.id : this.props.cartProduct ? attrName : item.id}</span> 
      </button>
      )
  }

  componentDidMount() {
    this.findSavedActiveAttribute()
  }

  render() {
    return (
      <section className={styles.productAttrButtons}>
                   
         {this.createButtons(this.props.btnStyle, this.props.order)}
      </section>
    );
  } 
}

ProductAttrButtons.contextType = OverallData;

export default ProductAttrButtons;