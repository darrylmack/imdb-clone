import { useState, useEffect } from 'react'
import {
  HomeIcon,
  UserIcon,
  HeartIcon,
  InformationCircleIcon
} from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { auth } from '../utils/firebase'
import HeaderIcon from './HeaderIcon'

import { useAuth } from '../context/AuthContext'

const Header = () => {
  const { currentUser, loading } = useAuth()
  const router = useRouter()
  const [isSignedIn, setIsSignedIn] = useState(false)

  const signOut = async () => {
    console.log('Signing Out')
    try {
      await auth.signOut()
   setIsSignedIn(false)
    } catch (error) {
      console.error(error.message)
    }
 
    router.push('/')
  }
  useEffect(() => {
    if (currentUser) {
      console.log('Current User:', currentUser)
      setIsSignedIn(currentUser ? true : false)
    }
  }, [loading, currentUser])

  return (
    <div className="bg-gray-900 text-gray-200 flex flex-col  items-center p-6 py-8 select-none sm:flex-row justify-between">
      <div className="flex">
        <img
          src="/images/reel-favorites-logo-white.png"
          width="200px"
          height="auto"
          alt="Reel Favorites Logo"
          className="cursor-pointer active:brightness-110"
          onClick={() => router.push('/')}
        />
      </div>{' '}
      <div className="flex">
        <button onClick={() => router.push('/')}>
          <HeaderIcon title="HOME" Icon={HomeIcon} />
        </button>
        <button onClick={() => router.push('/about')}>
          <HeaderIcon title="ABOUT" Icon={InformationCircleIcon} />
        </button>
        {isSignedIn && (
          <button onClick={() => router.push('/favorites')}>
            <HeaderIcon title="FAVORITES" Icon={HeartIcon} />
          </button>
        )}
        {isSignedIn && (
          <button onClick={signOut}>
            <HeaderIcon title="SIGN OUT" Icon={UserIcon} />
          </button>
        )}
        {!isSignedIn && (
          <button onClick={() => router.push('/login')}>
            <HeaderIcon title="SIGN IN" Icon={UserIcon} />
          </button>
        )}
      </div>
    </div>
  )
}

export default Header
