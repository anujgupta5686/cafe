import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "sonner"

// Layout
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

// Public Pages
import Home from "@/pages/Home"
import Menu from "@/pages/Menu"
import Cart from "@/pages/Cart"
import Checkout from "@/pages/Checkout"

// Admin Pages
import AdminLogin from "@/pages/admin/AdminLogin"
import AdminLayout from "@/pages/admin/AdminLayout"
import AdminDashboard from "@/pages/admin/AdminDashboard"
import Products from "@/pages/admin/Products"
import Orders from "@/pages/admin/Orders"
import AddProduct from "@/pages/admin/AddProduct"

// Hooks
import { useAuth } from "@/hooks/useAuth"

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Admin Auth Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<AddProduct />} />
            <Route path="orders" element={<Orders />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  )
}

export default App
