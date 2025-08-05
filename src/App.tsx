import { Route, Routes, Navigate } from "react-router-dom";
import { DefaultLayout } from "./view/common/DefaultLayout/DefaultLayout.tsx";
import Login from "./view/pages/login/Login.tsx";
import SignupPage from "./view/pages/login/signup";
import ContactPage from "./view/pages/Contact/Contact.tsx";
import HomePage from "./view/pages/home/Home.tsx";
import { ProductsPage } from "./view/common/Product/ProductPage.tsx";
import AdminDashboard from "./view/pages/AdminDashboard/admin-dashboard.tsx";
import AdminUsersPage from './view/pages/AdminUsers/admin-users';
import AdminOrdersPage from './view/pages/AdminOrders/admin-orders';
import AdminProductPage from './view/pages/AdminProducts/admin-products';
import { useAuth } from "@/contexts/AuthContext";
import AboutPage from "@/view/pages/About/About.tsx";
import PaymentMethodsPage from "@/view/pages/PaymentMethod/PaymentMethods.tsx";
import ServicesPage from "@/view/pages/Service/services.tsx";
import CartButton from "@/features/cart/CartButton";
import { useState, useEffect } from "react";
import { Provider, useDispatch } from 'react-redux';
import { store } from "./store";
import { loadCart } from "@/features/cart/cartSlice";

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = 'user' }: { children: React.ReactNode, requiredRole?: 'user' | 'admin' }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole === 'admin' && (!user || user.role !== 'admin')) {
        return <Navigate to="/admin-dashboard" replace />;
    }

    return <>{children}</>;
};

// Root route component to redirect to home page by default
const RootRedirect = () => {
    return <Navigate to="/home" replace />;
};

// CartProvider component to handle cart state
const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();

    // Load cart from localStorage when component mounts
    useEffect(() => {
        dispatch(loadCart());
    }, [dispatch]);

    return <>{children}</>;
};

function App() {
    return (
        <Provider store={store}>
            <CartProvider>
                <Routes>
                    {/* Root route with role-based redirection */}
                    <Route path="/" element={<RootRedirect />} />

                    {/* Public routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignupPage />} />

                    {/* Routes with DefaultLayout */}
                    <Route path="/" element={
                        <DefaultLayout onCartClick={() => {
                            const cartButton = document.querySelector('.fixed.bottom-8.right-8 button');
                            if (cartButton) {
                                cartButton.dispatchEvent(new Event('click', { bubbles: true }));
                            }
                        }} />
                    }>
                        <Route path="/home" element={
                            <ProtectedRoute>
                                <HomePage />
                            </ProtectedRoute>
                        } />
                        <Route path="/products" element={
                            <ProtectedRoute>
                                <ProductsPage onAddToCart={() => {
                                    const cartButton = document.querySelector('.fixed.bottom-8.right-8 button');
                                    if (cartButton) {
                                        cartButton.dispatchEvent(new Event('click', { bubbles: true }));
                                    }
                                }} />
                            </ProtectedRoute>
                        } />
                        <Route path="/contact" element={
                            <ProtectedRoute>
                                <ContactPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/about" element={
                            <ProtectedRoute>
                                <AboutPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/services" element={
                            <ProtectedRoute>
                                <ServicesPage />
                            </ProtectedRoute>
                        } />
                        <Route path="/payment-methods" element={
                            <ProtectedRoute>
                                <PaymentMethodsPage />
                            </ProtectedRoute>
                        } />
                    </Route>

                    {/* Admin protected routes */}
                    <Route
                        path="/admin-dashboard"
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin-users"
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <AdminUsersPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin-orders"
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <AdminOrdersPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin-products"
                        element={
                            <ProtectedRoute requiredRole="admin">
                                <AdminProductPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </CartProvider>
        </Provider>
    );
}

export default App;