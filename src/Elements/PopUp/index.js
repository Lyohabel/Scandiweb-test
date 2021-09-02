import React from 'react';
import * as styles from './PopUp.module.css';

class PopUp extends React.PureComponent { 
    constructor(props) {
      super(props);
      this.popUpImg = React.createRef();   
      this.state = {
        show: 'yes'   
      }         
    }

    closeBigImage(event) {
      if (this.popUpImg.current && !this.popUpImg.current.contains(event.target)) {
        this.props.setBigImage('')
      }
    } 

    render() {
        return (
          <div onClick={(event) => {this.closeBigImage(event)}} className={styles.popUp} style={this.props.bigImage === 'main' ? {display: 'block'} : {display: 'none'}}>
            <img ref={this.popUpImg} src={this.props.img} alt="#"/>
          </div>
        );
      } 
    }
    
    export default PopUp;