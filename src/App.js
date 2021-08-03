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
import {DEFAULT} from './CONST';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // startData: '',
      // startData1: '',
      categoriesList: [],
      currentCategory: '',
      currentProduct: '',
      categoryChanged: 'no',     
      currencySimbol: '$',
      currencyNumber: 0,
      countCart: 0,
      displayCountCart: 'no',      
      currencies: '',
      currency: '',
      attrs: DEFAULT,
      //attrNames: ''           
  }

    this.addToCart = this.addToCart.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);    
    this.changeCurrentCategory = this.changeCurrentCategory.bind(this);
    this.setCurrentProduct = this.setCurrentProduct.bind(this);
    this.changeAttributes = this.changeAttributes.bind(this);
    this.setDefaultAttributes = this.setDefaultAttributes.bind(this);
    this.setDefaultCategoryChanged = this.setDefaultCategoryChanged.bind(this);
  } //changeAttributes

  changeCurrentCategory(categ) {   
    this.setState({
      ...this.state,
      currentCategory: categ,
      categoryChanged: 'yes',            
      });
  }
  
  setCurrentProduct(prod) {      
    this.setState({
      ...this.state,
      currentProduct: prod                 
      });
  }
  setDefaultCategoryChanged() {
    this.setState({
      ...this.state,      
      categoryChanged: 'no',            
      });
  }

  showCartCount() {
    const cart = window.localStorage.getItem('cart');
    if (!cart) return

    const jsonCart = JSON.parse(cart);
    //console.log(jsonCart)
    let cartCount = 0
    jsonCart.forEach(element => {      
      cartCount += element.amount
    });

    this.setState({
      ...this.state,
      displayCountCart: 'yes',      
      countCart: cartCount,            
      });
  }

  changeLocalStorage(id, attributeNames) {
    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);
    const newId = jsonCart.length

    jsonCart.push({id: newId, name: id, amount: 1, attrs: this.state.attrs,  attrNames: attributeNames})
   
    //console.log(jsonCart);

    window.localStorage.setItem('cart', JSON.stringify(jsonCart));
  }

  addToCart(inStock, id, attributeNames, prices, gallery) {
    if (inStock === true) {
      if (window.localStorage.getItem('cart')) {
        this.changeLocalStorage(id, attributeNames)
      } else {
        window.localStorage.setItem('cart', JSON.stringify([{id : 0, name: id, amount: 1, attrs: this.state.attrs, attrNames: attributeNames, prices: prices, gallery: gallery}]));
        }      
       
      let newCount = this.state.countCart;
      newCount++;
      this.setState({
        ...this.state,
        countCart: newCount,
        displayCountCart: 'yes'
      })
    } 
  }

  creatControl(item) {
    const preControl = JSON.stringify(item).split('"')[1]
    const control = preControl.slice(0, preControl.length)    
    //console.log(control)
    return control
  }

  changeAttributes(attrName, attrValue) {
    const key = attrName.toLowerCase()
    let newAttr = {}
    newAttr[key] = attrValue
    let newAttrs = []

    if (this.state.attrs === DEFAULT) {
      newAttrs = [newAttr]
    } else {
        newAttrs = this.state.attrs;
        //const control = JSON.stringify(item).split('"')[1].slice(0, control.length)
        const newArr = newAttrs.filter(item => this.creatControl(item) !== key);

        // console.log(key)
        // console.log(newArr)
       
        newAttrs = newArr
        newAttrs.push(newAttr)
      }        

    this.setState({
      ...this.state,
      attrs: newAttrs    
    })
    // console.log(attrName)
    // console.log(attrValue)
  }

  setDefaultAttributes() {
    this.setState({
      ...this.state,
      attrs: DEFAULT    
    })    
  }

  changeCurrency(simbol, currency, index) {
    this.setState({
      ...this.state,
      currencySimbol: simbol,
      currency: currency,
      currencyNumber: index
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
      this.showCartCount()
    });

    // const queryStartData = new Query("categories", true)     
    //   .addField(new Field("name"))
    //   .addField(new Field("products{id, name, inStock, gallery, prices {currency,amount}, brand }"))

    //   // .addField(new Field("products{id, name, inStock, gallery, description, category, attributes {id, name, type, items {displayValue, value, id}}, prices {currency,amount}, brand }"))
  
    //   client.post(queryStartData).then(result => {
    //     const newData = result.categories
    //     const newData1 = JSON.parse(JSON.stringify(result.categories))

    //     this.setState({
    //     ...this.state,        
    //     startData: newData,
    //     startData1: newData1          
    //     });        
    // });

    const queryCurrencies = new Query("currencies", true)      
      client.post(queryCurrencies).then(result => {        
        this.setState({
        ...this.state,
        currencies: result.currencies,
        currency: result.currencies[0]                   
      });        
    });      
  }

  render() {
    return (
      <BrowserRouter >
          <OverallData.Provider value={{
            //startData: this.state.startData,
            categoriesList: this.state.categoriesList,            
            currencySimbol: this.state.currencySimbol,
            currencyNumber: this.state.currencyNumber,
            currencies: this.state.currencies             
            }}>

            <Nav changeCurrency={this.changeCurrency} countCart={this.state.countCart} displayCountCart={this.state.displayCountCart} changeCurrentCategory={this.changeCurrentCategory} setCurrentProduct={this.setCurrentProduct}/>          
            <Switch>
              <Route exact path='/'>
                <StartPage setCurrentProduct={this.setCurrentProduct} addToCart={this.addToCart}/>
              </Route>

              <Route path='/test'>
                <Test />                
              </Route>

              <Route exact path={`/categ/${this.state.currentCategory}`}>                
                <Categ currentCategory={this.state.currentCategory} categoryChanged={this.state.categoryChanged} setDefaultCategoryChanged={this.setDefaultCategoryChanged} setCurrentProduct={this.setCurrentProduct} addToCart={this.addToCart}/>                
              </Route>

              <Route path='/product'>
                <Product currentProduct={this.state.currentProduct} changeAttributes={this.changeAttributes} addToCart={this.addToCart} setDefaultAttributes={this.setDefaultAttributes}/>
              </Route>
              <Route path='/cart'>
                <Cart setCurrentProduct={this.setCurrentProduct} changeAttributes={this.changeAttributes} setDefaultAttributes={this.setDefaultAttributes}/>
              </Route>
            </Switch>
          </OverallData.Provider>
      </BrowserRouter >
    ); // def={this.state.attrs}
  } 
} 

export default App;
