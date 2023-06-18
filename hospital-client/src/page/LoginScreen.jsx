function LoginScreen() {
  const handleLogin = () => {
  }
  return (
    <div>
      LoginScreen
      <br />
      <input type="text" placeholder="username" />
      <br />
      <input type="password" placeholder="password" />
      <br />
      <button onClick={() => handleLogin()}>Login</button>
    </div>
  )
}

export default LoginScreen