import Header from './Header'
import { ThemeProvider } from '../utils/Providers'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
