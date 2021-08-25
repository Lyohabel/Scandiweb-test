function signIn() {
  document.cookie = 'login=user;'
  this.props.setDisplaySignIn('no')
}

  export default signIn