import { useState } from 'react'
import './App.css'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import { Route, Routes } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import ConfirmPassword from './pages/ConfirmPassword.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import Profile from './pages/Profile.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Designer from './pages/Designer.jsx'
import FurnitureCatalog from './pages/FurnitureCatalog';
import ProductDetails from './pages/ProductDetails'; 
import AdminDashboard from './pages/AdminDashboard.jsx';
import AddFurniture from './pages/AddFurniture';
import EditFurniture from './pages/EditFurniture';
import FurnitureManagement from './pages/FurnitureManagement.jsx'

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/confirm-password" element={<ConfirmPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/catalog" element={<FurnitureCatalog />} />
      <Route path="/designer" element={<Designer />} />
          
      {/* Detailed View for a single item */}
      <Route path="/product/:id" element={<ProductDetails />} />
          
          {/* Admin routes */}
          <Route path="/admin/furniture-management" element={<FurnitureManagement />} />
          <Route path="/admin/add" element={<AddFurniture />} />
          <Route path="/admin/edit/:id" element={<EditFurniture />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  )
}

export default App
