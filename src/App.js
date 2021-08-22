import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { client, Query, Field } from "@tilework/opus";
import './App.css';
import Nav from './Components/Nav/Nav';
import Categ from './Components/Categories/Categ/Categ';
import StartPage from './Components/Categories/Categ/StartPage';
import Product from './Components/Categories/Product/Product';
import Cart from './Components/UserCart/Cart/Cart';
import FakeCart from './Components/UserCart/Cart/FakeCart';
import OverallData from './Context';
import {DEFAULT, POPUP} from './CONST';
class App extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {      
      categoriesList: [],
      startPage: 'yes',
      currentCategory: '',
      savedCategory: '',
      savedHref: '/',
      currentProduct: '',
      categoryChanged: 'no',     
      currencySimbol: '$',
      currencyNumber: 0,
      countCart: 0,
      //cartChanged: 'no',     
      //cartProductChanged: 'no',
      miniCartProductChanged: 'no',
      miniCartChanged: 'no',
      displayCountCart: 'no',
      displaySignIn: 'no',      
      currencies: '',
      currency: '',
      attrs: DEFAULT,
      position: ''         
  }

    this.addToCart = this.addToCart.bind(this); 
    this.checkForSignIn = this.checkForSignIn.bind(this);
    this.setDisplaySignIn = this.setDisplaySignIn.bind(this);
    this.createUniqueId = this.createUniqueId.bind(this);
    this.setPopUpPosition = this.setPopUpPosition.bind(this);
    this.setMiniCartProductChanged = this.setMiniCartProductChanged.bind(this);
    this.setMiniCartChanged = this.setMiniCartChanged.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.changeStartPage = this.changeStartPage.bind(this);    
    this.changeCurrentCategory = this.changeCurrentCategory.bind(this);
    this.setSavedCategory = this.setSavedCategory.bind(this);
    this.setSavedHref = this.setSavedHref.bind(this);
    this.setCurrentProduct = this.setCurrentProduct.bind(this);
    this.changeAttributes = this.changeAttributes.bind(this);
    this.setDefaultAttributes = this.setDefaultAttributes.bind(this);
    this.setDefaultCategoryChanged = this.setDefaultCategoryChanged.bind(this);
  }

  checkForSignIn() {
    const cookie = document.cookie.split(';')
    let user = cookie.find(item => item === 'login=user');
    return user
  }

  setDisplaySignIn(arg) {
    this.setState({
      //...this.state,
      displaySignIn: arg    
      });   
  }

  changeStartPage(arg) {
    this.setState({
      startPage: arg,
      savedCategory: ''
    }); 
  }

  changeCurrentCategory(categ) {   
    this.setState({
      //...this.state,
      currentCategory: categ,
      savedHref: '/',
      categoryChanged: 'yes'    
      });
  }

  setSavedCategory(categ) {
    this.setState({
      //...this.state,
      savedCategory: categ,
      currentCategory: categ    
      });    
  }

  setSavedHref(href) {
    this.setState({
      //...this.state,
      savedHref: href    
      });    
  }

  setPopUpPosition(arg) {
    this.setState({
      //...this.state,
      position: arg                 
      });
  }

  setCurrentProduct(prod) {      
    this.setState({
      //...this.state,
      savedHref: '/',
      currentProduct: prod                 
      }); 
  }

  setMiniCartProductChanged(arg,id) {
    if (window.localStorage.getItem('cart')) {
      const cart = window.localStorage.getItem('cart')
      const cartCount = JSON.parse(cart).length

      this.setState({
        //...this.state,
        miniCartProductChanged: arg,
        miniCartChanged: arg,
        //cartProductChanged: 'yes',
        //cartChanged: 'yes',
        displayCountCart: (cartCount > 0 ? 'yes' : 'no'),
        countCart: cartCount                 
        });
    } 
  }

  setMiniCartChanged(arg) {
          
    this.setState({
      //...this.state,
      miniCartChanged: arg,
      //cartProductChanged: 'yes',
      //cartChanged: 'yes'                 
      });    
  }

  setDefaultCategoryChanged() {
    this.setState({
      //...this.state,      
      categoryChanged: 'no',            
      });
  }  

  showCartCount() {    
    if (!window.localStorage.getItem('cart')) return
    const cart = window.localStorage.getItem('cart')
    const cartCount = JSON.parse(cart).length
    
    this.setState({
      //...this.state,
      displayCountCart: (cartCount > 0 ? 'yes' : 'no'),      
      countCart: cartCount,            
      });
  }

  createUniqueId(arg) {
    const x = Math.floor(Math.random() * 99)
    const y = Math.floor(Math.random() * 99)
    const uniqueId = x + '-' + y + '-' + arg
    return uniqueId
  }

  changeLocalStorage(id, attributeNames, attributes, attributes_1, prices, gallery, prodName, brand) {
    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);
    //const newId = jsonCart.length
    const uniqueId = this.createUniqueId(prodName)
    console.log(this.state.attrs)

    const double = jsonCart.findIndex(item => item.name === id && JSON.stringify(item.attrs) === JSON.stringify(this.state.attrs));
    
    if (double === -1) {
      jsonCart.push({uniqueId: uniqueId, name: id, amount: 1, attrs: this.state.attrs,  attrNames: attributeNames, attributes: attributes, attributes_1: attributes_1, prices: prices, gallery: gallery, prodName: prodName, brand: brand})
    } else {
      jsonCart[double].amount++
      console.log(jsonCart[double].amount)
    }       

    window.localStorage.setItem('cart', JSON.stringify(jsonCart));
  }

  addToCart(inStock, id, attributeNames, attributes, attributes_1, prices, gallery, prodName, brand) {
    if (this.checkForSignIn() !== 'login=user') {
      this.setDisplaySignIn('yes')
      return;
    } else if (inStock === true) {
        const uniqueId = this.createUniqueId(prodName)      
        if (window.localStorage.getItem('cart')) {
          this.changeLocalStorage(id, attributeNames, attributes, attributes_1, prices, gallery, prodName, brand)
          } else {
          window.localStorage.setItem('cart', JSON.stringify([{uniqueId: uniqueId, name: id, amount: 1, attrs: this.state.attrs, attrNames: attributeNames, attributes: attributes, attributes_1: attributes_1, prices: prices, gallery: gallery, prodName: prodName, brand: brand}]));
          }    
        
        let newCount = JSON.parse(window.localStorage.getItem('cart')).length;

        this.setState({
          //...this.state,
          countCart: newCount,
          displayCountCart: 'yes',        
          miniCartChanged: 'yes',
          miniCartProductChanged: 'yes'                 
          //cartProductChanged: 'yes',
          //cartChanged: 'yes'
        })
      } 
  }

  creatControl(item) {
    const preControl = JSON.stringify(item).split('"')[1]
    const control = preControl.slice(0, preControl.length)
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
        const newArr = newAttrs.filter(item => this.creatControl(item) !== key);
       
        newAttrs = newArr
        newAttrs.push(newAttr)
      }        

    this.setState({
      //...this.state,
      attrs: newAttrs    
    })
  }

  setDefaultAttributes() {
    this.setState({
     // ...this.state,
      attrs: DEFAULT    
    })    
  }

  changeCurrency(simbol, currency, index) {
    this.setState({
      //...this.state,
      currencySimbol: simbol,
      currency: currency,
      currencyNumber: index
    }) 
  }

  componentDidMount() {    
    client.setEndpoint("http://localhost:4000/graphql");

    const queryCategoriesList = new Query("category", true)    
    .addField(new Field("products", true).addFieldList(["category"]))
    
    client.post(queryCategoriesList).then(result => {
      const unique = Array.from(new Set(result.category.products.map(JSON.stringify))).map(JSON.parse);
      
      this.setState({
      //...this.state,
      categoriesList: unique             
      });
      this.showCartCount()
    });

    const queryCurrencies = new Query("currencies", true)      
      client.post(queryCurrencies).then(result => {        
        this.setState({
        //...this.state,
        currencies: result.currencies,
        currency: result.currencies[0]                   
      });        
    });      
  }

  render() {
    return (
      <BrowserRouter >
          <OverallData.Provider value={{            
            categoriesList: this.state.categoriesList,            
            currencySimbol: this.state.currencySimbol,
            currencyNumber: this.state.currencyNumber,
            currencies: this.state.currencies             
            }}>

            <Nav changeCurrency={this.changeCurrency} countCart={this.state.countCart}  showCartCount={this.showCartCount} displayCountCart={this.state.displayCountCart} startPage={this.state.StartPage} currentCategory={this.state.currentCategory} changeCurrentCategory={this.changeCurrentCategory} savedCategory={this.state.savedCategory} setCurrentProduct={this.setCurrentProduct} setSavedHref={this.setSavedHref} savedHref={this.state.savedHref}
            setPopUpPosition={this.setPopUpPosition} 
            miniCartChanged={this.state.miniCartChanged} 
            setMiniCartChanged={this.setMiniCartChanged}            
            miniCartProductChanged={this.state.miniCartProductChanged}
            setMiniCartProductChanged={this.setMiniCartProductChanged}
            style={this.state.position === POPUP ? {position: 'fixed'} : {position: 'relative'}}/>          
            <Switch>
              <Route exact path='/'>
              <StartPage currentCategory={this.state.currentCategory} categoryChanged={this.state.categoryChanged} changeStartPage={this.changeStartPage} startPage={this.state.startPage} setSavedCategory={this.setSavedCategory} setDefaultCategoryChanged={this.setDefaultCategoryChanged} setCurrentProduct={this.setCurrentProduct} addToCart={this.addToCart} setDisplaySignIn={this.setDisplaySignIn} displaySignIn={this.state.displaySignIn}
              style={this.state.position !== POPUP ? {position: 'static'} : {position: 'fixed'}}/>
              </Route>

              <Route exact path={`/categ/:categ`}>{({match}) => <Categ match={match} currentCategory={this.state.currentCategory} categoryChanged={this.state.categoryChanged} setSavedCategory={this.setSavedCategory} setDefaultCategoryChanged={this.setDefaultCategoryChanged} setCurrentProduct={this.setCurrentProduct} addToCart={this.addToCart} setDisplaySignIn={this.setDisplaySignIn} displaySignIn={this.state.displaySignIn}
                style={this.state.position !== POPUP ? {position: 'static'} : {position: 'fixed'}}/>}
              </Route>

              <Route path='/product/:id'>{({match}) => <Product match={match} currentProduct={this.state.currentProduct} changeAttributes={this.changeAttributes} addToCart={this.addToCart} setDefaultAttributes={this.setDefaultAttributes} setDisplaySignIn={this.setDisplaySignIn} displaySignIn={this.state.displaySignIn}                
                style={this.state.position !== POPUP ? {position: 'static'} : {position: 'fixed'}}/>}                
              </Route>

              <Route path='/cart'>
                <Cart setCurrentProduct={this.setCurrentProduct} setMiniCartProductChanged={this.setMiniCartProductChanged}
                style={this.state.position !== POPUP ? {position: 'static'} : {position: 'fixed'}}/>
              </Route>

              <Route path='/fake-cart'>
                <FakeCart style={this.state.position !== POPUP ? {position: 'static'} : {position: 'fixed'}}/>
              </Route>
            </Switch>
          </OverallData.Provider>
      </BrowserRouter >
    ); 
  } 
} 

export default App;
