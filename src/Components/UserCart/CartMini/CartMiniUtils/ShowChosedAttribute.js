import * as styles from '../CartMiniProduct.module.css';

function showChosedAttribute() {
  const {attrNames, attributes_1} = this.state
  if (attrNames === "") return ""
  else return (
    <div className={styles.attrButtons}>
      <button className={styles.firstBut}>
          <span>{attributes_1[0].value}</span>
          <span className={styles.butPrompt}>
            To view and change the selected attributes, click on the button VIEW BAG below to go to the cart 
          </span>
        </button>
        <button className={styles.choosedBut}>{attributes_1[1].value}</button>          
      </div>
  )
}

export default showChosedAttribute