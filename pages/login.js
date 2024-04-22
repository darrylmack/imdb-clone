import React from 'react'
import { auth } from '../utils/firebase'

const Login = () => {
  const loginUser = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    try {
      await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={loginUser}>
        <label htmlFor="email">Email</label>
        <input type="text" />
        <input type="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
