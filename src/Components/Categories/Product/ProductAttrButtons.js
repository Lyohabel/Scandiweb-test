import React from 'react';
//import { client, Query} from "@tilework/opus";
import OverallData from '../../../Context';
import * as styles from './Product.module.css'
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
      add: styles.add        
    }
    //this.signIn = this.signIn.bind(this)     
  }  

  // signIn() {
  //   document.cookie = 'login=user;'
  //   this.props.setDisplaySignIn('no')
  // }  

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

  createButtons(btnStyle, order) {
    const attrs = JSON.parse(JSON.stringify(this.props.savedState.product.attributes[0].items)) 
    return attrs && attrs.map((item, index, array) =>
      <button id={index} key={item.value} value={item.value} 
      
      // onClick={() => {this.markAttribute(item.value, order);
      //   this.props.changeAttributes(this.creatAttributeNameList()[order], item.value, this.state.prices, this.state.gallery, this.state.product.name, this.state.product.brand)}}

      // className={(btnStyle !== COLOR) ? ((this.state[`activeAttribute_${order}`] === item.value) ? this.state.sizeButton.b : ((index === 0 && this.state[`defaultActiveAttribute_${order}`] !== order) ? this.state.sizeButton.b : this.state.sizeButton.a)) : ((this.state[`activeAttribute_${order}`] === item.value) ? this.state.colorButton.b : ((index === 0 && this.state[`defaultActiveAttribute_${order}`] !== order) ? this.state.colorButton.b : this.state.colorButton.a))} 

      // style={btnStyle !== COLOR ? {width: `calc(95% / ${array.length})`} : {backgroundColor: item.value, width: `calc(95% / ${array.length})`}}
      >A1
        {/* {btnStyle !== COLOR ? item.value : ''}
        <span className={styles.displayValue}>{item.id}</span> */}
      </button>
      )
  }

  render() {
    return (
      <section onClick={console.log(this.props.savedState.product.attributes)} className="ProductAttrButtons">        
         {this.createButtons()}
      </section>
    );
  } 
}

ProductAttrButtons.contextType = OverallData;

export default ProductAttrButtons;