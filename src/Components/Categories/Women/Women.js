import React from 'react';
import * as styles from './Women.module.css'

class Women extends React.Component {
  constructor(props) {
    super(props);
    //this.state = {text: 'default'}

    //this.methodeName = this.methodeName.bind(this)
	
  }

  componentDidMount() {

  }  

  render() {
    return (
      <section className="women">
          <div className="container">
            <div>WOMEN</div>            
          </div>
      </section>
    );
  } 
}

export default Women;