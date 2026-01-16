import './App.css'
import { Route, Routes } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import CallbackPage from './pages/CallbackPage'
import Container from './components/Container'
import RegisterPage from './pages/RegisterPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import { SidebarContextProvider } from "./context/SidebarContext"
import WishlistPage from './pages/WishlistPage.jsx'
import { LoginRegisterModalProvider } from './context/LoginRegisterToggleContext'
import LoginRegisterModal from './components/LoginRegisterModal'
import FireToastsByParams from './components/FireToastsByParams/FireToastsByParams.jsx'
import EmptyPage from './pages/EmptyPage.jsx'

function App() {

  return (
    <LoginRegisterModalProvider>
      <SidebarContextProvider>
        <FireToastsByParams>
          <Container>
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/callback" element={<CallbackPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="*" element={<></>} />
            </Routes>
          </Container>
        </FireToastsByParams>
        <LoginRegisterModal />
      </SidebarContextProvider>
    </LoginRegisterModalProvider>
  )
}

export default App