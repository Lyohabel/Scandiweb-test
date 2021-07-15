import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { client, Query, Field } from "@tilework/opus";
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
      countCart: 0,
      display: 'none'     
  }

    this.changeCountCart = this.changeCountCart.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
	
  }

  changeCountCart() {    
    let newCount = this.state.countCart;
    newCount++;
    this.setState({
      countCart: newCount,
      display: 'flex',
      products: '',
      currencies: ''
    })    
  }

  changeCurrency(event) {    
    const newCurrency = event.target.innerHTML.split('', 1);
    this.setState({currency: newCurrency})    
  }

  componentDidMount() {
    client.setEndpoint("http://localhost:4000/graphql");

    const query = new Query("category", true)
    .addField("name")
    .addField(new Field("products", true).addFieldList(["id", "name", "inStock", "gallery", "description", "category", "attributes {items {value}}", "prices {currency,amount }"]))
      // .addField(new Field("products {id, name, inStock, gallery, description, category, attributes {items {value}}, prices {currency,amount }}"))


      

      

      client.post(query).then(result => {this.setState({
        ...this.state,
        products: result.category.products,
        // countCart: newCount,
        // display: 'flex',
      });
      console.log(this.state.products);
    });

    const queryCurrencies = new Query("currencies", true)

      let cur;
      
      client.post(queryCurrencies).then(result => {this.setState({
        ...this.state,
        currencies: result             
      });
      //console.log(this.state.currencies);
    });
      
  }

  render() {
    return (
      <BrowserRouter >
          <OverallData.Provider value={{currency: this.state.currency}}>
            <Nav cur={this.state.cur} changeCurrency={this.changeCurrency} countCart={this.state.countCart} display={this.state.display}/>          
            <Switch>
              <Route exact path='/'>           
                <Women products={this.state.products} currencies={this.state.currencies}/>            
              </Route>
              <Route path='/men'>
                <Men products={this.state.products} currencies={this.state.currencies}/>
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
