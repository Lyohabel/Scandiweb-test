import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { client, Query, Field } from "@tilework/opus";
import './App.css';
import Nav from './Components/Nav/Nav';
import StartPage from './Components/Categories/StartPage/StartPage';
import Categ from './Components/Categories/Categ/Categ';
import Product from './Components/Categories/Product/Product';
import Cart from './Components/UserCart/Cart/Cart';
import OverallData from './Context';
import {DEFAULT, POPUP} from './CONST';
class App extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {      
      categoriesList: [],
      currentCategory: '',
      currentProduct: '',
      categoryChanged: 'no',     
      currencySimbol: '$',
      currencyNumber: 0,
      countCart: 0,
      cartChanged: 'no',     
      cartProductChanged: 'no',
      miniCartProductChanged: 'no',
      miniCartProductChangedId: 'noId',
      miniCartChanged: 'no',
      displayCountCart: 'no',      
      currencies: '',
      currency: '',
      attrs: DEFAULT,
      position: ''         
  }

    this.addToCart = this.addToCart.bind(this);
    this.createUniqueId = this.createUniqueId.bind(this);
    this.setPopUpPosition = this.setPopUpPosition.bind(this);
    this.setCartChanged = this.setCartChanged.bind(this);    
    this.setCartProductChanged = this.setCartProductChanged.bind(this);
    this.setMiniCartProductChanged = this.setMiniCartProductChanged.bind(this);
    this.setMiniCartChanged = this.setMiniCartChanged.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);    
    this.changeCurrentCategory = this.changeCurrentCategory.bind(this);
    this.setCurrentProduct = this.setCurrentProduct.bind(this);
    this.changeAttributes = this.changeAttributes.bind(this);
    this.setDefaultAttributes = this.setDefaultAttributes.bind(this);
    this.setDefaultCategoryChanged = this.setDefaultCategoryChanged.bind(this);
  } 

  changeCurrentCategory(categ) {   
    this.setState({
      ...this.state,
      currentCategory: categ,
      categoryChanged: 'yes'    
      });
  }

  setPopUpPosition(arg) {
    this.setState({
      ...this.state,
      position: arg                 
      });
  }

  setCurrentProduct(prod) {      
    this.setState({
      ...this.state,
      currentProduct: prod                 
      });
  }

  set_4_StatesChanged() {
    this.setState({
      ...this.state,
      cartChanged: 'yes',
      cartProductChanged: 'yes',
      miniCartChanged: 'yes',
      miniCartProductChanged: 'yes'                       
    }); 
  }

  setCartChanged(arg) {
    if (!window.localStorage.getItem('cart')) return
    const cart = window.localStorage.getItem('cart')
    const cartCount = JSON.parse(cart).length

    this.setState({
      ...this.state,
      cartChanged: arg,
      displayCountCart: (cartCount > 0 ? 'yes' : 'no'),
      countCart: cartCount                 
      });    
  }

  setCartProductChanged(arg) {
    if (window.localStorage.getItem('cart')) {
      const cart = window.localStorage.getItem('cart')
      const cartCount = JSON.parse(cart).length
      
      this.setState({
        ...this.state,
        cartProductChanged: arg,
        displayCountCart: (cartCount > 0 ? 'yes' : 'no'),
        countCart: cartCount,
        position: ''                
      });
    }
  }

  setMiniCartProductChanged(arg,id) {         
    this.setState({
      ...this.state,
      miniCartProductChangedId: id,
      miniCartProductChanged: arg,
      cartProductChanged: 'yes',
      cartChanged: 'yes'                
      });
      console.log(this.state.cartProductChanged)   
  }

  setMiniCartChanged(arg) {      
    this.setState({
      ...this.state,
      miniCartChanged: arg                 
      });    
  }

  setDefaultCategoryChanged() {
    this.setState({
      ...this.state,      
      categoryChanged: 'no',            
      });
  }  

  showCartCount() {    
    if (!window.localStorage.getItem('cart')) return
    const cart = window.localStorage.getItem('cart')
    const cartCount = JSON.parse(cart).length
    
    this.setState({
      ...this.state,
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
    const newId = jsonCart.length
    const uniqueId = this.createUniqueId(prodName)

    jsonCart.push({uniqueId: uniqueId, id: newId, name: id, amount: 1, attrs: this.state.attrs,  attrNames: attributeNames, attributes: attributes, attributes_1: attributes_1, prices: prices, gallery: gallery, prodName: prodName, brand: brand})    

    window.localStorage.setItem('cart', JSON.stringify(jsonCart));
  }

  addToCart(inStock, id, attributeNames, attributes, attributes_1, prices, gallery, prodName, brand) {
    if (inStock === true) {
      const uniqueId = this.createUniqueId(prodName)      
      if (window.localStorage.getItem('cart')) {
        this.changeLocalStorage(id, attributeNames, attributes, attributes_1, prices, gallery, prodName, brand)
         } else {
        window.localStorage.setItem('cart', JSON.stringify([{uniqueId: uniqueId, id : 0, name: id, amount: 1, attrs: this.state.attrs, attrNames: attributeNames, attributes: attributes, attributes_1: attributes_1, prices: prices, gallery: gallery, prodName: prodName, brand: brand}]));
        }    
       
      let newCount = JSON.parse(window.localStorage.getItem('cart')).length;

      this.setState({
        ...this.state,
        countCart: newCount,
        displayCountCart: 'yes',
        miniCartChanged: 'yes'
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
      ...this.state,
      attrs: newAttrs    
    })
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
            categoriesList: this.state.categoriesList,            
            currencySimbol: this.state.currencySimbol,
            currencyNumber: this.state.currencyNumber,
            currencies: this.state.currencies             
            }}>

            <Nav changeCurrency={this.changeCurrency} countCart={this.state.countCart}  showCartCount={this.showCartCount} displayCountCart={this.state.displayCountCart} changeCurrentCategory={this.changeCurrentCategory} setCurrentProduct={this.setCurrentProduct}
            setPopUpPosition={this.setPopUpPosition} 
            miniCartChanged={this.state.miniCartChanged} 
            setMiniCartChanged={this.setMiniCartChanged}
            cartChanged={this.state.cartChanged}            
            setCartChanged={this.setCartChanged}
            setCartProductChanged={this.setCartProductChanged}
            miniCartProductChanged={this.state.miniCartProductChanged}
            miniCartProductChangedId={this.state.miniCartProductChangedId}
            setMiniCartProductChanged={this.setMiniCartProductChanged}
            style={this.state.position === POPUP ? {position: 'fixed'} : {position: 'relative'}}/>          
            <Switch>
              <Route exact path='/'>
                <StartPage setCurrentProduct={this.setCurrentProduct} addToCart={this.addToCart}/>
              </Route>

              <Route exact path={`/categ/${this.state.currentCategory}`}>                
                <Categ currentCategory={this.state.currentCategory} categoryChanged={this.state.categoryChanged} setDefaultCategoryChanged={this.setDefaultCategoryChanged} setCurrentProduct={this.setCurrentProduct} addToCart={this.addToCart}
                style={this.state.position !== POPUP ? {position: 'static'} : {position: 'fixed'}}/>                
              </Route>

              <Route path='/product'>
                <Product currentProduct={this.state.currentProduct} changeAttributes={this.changeAttributes} addToCart={this.addToCart} setDefaultAttributes={this.setDefaultAttributes}
                style={this.state.position !== POPUP ? {position: 'static'} : {position: 'fixed'}}/>
              </Route>
              <Route path='/cart'>
                <Cart setCurrentProduct={this.setCurrentProduct} changeAttributes={this.changeAttributes} setDefaultAttributes={this.setDefaultAttributes}
                cartProductChanged={this.state.cartProductChanged} 
                cartChanged={this.state.cartChanged}
                setCartChanged={this.setCartChanged}
                setCartProductChanged={this.setCartProductChanged}
                setMiniCartProductChanged={this.setMiniCartProductChanged}
                style={this.state.position !== POPUP ? {position: 'static'} : {position: 'fixed'}}/>
              </Route>
            </Switch>
          </OverallData.Provider>
      </BrowserRouter >
    ); 
  } 
} 

export default App;
