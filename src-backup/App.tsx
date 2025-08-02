import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from 'react';
import { DefaultLayout } from "./view/common/DefaultLayout/DefaultLayout.tsx";
import Login from "./view/pages/login/Login.tsx";
import AdminDashboard from "./view/pages/AdminDashboard/admin-dashboard.tsx";
import AdminProducts from "./view/pages/AdminProducts/admin-products";
import AdminUsers from "./view/pages/AdminUsers/admin-users";
import AdminOrdersPage from "./view/pages/AdminOrders/admin-orders";
import { useAuth } from "@/contexts/AuthContext";
import { Provider } from 'react-redux';
import store from './store/store';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = 'user' }: { children: React.ReactNode, requiredRole?: 'user' | 'admin' }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole === 'admin' && (!user || (user.role && user.role !== 'admin'))) {
        return <Navigate to="/home" replace />;
    }

    return <>{children}</>;
};

// Root route component to redirect based on authentication
const RootRedirect = () => {
    const { isAuthenticated, user } = useAuth();
    
    if (isAuthenticated && user) {
        if (user.role === 'admin') {
            return <Navigate to="/admin-dashboard" replace />;
        }
        return <Navigate to="/login" replace />;
    }
    
    return <Navigate to="/login" replace />;
};

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <Routes>
                    {/* Root route with role-based redirection */}
                    <Route path="/" element={<RootRedirect />} />
                    
                    {/* Public routes */}
                    <Route path="/login" element={<Login />} />

                    {/* Admin routes */}
                    <Route path="/admin-dashboard" element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/products" element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminProducts />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/users" element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminUsers />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/orders" element={
                        <ProtectedRoute requiredRole="admin">
                            <AdminOrdersPage />
                        </ProtectedRoute>
                    } />

                    {/* 404 route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                {/* Cart component removed as it's not needed in admin panel */}
                <ToastContainer 
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
