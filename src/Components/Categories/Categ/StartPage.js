import React from 'react';
import Categ from './Categ';
class StartPage extends React.PureComponent { // eslint-disable-next-line 
    constructor(props) { 
      super(props);  
    }
    
        
    componentDidMount() {
      this.props.changeStartPage('no')
    }

    componentWillUnmount() {
      this.props.changeStartPage('no')
    }  
  
    render() {
      const {currentCategory, categoryChanged, setDefaultCategoryChanged, startPage, changeStartPage, setCurrentProduct, addToCart, setDisplaySignIn, displaySignIn} = this.props
      return (        
        <Categ currentCategory={currentCategory} categoryChanged={categoryChanged} setDefaultCategoryChanged={setDefaultCategoryChanged} startPage={startPage} changeStartPage={changeStartPage} setCurrentProduct={setCurrentProduct} addToCart={addToCart} setDisplaySignIn={setDisplaySignIn} displaySignIn={displaySignIn}/>     
      );
    } 
  }

  export default StartPage;