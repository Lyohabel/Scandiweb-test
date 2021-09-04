function  creatCurrencyButtons() { 
  const {currencies} = this.context
  return currencies && currencies.map((item, index) => 
    <li key={item} onClick={() => this.props.changeCurrency(this.showCurrencySimbol(index), currencies[index], index )}>{this.showCurrencySimbol(index)} {currencies[index]}</li>
  )
}

export default creatCurrencyButtons