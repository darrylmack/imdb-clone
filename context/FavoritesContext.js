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
    if (currentUser) {
      console.log('Current User in Favorites:', currentUser)
      fetchFavorites(currentUser.uid)
    } else {
      console.log('No Current User in Favorites')
      setFavorites([])
    }

    // Return a cleanup function if you have real subscriptions or listeners
    return () => {
      // Cleanup code here, if any
    }
  }, [currentUser]) // Remove loading from dependencies if not needed

  const fetchFavorites = async (userId) => {
    try {
      const favoritesRef = db
        .collection('users')
        .doc(userId)
        .collection('favorites')
      const snapshot = await favoritesRef.get()
      const favoritesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setFavorites(favoritesList)
    } catch (error) {
      console.error('Failed to fetch favorites', error)
    }
    setLoading(false) // Set loading to false after fetching data
  }

  return (
    <FavoritesContext.Provider value={{ favorites, loading }}>
      {children}
    </FavoritesContext.Provider>
  )
}
