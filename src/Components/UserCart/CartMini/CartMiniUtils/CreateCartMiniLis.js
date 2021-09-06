import CartMiniProduct from '../CartMiniProduct';

function createCartMiniList(data) {        
  return data && data.map((item) =>
    <CartMiniProduct key={item.uniqueId} id={item.uniqueId} name={item.name}
    setMiniCartChanged={this.props.setMiniCartChanged}
    miniCartProductChanged={this.props.miniCartProductChanged}           
    setMiniCartProductChanged={this.props.setMiniCartProductChanged}/>
  )
}

export default createCartMiniList