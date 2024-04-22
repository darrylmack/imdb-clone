import React from 'react'
import { auth } from '../utils/firebase'

const SignUp = () => {
  const signUpUser = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    try {
      await auth.createUserWithEmailAndPassword(email, password)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={signUpUser}>
        <input type="text" />
        <input type="password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
