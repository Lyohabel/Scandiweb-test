import {COLOR} from '../../../CONST';
import * as styles from '../ProductAttrButtons.module.css'

function defineButtonClass(condition, index, item) {
  const {activeAttribute} = this.state 
  switch(true) {  // eslint-disable-line      
    case (condition && (activeAttribute === item.value)): 
      return (condition !== COLOR ? styles.sizeActive : styles.colorActive);
    case (condition && (index === 0 && activeAttribute === '')): 
      return (condition !== COLOR ? styles.sizeActive : styles.colorActive);

    default: 
      return (styles.size);     
  }    
}

export default defineButtonClass