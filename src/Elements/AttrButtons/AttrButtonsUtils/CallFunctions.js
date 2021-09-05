function callFunctions(attrName, value, order, index) {
  if (this.props.cartProduct) {
    this.addAttrToCart(attrName, value, order, index)
  } else {
    this.props.changeAttributes(attrName, value, order, index);
    this.changeAttributeOrders(order, index);
  }
}

export default callFunctions