import React from 'react';
import * as styles from './PopUp.module.css';

class PopUp extends React.PureComponent { 
    constructor(props) {
      super(props);    
      this.state = {
        // bigImage: '',
        // imageIndex: 0    
      }         
    }

    render() {
        return (
          <div className={styles.popUp}>
            <img src={this.props.img} alt="#"/>
          </div>
        );
      } 
    }
    
    export default PopUp;