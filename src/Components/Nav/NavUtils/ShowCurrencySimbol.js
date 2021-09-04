function showCurrencySimbol(index) {
  switch(this.context.currencies[index]) {  // eslint-disable-line
    case 'USD': 
      return (<span>$</span>);

    case 'GBP':
      return (<span>&pound;</span>);      

    case 'AUD':
      return (<span>A$</span>);

    case 'JPY':
      return (<span>&#165;</span>);
     
    case 'RUB':
      return (<span>&#8381;</span>);
  }
}

export default showCurrencySimbol