import React from 'react'
import { auth } from '../utils/firebase'
import { useRouter } from 'next/router'
import Link from 'next/link'



const Login = () => {
  const router = useRouter()
  const loginWithEmail = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    try {
      await auth.signInWithEmailAndPassword(email, password)
      router.push('/' )
    } catch (error) {
      console.error(error)
    }
  }



  return (
    <div className="flex min-h-screen bg-gray-900">
    <div className="flex min-h-full flex-1 flex-col  px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
   
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        Login to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div className='bg-gray-700 px-6 py-12 sahdow sm:rounded-lg sm:px-10 sm:py-12 sm:shadow-md sm:ring-1 sm:ring-inset sm:ring-white/10 sm:bg-gray-800 sm:divide-y sm:divide-gray-700 sm:divide-opacity-75 sm:divide-solid sm:space-y-6'>
      <form className="space-y-6" onSubmit={loginWithEmail}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
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
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
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
            Sign in
          </button>
        </div>
      </form>
      

  
      </div>
      <p className="mt-10 text-center text-sm text-gray-400">
        Not a member?{' '}
        <Link href="/signup" className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
          Create a free account
        </Link>
      </p>
    </div>
  </div>
  </div>
  )
}

export default Login
