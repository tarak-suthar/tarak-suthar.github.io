import './App.css'
import { Route, Routes } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import CallbackPage from './pages/CallbackPage'
import Container from './components/Container'
import RegisterPage from './pages/RegisterPage'
import { SidebarContextProvider } from "./context/SidebarContext"
import WishlistPage from './pages/WishlistPage.jsx'
import { LoginRegisterModalProvider } from './context/LoginRegisterToggleContext'
import LoginRegisterModal from './components/LoginRegisterModal'

function App() {

  return (
    <LoginRegisterModalProvider>
      <SidebarContextProvider>
        <Container>
          <Routes>
            <Route path="/" element={<ProductsPage/>} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/callback" element={<CallbackPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/wishlist" element={<WishlistPage/>} />
            <Route path="*" element={<></>} />
          </Routes>
        </Container>
        <LoginRegisterModal/>
      </SidebarContextProvider>
    </LoginRegisterModalProvider>
  )
}

export default App