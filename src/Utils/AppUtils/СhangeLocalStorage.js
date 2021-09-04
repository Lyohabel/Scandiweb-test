import createUniqueId from "./CreatUniqueId";

function changeLocalStorage(id, attributeNames, attributeOrders, attributes, attributes_1, prices, gallery, prodName, brand) {
  const cart = window.localStorage.getItem('cart');    
  const jsonCart = JSON.parse(cart);
  const uniqueId = createUniqueId(prodName)    
  //eslint-disable-next-line
  const double = jsonCart.findIndex(item => item.name === id && JSON.stringify(item.attrOrders) === JSON.stringify(this.state.attributeOrders));
  
  if (double === -1) {
    jsonCart.push({uniqueId: uniqueId, name: id, amount: 1, attrs: this.state.attrs,  attrNames: attributeNames, attrOrders: attributeOrders, attributes: attributes, attributes_1: attributes_1, prices: prices, gallery: gallery, prodName: prodName, brand: brand})
  } else {
    jsonCart[double].amount++      
  }       

  window.localStorage.setItem('cart', JSON.stringify(jsonCart));
}

export default changeLocalStorage