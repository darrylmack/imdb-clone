import React from 'react'
import { useRouter } from 'next/router'
import { auth } from '../../utils/firebase'


const Account = () => {
  const router = useRouter()

  if (!auth.currentUser) {
    router.push('/login') 
    return (
      <div>
        <h1>Account</h1>
        <p>You need to be signed in to view this page</p>
      </div>
    )
  } 
  
  return (
    <div>
      <h1>Account</h1>
    </div>
  )
}

export default Account
