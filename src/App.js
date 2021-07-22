import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { client, Query, Field } from "@tilework/opus";
import './App.css';
import Nav from './Components/Nav/Nav';
import StartPage from './Components/Categories/StartPage/StartPage';
import Test from './Components/Categories/Test/Test';
import Categ from './Components/Categories/Categ/Categ';
import Product from './Components/Categories/Product/Product';
import Cart from './Components/UserCart/Cart/Cart';
import OverallData from './Context';
//import HashChange from "react-hashchange";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startData: '',
      categoriesList: [],
      currentCategory: 'tech',      
      currencySimbol: '$',
      currencyNumber: 0,
      countCart: 0,
      display: 'none',      
      currencies: ''           
  }

    this.addToCart = this.addToCart.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);    
    this.changeCurrentCategory = this.changeCurrentCategory.bind(this);
    
  }

  changeCurrentCategory(event) {
    const categ = event.target.innerHTML;
    this.setState({
      ...this.state,
      currentCategory: categ             
      });
  }

  changeLocalStorage(id, n) {
    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);

    const indicator = jsonCart.find(item => (item.name === id && item.attr_1 === 0 && item.attr_2 === 0));
    
    //jsonCart.splice(0,1)    
    
    if (!indicator) {
      jsonCart.push({id: n, name: id, attr_1: 0, attr_2: 0})
    } else {
      jsonCart.forEach(element => {
        if (element.name === id) {
          element.id++;             
        }      
      })
    }   
    console.log(jsonCart);

    window.localStorage.setItem('cart', JSON.stringify(jsonCart));
  }

  addToCart(inStock, id) {
    if (inStock === true) {
      if (window.localStorage.getItem('cart')) {
        this.changeLocalStorage(id, 1)
      } else {
        window.localStorage.setItem('cart', JSON.stringify([{id : 1, attr_1: 0, attr_2: 0}]));
        }      
       
      let newCount = this.state.countCart;
      newCount++;
      this.setState({
        ...this.state,
        countCart: newCount,
        display: 'flex'      
      })
    }  
  }

  changeCurrency(event) {    
    const newCurrencySimbol = event.target.innerHTML.split(' ', 1);
    const newCurrency = event.target.innerHTML.split(' ')[1];
    const newCurrencyNumber = this.state.currencies.indexOf(newCurrency);
    this.setState({
      ...this.state,
      currencySimbol: newCurrencySimbol,
      currencyNumber: newCurrencyNumber
    }) 
  }

  // componentWillMount() {    // ИМИТАЦИЯ РЕГИСТРАЦИИ ПОЛЬЗОВАТЕЛЯ
  //   document.cookie = 'login=user';
  //   console.log(document.cookie)
  // }

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
      .addField(new Field("products{id, name, inStock, gallery, prices {currency,amount}, brand }"))

      // .addField(new Field("products{id, name, inStock, gallery, description, category, attributes {id, name, type, items {displayValue, value, id}}, prices {currency,amount}, brand }"))
  
      client.post(queryStartData).then(result => {
        const newData = result.categories
        this.setState({
        ...this.state,        
        startData: newData           
        }); 
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
          <OverallData.Provider value={{
            startData: this.state.startData,
            categoriesList: this.state.categoriesList,            
            currencySimbol: this.state.currencySimbol,
            currencyNumber: this.state.currencyNumber,
            currencies: this.state.currencies                      
            }}>
            <Nav cur={this.state.cur} changeCurrency={this.changeCurrency} countCart={this.state.countCart} display={this.state.display} changeCurrentCategory={this.changeCurrentCategory}/>          
            <Switch>
              <Route exact path='/'>
                <StartPage startData={this.state.startData} currencies={this.state.currencies} changeCountCart={this.changeCountCart}/>
              </Route>

              <Route path='/test'>
                <Test products={this.state.products} currencies={this.state.currencies} changeInf={this.changeInf} inf={this.state.inf}/>                
              </Route>

              <Route exact path={`/categ/${this.state.currentCategory}`}>                
                <Categ currentCategory={this.state.currentCategory} currencies={this.state.currencies} addToCart={this.addToCart}/>                
              </Route>

              <Route path='/product'>
                <Product addToCart={this.addToCart}/>
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
