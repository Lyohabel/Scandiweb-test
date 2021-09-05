function creatAttributeOrdersList(arg) {
  if (!arg) return '';
  const list = [];
  const attrLength = arg.length
  for (let i = 0; i < attrLength; i++) {
    list.push(0)
  }    
  return list
}

  export default creatAttributeOrdersList