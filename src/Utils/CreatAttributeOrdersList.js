function creatAttributeOrdersList(arg) {
  if (!arg) return '';
  let list = [];
  const attrLength = arg.length
  for (let i = 0; i < attrLength; i++) {
    list.push(0)
  }    
  return list
}

  export default creatAttributeOrdersList