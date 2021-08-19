import React from 'react';
import Categ from './Categ';
import {POPUP} from '../../../CONST';

class StartPage extends React.Component {
    constructor(props) { 
      super(props);
      this.state = {
        startPage: 'yes'
      }
      
      this.changeStartPage = this.changeStartPage.bind(this)      
    }
    
    changeStartPage() {
      this.setState({
        startPage: 'no'
      }); 
    }
    
    componentDidMount() {
     
    }
  
    render() {
      return (
        <Categ currentCategory={this.props.currentCategory} categoryChanged={this.props.categoryChanged} setDefaultCategoryChanged={this.props.setDefaultCategoryChanged} startPage={this.state.startPage} changeStartPage={this.changeStartPage} setCurrentProduct={this.props.setCurrentProduct} addToCart={this.props.addToCart} setDisplaySignIn={this.props.setDisplaySignIn} displaySignIn={this.props.displaySignIn} 
        style={this.props.position !== POPUP ? {position: 'static'} : {position: 'fixed'}}/>     
      );
    } 
  }

  export default StartPage;