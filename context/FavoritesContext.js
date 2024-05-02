import React, { createContext, useState, useEffect, useContext } from 'react'
import { useAuth } from './AuthContext'
import { db } from '../utils/firebase'

const FavoritesContext = createContext()

export const useFavorites = () => useContext(FavoritesContext)

export function FavoritesProvider({ children }) {
  const { currentUser } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true) // Ensure loading state is managed

  useEffect(() => {
    let unsubscribe
    if (currentUser) {
      console.log('Current User in Favorites:', currentUser)
      unsubscribe = fetchFavorites(currentUser.uid)
    } else {
      console.log('No Current User in Favorites')
      setFavorites([])
    }

    // Return a cleanup function to unsubscribe from the snapshot listener
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [currentUser])

  const fetchFavorites = (userId) => {
    const favoritesRef = db
      .collection('users')
      .doc(userId)
      .collection('favorites')

    const unsubscribe = favoritesRef.onSnapshot(
      (snapshot) => {
        const favoritesList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setFavorites(favoritesList)
        setLoading(false) // Set loading to false after fetching data
      },
      (error) => {
        console.error('Failed to fetch favorites', error)
      }
    )

    // Return the unsubscribe function to clean up the subscription
    return unsubscribe
  }

  return (
    <FavoritesContext.Provider value={{ favorites, loading }}>
      {children}
    </FavoritesContext.Provider>
  )
}
