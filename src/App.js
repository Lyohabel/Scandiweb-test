import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import getCategoriesList from './Queries/GetCategoriesList';
import getCurrencies from './Queries/GetCarrencies';
import './App.css';
import Nav from './Components/Nav/Nav';
import Categ from './Components/Categories/Categ/Categ';
import StartPage from './Components/Categories/Categ/StartPage';
import Product from './Components/Categories/Product/Product';
import Cart from './Components/UserCart/Cart/Cart';
import FakeCart from './Components/UserCart/Cart/FakeCart';
import OverallData from './Context';
import {DEFAULT} from './CONST';
class App extends React.PureComponent { 
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
      miniCartProductChanged: 'no',
      miniCartChanged: 'no',
      displayCountCart: 'no',
      displaySignIn: 'no',      
      currencies: '',
      currency: '',
      attrs: DEFAULT,
      attributeOrders: '' 
  }

    this.addToCart = this.addToCart.bind(this); 
    this.checkForSignIn = this.checkForSignIn.bind(this);
    this.setDisplaySignIn = this.setDisplaySignIn.bind(this);
    this.createUniqueId = this.createUniqueId.bind(this);
    this.setMiniCartProductChanged = this.setMiniCartProductChanged.bind(this);
    this.setMiniCartChanged = this.setMiniCartChanged.bind(this);
    this.changeCurrency = this.changeCurrency.bind(this);
    this.changeStartPage = this.changeStartPage.bind(this);    
    this.changeCurrentCategory = this.changeCurrentCategory.bind(this);
    this.setSavedCategory = this.setSavedCategory.bind(this);
    this.setSavedHref = this.setSavedHref.bind(this);
    this.setCurrentProduct = this.setCurrentProduct.bind(this);
    this.changeAttributes = this.changeAttributes.bind(this);
    this.changeAttributeOrders = this.changeAttributeOrders.bind(this);
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
      currentCategory: categ,
      savedHref: '/',
      categoryChanged: 'yes'    
      });
  }

  setSavedCategory(categ) {
    this.setState({
      savedCategory: categ,
      currentCategory: categ    
      });    
  }

  setSavedHref(href) {
    this.setState({
      savedHref: href    
      });    
  }

  setCurrentProduct(prod) {      
    this.setState({
      savedHref: '/',
      currentProduct: prod                 
      }); 
  }

  setMiniCartProductChanged(arg,id) {
    if (window.localStorage.getItem('cart')) {
      const cart = window.localStorage.getItem('cart')
      const cartCount = JSON.parse(cart).length

      this.setState({
        miniCartProductChanged: arg,
        miniCartChanged: arg,
        displayCountCart: (cartCount > 0 ? 'yes' : 'no'),
        countCart: cartCount                 
        });
    } 
  }

  setMiniCartChanged(arg) {          
    this.setState({
      miniCartChanged: arg           
      });    
  }

  setDefaultCategoryChanged() {
    this.setState({    
      categoryChanged: 'no',
      startPage: 'yes'            
      });
  }  

  showCartCount() {    
    if (!window.localStorage.getItem('cart')) return
    const cart = window.localStorage.getItem('cart')
    const cartCount = JSON.parse(cart).length
    
    this.setState({
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

  changeLocalStorage(id, attributeNames, attributeOrders, attributes, attributes_1, prices, gallery, prodName, brand) {
    const cart = window.localStorage.getItem('cart');    
    let jsonCart = JSON.parse(cart);
    const uniqueId = this.createUniqueId(prodName)    
    //eslint-disable-next-line
    const double = jsonCart.findIndex(item => item.name === id && JSON.stringify(item.attrOrders) === JSON.stringify(this.state.attributeOrders));
    
    if (double === -1) {
      jsonCart.push({uniqueId: uniqueId, name: id, amount: 1, attrs: this.state.attrs,  attrNames: attributeNames, attrOrders: attributeOrders, attributes: attributes, attributes_1: attributes_1, prices: prices, gallery: gallery, prodName: prodName, brand: brand})
    } else {
      jsonCart[double].amount++
      console.log(jsonCart[double].amount)
    }       

    window.localStorage.setItem('cart', JSON.stringify(jsonCart));
  }

  addToCart(inStock, id, attributeNames, attributeOrders, attributes, attributes_1, prices, gallery, prodName, brand) {
    if (this.checkForSignIn() !== 'login=user') {
      this.setDisplaySignIn('yes')
      return;
    } else if (inStock === true) {
        const uniqueId = this.createUniqueId(prodName)      
        if (window.localStorage.getItem('cart')) {
          this.changeLocalStorage(id, attributeNames, attributeOrders, attributes, attributes_1, prices, gallery, prodName, brand)
          } else {
          window.localStorage.setItem('cart', JSON.stringify([{uniqueId: uniqueId, name: id, amount: 1, attrs: this.state.attrs, attrNames: attributeNames, attrOrders: attributeOrders, attributes: attributes, attributes_1: attributes_1, prices: prices, gallery: gallery, prodName: prodName, brand: brand}]));
          }    
        
        let newCount = JSON.parse(window.localStorage.getItem('cart')).length;

        this.setState({
          countCart: newCount,
          displayCountCart: 'yes',        
          miniCartChanged: 'yes',
          miniCartProductChanged: 'yes'
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
      attrs: newAttrs    
    })
    //console.log(this.state.attrs)
  }

  changeAttributeOrders(arg) {
    this.setState({
      attributeOrders: arg   
    })
  }

  setDefaultAttributes() {
    this.setState({
      attrs: DEFAULT    
    })    
  }

  changeCurrency(simbol, currency, index) {
    this.setState({
      currencySimbol: simbol,
      currency: currency,
      currencyNumber: index
    }) 
  }

  async componentDidMount() {
    
    const result = await JSON.parse(JSON.stringify((await getCategoriesList())))

    const unique = Array.from(new Set(result.category.products.map(JSON.stringify))).map(JSON.parse);
      
    this.setState({
     categoriesList: unique             
    });

    this.showCartCount()
    
    const resultCurrencies = await JSON.parse(JSON.stringify((await getCurrencies())))

    this.setState({
      currencies: resultCurrencies.currencies,
      currency: resultCurrencies.currencies[0]                   
    });        
          
  }

  render() {
    return (
      <BrowserRouter >
          <OverallData.Provider value={{            
            categoriesList: this.state.categoriesList,            
            currencySimbol: this.state.currencySimbol,
            currencyNumber: this.state.currencyNumber,
            currencies: this.state.currencies}}>

            <Nav changeCurrency={this.changeCurrency} countCart={this.state.countCart}  showCartCount={this.showCartCount} displayCountCart={this.state.displayCountCart} startPage={this.state.StartPage} currentCategory={this.state.currentCategory} changeCurrentCategory={this.changeCurrentCategory} savedCategory={this.state.savedCategory} setCurrentProduct={this.setCurrentProduct} setSavedHref={this.setSavedHref} savedHref={this.state.savedHref} 
            miniCartChanged={this.state.miniCartChanged} 
            setMiniCartChanged={this.setMiniCartChanged}            
            miniCartProductChanged={this.state.miniCartProductChanged}
            setMiniCartProductChanged={this.setMiniCartProductChanged}/>

            <Switch>
              <Route exact path='/'>
              <StartPage currentCategory={this.state.currentCategory} categoryChanged={this.state.categoryChanged} changeStartPage={this.changeStartPage} startPage={this.state.startPage} setSavedCategory={this.setSavedCategory} setDefaultCategoryChanged={this.setDefaultCategoryChanged} setCurrentProduct={this.setCurrentProduct} addToCart={this.addToCart} setDisplaySignIn={this.setDisplaySignIn} displaySignIn={this.state.displaySignIn}/>
              </Route>

              <Route exact path={`/categ/:categ`}>{({match}) => <Categ match={match} currentCategory={this.state.currentCategory} categoryChanged={this.state.categoryChanged} setSavedCategory={this.setSavedCategory} setDefaultCategoryChanged={this.setDefaultCategoryChanged} setCurrentProduct={this.setCurrentProduct} addToCart={this.addToCart} setDisplaySignIn={this.setDisplaySignIn} displaySignIn={this.state.displaySignIn}/>}
              </Route>

              <Route path='/product/:id'>{({match}) => <Product match={match} currentProduct={this.state.currentProduct} changeAttributes={this.changeAttributes} addToCart={this.addToCart} attributeOrders={this.state.attributeOrders} changeAttributeOrders={this.changeAttributeOrders} setDefaultAttributes={this.setDefaultAttributes} setDisplaySignIn={this.setDisplaySignIn} displaySignIn={this.state.displaySignIn}/>}                
              </Route>

              <Route path='/cart'>
                <Cart setCurrentProduct={this.setCurrentProduct} setMiniCartProductChanged={this.setMiniCartProductChanged}/>
              </Route>

              <Route path='/fake-cart'>
                <FakeCart/>
              </Route>
            </Switch>
          </OverallData.Provider>
      </BrowserRouter >
    ); 
  } 
} 

export default App;
