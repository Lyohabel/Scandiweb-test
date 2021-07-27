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


const DEFAULT = 'default'

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
      currencies: '',
      attrs: 'def'           
  }

    this.addToCart = this.addToCart.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);    
    this.changeCurrentCategory = this.changeCurrentCategory.bind(this);
    this.changeAttributes = this.changeAttributes.bind(this);
    this.setDefaultAttributes = this.setDefaultAttributes.bind(this);
  }

  changeCurrentCategory(event) {
    const categ = event.target.innerHTML;
    this.setState({
      ...this.state,
      currentCategory: categ             
      });
  }

  changeLocalStorage(id) {
    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);
    const newId = jsonCart.length

    //if (this.state.attrs === 'def')

    jsonCart.push({id: newId, name: id, amount: 1, attrs: this.state.attrs})
   
    console.log(jsonCart);

    window.localStorage.setItem('cart', JSON.stringify(jsonCart));
  }

  addToCart(inStock, id) {
    if (inStock === true) {
      if (window.localStorage.getItem('cart')) {
        this.changeLocalStorage(id)
      } else {
        window.localStorage.setItem('cart', JSON.stringify([{id : 0, name: id, amount: 1, attrs: this.state.attrs}]));
        }      
       
      let newCount = this.state.countCart;
      newCount++;
      this.setState({
        ...this.state,
        countCart: newCount,
        display: 'flex',
        //attrs: 'def'     
      })
    }  
  }

  changeAttributes(event) {    
    const currentButton = event.target;
    const attrNAME = currentButton.closest('.attrWrapper').firstElementChild.innerHTML.toLowerCase()
    const attrName = attrNAME.slice(0, attrNAME.length - 1)
    const attrValue = currentButton.value

    const key = attrName;
    let newAttr = {}
    newAttr[key] = attrValue
    let newAttrs = []

    if (this.state.attrs === 'def') {
      newAttrs = [newAttr]
    } else {
        newAttrs = this.state.attrs;
        const newArr = newAttrs.filter(item => JSON.stringify(item).split('"')[1] !== attrName);
        //console.log(newArr)        
          
        newAttrs = newArr
        newAttrs.push(newAttr)
      }        

    this.setState({
      ...this.state,
      attrs: newAttrs    
    })

    //console.log(this.state.attrs)
  }

  setDefaultAttributes() {
    this.setState({
      ...this.state,
      attrs: 'def'    
    })
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
                <Categ changeAttributes={this.changeAttributes} currentCategory={this.state.currentCategory} currencies={this.state.currencies} addToCart={this.addToCart}/>                
              </Route>

              <Route path='/product'>
                <Product def={this.state.attrs} changeAttributes={this.changeAttributes} addToCart={this.addToCart} setDefaultAttributes={this.setDefaultAttributes}/>
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
