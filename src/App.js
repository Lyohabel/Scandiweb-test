import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { client, Query, Field } from "@tilework/opus";
import './App.css';
import Nav from './Components/Nav/Nav';
import StartPage from './Components/Categories/StartPage/StartPage';
import Test from './Components/Categories/Test/Test';
import Tech from './Components/Categories/Tech/Tech';
import CategoryPage from './Components/Categories/CategoryPage/CategoryPage';
import Product from './Components/Categories/Product/Product';
import Cart from './Components/UserCart/Cart/Cart';
import OverallData from './Context'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startData: '',
      categoriesList: [],
      currentCategoryData: '',      
      categoriesData: '',
      currencySimbol: '$',
      currencyNumber: 0,
      countCart: 0,
      display: 'none',
      tech: '',
      currencies: '',
      prodData: ''  
  }

    this.changeCountCart = this.changeCountCart.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);	
  }

  changeCountCart() {    
    let newCount = this.state.countCart;
    newCount++;
    this.setState({
      ...this.state,
      countCart: newCount,
      display: 'flex'      
    })    
  }

  changeCurrency(event) {    
    const newCurrencySimbol = event.target.innerHTML.split('', 2);
    const newCurrency = event.target.innerHTML.split(' ')[1];
    const newCurrencyNumber = this.state.currencies.indexOf(newCurrency);
    this.setState({
      ...this.state,
      currencySimbol: newCurrencySimbol,
      currencyNumber: newCurrencyNumber
    }) 
  }

  componentDidMount() {
    client.setEndpoint("http://localhost:4000/graphql");

    const queryCategoriesList = new Query("category", true)    
    .addField(new Field("products", true).addFieldList(["category"]))
    
    client.post(queryCategoriesList).then(result => {
      const unique = Array.from(new Set(result.category.products.map(JSON.stringify))).map(JSON.parse);
      
      this.setState({
      ...this.state,
      categoriesList: unique             
      });
    });

    const queryStartData = new Query("categories", true)     
      .addField(new Field("name"))
      .addField(new Field("products{id, name, inStock, gallery, description, category, attributes {id, name, type, items {displayValue, value, id}}, prices {currency,amount}, brand }"))

      // .addFieldList(["id", "name", "inStock", "gallery", "description", "category", "attributes {items {value}}", "prices {currency,amount }"]))
  
      client.post(queryStartData).then(result => {
        const newData = result.categories
        // this.setState({
        // ...this.state,        
        // startData: newData           
        // });
      console.log(newData)     
    });

    const queryCurrencies = new Query("currencies", true)      
      client.post(queryCurrencies).then(result => {this.setState({
        ...this.state,
        currencies: result.currencies                    
      });      
    });      
  }

  render() {
    return (
      <BrowserRouter >
          <OverallData.Provider value={{categoriesList: this.state.categoriesList, categoriesData: this.state.categoriesData, currencySimbol: this.state.currencySimbol, currencyNumber: this.state.currencyNumber}}>
            <Nav cur={this.state.cur} changeCurrency={this.changeCurrency} countCart={this.state.countCart} display={this.state.display}/>          
            <Switch>
              <Route exact path='/'>
                <StartPage/>
              </Route>

              <Route path='/test'>
                <Test products={this.state.products} currencies={this.state.currencies}/>                
              </Route>

              <Route path='/tech'>                
                <Tech tech={this.state.tech} currencies={this.state.currencies} changeCountCart={this.changeCountCart} makeProdData={this.makeProdData}/>                
              </Route>

              <Route path='/categ'>                
                <CategoryPage tech={this.state.tech} currencies={this.state.currencies} changeCountCart={this.changeCountCart} makeProdData={this.makeProdData}/>                
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
