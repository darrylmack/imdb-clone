import React, { createContext, useState, useEffect, useContext } from 'react'
import { useAuth } from './AuthContext'
import { db } from '../utils/firebase'

const FavoritesContext = createContext()

export const useFavorites = () => useContext(FavoritesContext)

export function FavoritesProvider({ children }) {
  const { currentUser, loading } = useAuth()
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const unsubscribe = (currentUser) => {
      if (currentUser) {
        console.log('Current User in Favorites:', currentUser)
        fetchFavorites(currentUser.uid)
      } else {
        console.log('No Current User in Favorites')
        setFavorites([])
      }
    }

    return () => unsubscribe() // Cleanup subscription
  }, [currentUser, loading])

  console.log('Favorites:', favorites)
  const fetchFavorites = async (userId) => {
    try {
      const moviesRef = db.collection('users').doc(userId).collection('movies')
      const snapshot = await moviesRef.get()
      const moviesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setFavorites(moviesList)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch favorites', error)
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, loading }}>
      {children}
    </FavoritesContext.Provider>
  )
}
