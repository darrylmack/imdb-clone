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
      <form className="space-y-6" action="#" method="POST">
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
      

      <div className="mt-2">
      <div className="relative mt-6 ">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6 ">
                  <span className="bg-white px-6  text-gray-900">Or sign-in with</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {/* Google Login */}
                <div>
                <button
                onClick={GoogleLogin}
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                >
                  <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                    <path
                      d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                      fill="#34A853"
                    />
                  </svg>
                  <span className="text-sm font-semibold leading-6">Google</span>
                </button>
                </div>
            

{/* Facebook Login */}
                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="blue" className="bi bi-facebook" viewBox="0 0 16 16">
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
        </svg>
                  <span className="text-sm font-semibold leading-6">Facebook</span>
                </a>
              </div>
      </div>
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
