import React from 'react';
import Categ from './Categ';
import {POPUP} from '../../../CONST';

class StartPage extends React.Component {
    constructor(props) { 
      super(props);
      this.state = {
        
      }
      
      //this.createCartList = this.createCartList.bind(this)      
    }    
    
    componentDidMount() {
     
    }
  
    render() {
      return (
        <Categ currentCategory={this.props.currentCategory} categoryChanged={this.props.categoryChanged} setDefaultCategoryChanged={this.props.setDefaultCategoryChanged} setCurrentProduct={this.props.setCurrentProduct} addToCart={this.props.addToCart} setDisplaySignIn={this.props.setDisplaySignIn} displaySignIn={this.props.displaySignIn} 
        style={this.props.position !== POPUP ? {position: 'static'} : {position: 'fixed'}}/>     
      );
    } 
  }

  export default StartPage;