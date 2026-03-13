import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'

import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import ConfirmPassword from './pages/ConfirmPassword.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import Profile from './pages/Profile.jsx'
import AboutUs from './pages/AboutUs.jsx'
import FurnitureCatalog from './pages/FurnitureCatalog'
import ProductDetails from './pages/ProductDetails'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AddFurniture from './pages/AddFurniture'
import EditFurniture from './pages/EditFurniture'
import FurnitureManagement from './pages/FurnitureManagement.jsx'
import ManageUsers from './pages/ManageUsers.jsx'
import ManageDesigns from './pages/ManageDesigns.jsx'
import AdminDesigns from './pages/AdminDesigns.jsx'
import AdminCatalog from './pages/AdminCatalog.jsx'
import Payment from './pages/Payment.jsx'   // ✅ NEW IMPORT
import PurchaseHistory from './pages/PurchaseHistory.jsx'; // ✅ NEW
import MyDesigns from './pages/MyDesigns.jsx'; // ✅ NEW
import Viewer3D from './pages/Viewer3D.jsx'; // ✅ NEW
import Designs from './pages/Designs'
import Designer from './pages/Designer'


function App() {
  return (
    <>
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<AboutUs />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/confirm-password" element={<ConfirmPassword />} />

      {/* User Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/catalog" element={<FurnitureCatalog />} />
      <Route path="/designer" element={<Designer />} />
      <Route path="/my-designs" element={<MyDesigns />} />
      <Route path="/viewer" element={<Viewer3D />} />

      <Route path="/designs" element={<Designs />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      <Route path="/purchase-history" element={<PurchaseHistory />} />
      <Route path="/payment/:id" element={<Payment />} />

      {/* Admin routes */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<ManageUsers />} />
      <Route path="/admin/furniture-management" element={<FurnitureManagement />} />
      <Route path="/admin/add" element={<AddFurniture />} />
      <Route path="/admin/edit/:id" element={<EditFurniture />} />
      <Route path="/admin/catalog" element={<AdminCatalog />} />
      <Route path="/admin/designs" element={<AdminDesigns />} />
      <Route path="/admin/manage-designs" element={<ManageDesigns />} />

    </Routes>
    <Toaster position="top-center" richColors closeButton />
    </>
  )
}

export default App