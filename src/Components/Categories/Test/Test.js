import React from 'react';
import { client, Query, Field } from "@tilework/opus"; // eslint-disable-line
import OverallData from '../../../Context';
import {NavLink} from 'react-router-dom';
//import HashChange from "react-hashchange";
import * as styles from './Test.module.css'

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xxx: 'default',
      cur: ''
    }	
  }

 // testSth() {
    // this.setState({
    //   ...this.state,
    //   xxx: this.context.startData
    // })
  //   const getCookie = function getCookie(name) { 
  //     let matches = document.cookie.match(new RegExp( 
  //       "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)" // eslint-disable-line
  //     ));
  //     return matches ? decodeURIComponent(matches[1]) : undefined;
  //   };
  //   const wwww = getCookie('login')

  //   if (wwww === 'usel') {
  //     console.log(wwww)
  //   } else {
  //     console.log(false) 
  //     }
       
  // }

  // componentWillMount() {
  //   this.setState({
  //         ...this.state,
  //         cur: 'ZZZZZZZZ'                    
  //         });
     
  
  // }

  createCategoriesList() {
    const categoriesList = this.context.categoriesList
    return categoriesList && categoriesList.map(item =>
      <li className={styles.category} id={item.category} key={item.category}>
        {item.category}    
      </li>
    )
  }
  componentDidMount() {
  //   client.setEndpoint("http://localhost:4000/graphql");

  //   const query = new Query("product", true)
  //  .addArgument(("id", "String!", "apple-imac-2021"),
  //  ("id", "String!", "huarache-x-stussy-le"))   
  //  .addFieldList(["id", "name", "inStock", "brand"])
  // //  .addArgument("id", "String!", "apple-imac-2021")
  // //  .addFieldList(["id", "name", "inStock", "brand"])

  //   client.post(query).then(result => {
  //     //const product = result.product
      
  //     console.log(result)             
  //   });     
      
  }
  
  // componentWillReceiveProps() {
  //   console.log('333333')
  // }
  
  // componentWillUpdate() {
  //   console.log('44444')
  // }
  
  // componentDidUpdate() {
  //   console.log('55555')
  // }
  
  // componentWillUnmount() {
    
  // }  

  render() {
    return (
      <section onChange={({ hash }) => console.log({ hash })} className="men">
          <div className="container">            
            <NavLink className={styles.link} to="/">
                    To start page
            </NavLink>

            {/* <button onClick={() => this.props.changeInf()} className={styles.test}>TEST-2</button> */}
            
            {/* <button onClick={() => this.testSth()} className={styles.test}>TEST</button>
            <div>{this.props.inf}</div>
            <div>{this.context.startData[0].name}</div>
            <div>{this.context.inf2}</div> */}
          </div>
      </section>
    );
  } 
}

Test.contextType = OverallData;

export default Test;