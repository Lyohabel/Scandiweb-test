import React from 'react';
import OverallData from '../../Context';
import * as styles from './ProductAttrButtons.module.css'
import {DEFAULT} from '../../CONST';
import callFunctions from './AttrButtonsUtils/CallFunctions';
import addAttrToCart from './AttrButtonsUtils/AddAttrToCart';
import defineButtonClass from './AttrButtonsUtils/DefineButtonClass';
import changeAttributeOrders from './AttrButtonsUtils/ChangeAttributeOrders';
import createButtons from './AttrButtonsUtils/CreateButtons';

class ProductAttrButtons extends React.PureComponent { 
  constructor(props) {
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

  changeAttributeOrders = (order, index) => changeAttributeOrders.call(this, order, index)

  addAttrToCart = (attr, value, order, index) => addAttrToCart.call(this, attr, value, order, index) 

  callFunctions = (attrName, value, order, index) => callFunctions.call(this, attrName, value, order, index)
  
  defineButtonClass = (condition, index, item) => defineButtonClass.call(this, condition, index, item)  

  createButtons = (btnStyle, order) => createButtons.call(this, btnStyle, order)

  findSavedActiveAttribute() {
    const {attrs, attrNames} = this.props.savedState
    if (this.props.cartProduct) {
      if (!window.localStorage.getItem('cart')) return;
      if (attrs === DEFAULT) return
  
      const attrName = attrNames[this.props.order]
      const attrIndex = attrs.findIndex(item => JSON.stringify(item).includes(attrName.toLowerCase()))      
      if (attrIndex === -1) return      
      const choosedAttrValue = Object.values(attrs[attrIndex])[0]      
      
      this.setState({    
        activeAttribute: choosedAttrValue        
      });
    }      
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