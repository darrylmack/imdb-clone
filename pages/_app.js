import '../styles/globals.css'
import Layout from '../components/Layout'
import { FavoritesProvider } from '../context/FavoritesContext'


function MyApp({ Component, pageProps }) {
  return (
    <FavoritesProvider>
  <Layout>

      <Component {...pageProps} />

    </Layout> </FavoritesProvider>
  
  
  )
}

export default MyApp
