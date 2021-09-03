import React from 'react';
import getAllCategories from '../../../Queries/GetAllCategories';
import getCategory from '../../../Queries/GetCategory';
import * as styles from './Categ.module.css';
import CategProduct from './CategProduct';

class Categ extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {   
      currentCategoryData: ''
    }   
  }

  createList(data) {    
    return data && data.map((item, index) =>
      <li className={styles.productItem} id={item.id} key={item.id}>

        <CategProduct currentCategoryData={this.state.currentCategoryData[index]} item={JSON.parse(JSON.stringify(item))} id={item.id} setCurrentProduct={this.props.setCurrentProduct} gallery={item.gallery} prices={item.prices} attributes={item.attributes} addToCart={this.props.addToCart} displaySignIn={this.props.displaySignIn} setDisplaySignIn={this.props.setDisplaySignIn}/>
        
      </li>
    )
  } 
  
  async componentDidMount() {
    
    if (this.props.startPage && this.props.startPage === 'yes') {

      const resultAll = await JSON.parse(JSON.stringify((await getAllCategories())))  
      
      this.setState({       
        currentCategoryData: JSON.parse(JSON.stringify(resultAll.category.products))
      });             
      
    } else {
        const category = this.props.currentCategory === '' ? this.props.match.params.categ : this.props.currentCategory
        
        this.props.setSavedCategory(category)

        const resultCategory = await JSON.parse(JSON.stringify((await getCategory(category))))
        
        this.setState({        
          currentCategoryData: JSON.parse(JSON.stringify(resultCategory.category.products))
        });          
      }   
  }

  async componentDidUpdate() {    
    if (this.props.categoryChanged !== 'no') {

    const category = this.props.currentCategory

    const resultCategory = await JSON.parse(JSON.stringify((await getCategory(category))))
       
      this.setState({       
        currentCategoryData: JSON.parse(JSON.stringify(resultCategory.category.products))
      });
      this.props.setDefaultCategoryChanged()
    }
  }
  
  componentWillUnmount() {
    this.props.setDefaultCategoryChanged()    
  }  

  render() {
    return (
      <section className="categ">
          <div className="container">
            <h3 className={styles.title}>{this.props.currentCategory === '' ? "All products" : this.props.currentCategory}</h3>
            <ul className={styles.products}>
             {this.createList(this.state.currentCategoryData)}             
            </ul>
          </div>
      </section>
    );
  } 
}

export default Categ;