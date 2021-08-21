import React from 'react';


class Description extends React.Component {
    constructor(props) { 
      super(props);
      this.state = {
        
      }
      
      //this.changeStartPage = this.changeStartPage.bind(this)      
    }
    
    componentDidMount() {
     
    }
  
    render() {
      return (
        this.props.description    
      );
    } 
  }

  export default Description;