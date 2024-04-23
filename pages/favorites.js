
import Results from '../components/Favorites';
import { useFavorites } from '../context/FavoritesContext'

function FavoriteMovies() {
  const { favorites, loading } = useFavorites();

  // if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Results results={favorites} />
      {/* <h1>My Favorite Movies</h1>
      <ul>
        {favorites.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default FavoriteMovies;
