function changeAttributeOrders(order, index) {
  const list = this.props.attributeOrders;
  list[order] = index;
  this.props.changeAttributeOrders(list)
}

export default changeAttributeOrders