import * as styles from '../CartProduct.module.css';
import ProductAttrButtons from '../../../../Elements/AttrButtons/ProductAttrButtons';

function setAttributes(order) {
  const {attributes} = this.state.jsonCart
  if (!attributes || attributes.length < order + 1) return ''   
  return (
    <div className={styles.attrButtonsWrapper}>       
      <ProductAttrButtons cartProduct={'yes'} savedState={JSON.parse(JSON.stringify(this.state.jsonCart))} btnStyle={attributes[order].id} order={order} id={this.props.id} />
    </div>
  )    
}

export default setAttributes