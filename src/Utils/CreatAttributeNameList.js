function creatAttributeNameList(arg) {
  if (!arg[0]) return '';
  let list = [];
  arg.forEach(item => {
    list.push(item.id);
  });
  return list;
}

  export default creatAttributeNameList