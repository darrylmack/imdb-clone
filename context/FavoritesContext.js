import React, { createContext, useState, useEffect, useContext } from 'react';
import { db, auth } from '../utils/firebase';


const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchFavorites(user.uid);
      } else {
        setFavorites([]);
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const fetchFavorites = async (userId) => {
    try {
      const moviesRef = db.collection('users').doc(userId).collection('movies');
      const snapshot = await moviesRef.get();
      const moviesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFavorites(moviesList);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch favorites", error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
}
