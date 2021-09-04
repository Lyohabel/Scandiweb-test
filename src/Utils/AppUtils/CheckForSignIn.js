function checkForSignIn() {
  const cookie = document.cookie.split(';')
  const user = cookie.find(item => item === 'login=user');
  return user
}

  export default checkForSignIn