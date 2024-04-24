import '../styles/globals.css'
import Layout from '../components/Layout'
import { FavoritesProvider } from '../context/FavoritesContext'
import { AuthProvider } from '../context/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FavoritesProvider>
    </AuthProvider>
  )
}

export default MyApp
