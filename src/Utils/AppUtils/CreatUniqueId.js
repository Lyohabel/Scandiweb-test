function createUniqueId(arg) {
  const x = Math.floor(Math.random() * 99)
  const y = Math.floor(Math.random() * 99)
  const uniqueId = x + '-' + y + '-' + arg
  return uniqueId
}

export default createUniqueId