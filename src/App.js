import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';
import Nav from './Components/Nav/Nav';
import Women from './Components/Categories/Women/Women';
import Men from './Components/Categories/Men/Men';
import Kids from './Components/Categories/Kids/Kids';
import Product from './Components/Categories/Product/Product';
import Cart from './Components/UserCart/Cart/Cart';
import OverallData from './Context'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: '$',
      countCart: 0      
  }

    this.changeCountCart = this.changeCountCart.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
	
  }

  changeCountCart() {    
    let newCount = this.state.countCart;
    newCount++;
    this.setState({countCart: newCount})    
  }

  changeCurrency(event) {    
    const newCurrency = event.target.innerHTML.split('', 1);
    this.setState({currency: newCurrency})    
  }

  componentDidMount() {

  }

  render() {
    return (
      <BrowserRouter >
          <OverallData.Provider value={{currency: this.state.currency}}>
            <Nav cur={this.state.cur} changeCurrency={this.changeCurrency} countCart={this.state.countCart}/>          
            <Switch>
              <Route exact path='/'>           
                <Women func={this.changeCountCart}/>            
              </Route>
              <Route path='/men'>
                <Men/>
              </Route>
              <Route path='/kids'>
                <Kids/>
              </Route>
              <Route path='/product'>
                <Product changeCountCart={this.changeCountCart}/>
              </Route>
              <Route path='/cart'>
                <Cart/>
              </Route>
            </Switch>
          </OverallData.Provider>
      </BrowserRouter >
    );
  } 
}

export default App;
