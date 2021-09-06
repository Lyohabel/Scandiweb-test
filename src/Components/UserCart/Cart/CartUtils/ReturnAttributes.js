import * as styles from '../CartProduct.module.css';

function returnAttributes(arr) {
  return arr && arr.map((item, index) =>
    <div key={item.id} className={styles.attributeTypeWrapper}>       
      {this.setAttributes(index)}
    </div>
  )    
}

export default returnAttributes