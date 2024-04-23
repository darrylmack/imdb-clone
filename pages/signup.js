import { useState } from 'react'

import { db, auth, now } from '../utils/firebase'
import Link from 'next/link'



const Login = () => {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [email, setEmail] = useState('')
const [error, setError] = useState(null)

  const signUpWithEmail = async (e) => {
    try {
      e.preventDefault()
      // Create a new user with email and password
      const userCredential = await auth.createUserWithEmailAndPassword(email, password)
      const user = userCredential.user

      // Add a new user document to the users collection
      await db.collection('users').doc(user.uid).set({
        email: user.email,
        username,
        createdAt: now,
      })

      console.log("User created successfully :",  user.uid)
    }

    catch (error) { 
      setError(error.message) 
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
    <div className="flex min-h-full flex-1 flex-col  px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
   
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        Sign Up to Save Your Favorites
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div className='bg-gray-700 px-6 py-12 sahdow sm:rounded-lg sm:px-10 sm:py-12 sm:shadow-md sm:ring-1 sm:ring-inset sm:ring-white/10 sm:bg-gray-800 sm:divide-y sm:divide-gray-700 sm:divide-opacity-75 sm:divide-solid sm:space-y-6'>
      <form className="space-y-6" onSubmit={signUpWithEmail}>
      <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
            Username
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
            Email Address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
              Password
            </label>
       
          </div>
          <div className="mt-2">
            <input
          
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Sign Up
          </button>
        </div>
      </form>
      

  
      </div>
      <p className="mt-10 text-center text-sm text-gray-400">
        Already a member?{' '}
        <Link href="/login" className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
          Login in to your account
        </Link>
      </p>
    </div>
  </div>
  </div>
  )
}

export default Login
