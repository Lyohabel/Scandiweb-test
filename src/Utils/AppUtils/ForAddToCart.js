import checkForSignIn from "./CheckForSignIn";
import createUniqueId from "./CreatUniqueId";

function forAddToCart(inStock, id, attributeNames, attributeOrders, attributes, attributes_1, prices, gallery, prodName, brand) {
  if (checkForSignIn() !== 'login=user') {
    this.setDisplaySignIn('yes')
    return;
  } else if (inStock === true) {
      const uniqueId = createUniqueId(prodName)      
      if (window.localStorage.getItem('cart')) {
        this.changeLocalStorage(id, attributeNames, attributeOrders, attributes, attributes_1, prices, gallery, prodName, brand)
        } else {
        window.localStorage.setItem('cart', JSON.stringify([{uniqueId: uniqueId, name: id, amount: 1, attrs: this.state.attrs, attrNames: attributeNames, attrOrders: attributeOrders, attributes: attributes, attributes_1: attributes_1, prices: prices, gallery: gallery, prodName: prodName, brand: brand}]));
        }    
      
      const newCount = JSON.parse(window.localStorage.getItem('cart')).length;
      return newCount        
    } 
}

export default forAddToCart