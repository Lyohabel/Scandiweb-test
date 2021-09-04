import {DEFAULT} from '../../CONST';

function creatControl(item) {
  const preControl = JSON.stringify(item).split('"')[1]
  const control = preControl.slice(0, preControl.length)
  return control
}

function forChangeAttributes(attrName, attrValue) {
  const key = attrName.toLowerCase()
  const newAttr = {}
  newAttr[key] = attrValue
  let newAttrs = []

  if (this.state.attrs === DEFAULT) {
    newAttrs = [newAttr]
  } else {
      newAttrs = this.state.attrs;        
      const newArr = newAttrs.filter(item => creatControl(item) !== key);
     
      newAttrs = newArr
      newAttrs.push(newAttr)
    }
  return newAttrs
}

export default forChangeAttributes