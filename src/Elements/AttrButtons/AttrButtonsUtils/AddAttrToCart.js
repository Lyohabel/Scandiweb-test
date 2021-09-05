import {DEFAULT} from '../../../CONST';

function addAttrToCart(attr, value, order, index) {
  if (!window.localStorage.getItem('cart')) return;

  const cart = window.localStorage.getItem('cart');    
  const jsonCart = JSON.parse(cart);
  const x = jsonCart.findIndex(item => item.uniqueId === this.props.id);
  jsonCart[x].attrOrders[order] = index
  const key = attr.toLowerCase()
  const newAttr = {}
  newAttr[key] = value

  if (jsonCart[x].attrs === DEFAULT) {
    jsonCart[x].attrs = [newAttr]      
  } else {
    const y = jsonCart[x].attrs.findIndex(item => JSON.stringify(item).includes(key) === true)
    if(y !== -1) jsonCart[x].attrs.splice(y, 1)
    jsonCart[x].attrs.push(newAttr)
    }
   window.localStorage.setItem('cart', JSON.stringify(jsonCart));
}

  export default addAttrToCart