import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { client, Query, Field } from "@tilework/opus";
import './App.css';
import Nav from './Components/Nav/Nav';
import Women from './Components/Categories/Women/Women';
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

  // updateCategoryData(event) {

  //   const updateCategory = event.target.innerHTML.toLowerCase()

  //   client.setEndpoint("http://localhost:4000/graphql");    

  //   const query = new Query("category", true)
  //     .addArgument("input", "CategoryInput", { title : updateCategory})
  //     .addField(new Field("products", arguments.title, true).addFieldList(["id", "name", "inStock", "gallery", "description", "attributes {items {value}}", "prices {currency,amount }"]))

  //     client.post(query).then(result => {
  //       const newData = result.category.products
  //       this.setState({
  //       ...this.state,        
  //       currentCategoryData: newData           
  //     });

  //     console.log(newData);      
  //     });
  // }

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
    //console.log(newCurrencyNumber)    
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


      const category1 = unique[0].category
      console.log(category1);

      const query = new Query("category", true)
      .addArgument("input", "CategoryInput", { title : category1})
      .addField(new Field("products", arguments.title, true).addFieldList(["id", "name", "inStock", "gallery", "description", "attributes {items {value}}", "prices {currency,amount }"]))

      client.post(query).then(result => {this.setState({
        ...this.state,
        tech: result.category.products,
        categoriesData: [{category1: result.category.products}]            
      });

      console.log(this.state.categoriesData);      
      });
    });

    // const query = new Query("category", true)
    // .addArgument("input", "CategoryInput", { title : "tech"})
    // .addField(new Field("products", arguments.title, true).addFieldList(["id", "name", "inStock", "gallery", "description", "category", "attributes {items {value}}", "prices {currency,amount }"]))

    // client.post(query).then(result => {this.setState({
    //   ...this.state,
    //   tech: result.category.products        
    //   });

    //   //console.log(this.state.tech);      
    // });

    const queryCurrencies = new Query("currencies", true)

      let cur;
      
      client.post(queryCurrencies).then(result => {this.setState({
        ...this.state,
        currencies: result.currencies                    
      });
      // console.log(this.state.currencySimbol); 
      // console.log(this.state.currencies); 
      // console.log(this.state.currencies.indexOf("RUB"));
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

              <Route path='/women'>
                <Women products={this.state.products} currencies={this.state.currencies}/>                
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
