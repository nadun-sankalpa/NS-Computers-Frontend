import { Route, Routes, Navigate } from "react-router-dom";
import { DefaultLayout } from "./view/common/DefaultLayout/DefaultLayout.tsx";
import Login from "./view/pages/login/Login.tsx";
import SignupPage from "./view/pages/login/signup";
import ContactPage from "./view/pages/Contact/Contact.tsx";
import HomePage from "./view/pages/home/Home.tsx";
import { ProductsPage } from "./view/common/Product/ProductPage.tsx";
import AdminDashboard from "./view/pages/AdminDashboard/admin-dashboard.tsx";
import { useAuth } from "@/contexts/AuthContext";
import AboutPage from "@/view/pages/About/About.tsx";
import PaymentMethodsPage from "@/view/pages/PaymentMethod/PaymentMethods.tsx";
import ServicesPage from "@/view/pages/Service/services.tsx";
import { Cart } from "@/components/cart/Cart";
import { useState } from "react";
import { Provider } from 'react-redux';
import { store } from './store';

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

// Root route component to handle redirection based on user role
const RootRedirect = () => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated && user) {
        if (user.role === 'admin') {
            return <Navigate to="/admin-dashboard" replace />;
        }
        return <Navigate to="/home" replace />;
    }

    return <Navigate to="/login" replace />;
};

function App() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <Provider store={store}>
            <Routes>
                {/* Root route with role-based redirection */}
                <Route path="/" element={<RootRedirect />} />

                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Protected user routes with DefaultLayout */}
                <Route path="/home" element={
                    <ProtectedRoute>
                        <DefaultLayout onCartClick={() => setIsCartOpen(true)}>
                            <HomePage />
                        </DefaultLayout>
                    </ProtectedRoute>
                } />
                <Route path="/products" element={
                    <ProtectedRoute>
                        <DefaultLayout onCartClick={() => setIsCartOpen(true)}>
                            <ProductsPage onAddToCart={() => setIsCartOpen(true)} />
                        </DefaultLayout>
                    </ProtectedRoute>
                } />
                <Route path="/contact" element={
                    <ProtectedRoute>
                        <DefaultLayout onCartClick={() => setIsCartOpen(true)}>
                            <ContactPage />
                        </DefaultLayout>
                    </ProtectedRoute>
                } />
                <Route path="/about" element={
                    <ProtectedRoute>
                        <DefaultLayout onCartClick={() => setIsCartOpen(true)}>
                            <AboutPage />
                        </DefaultLayout>
                    </ProtectedRoute>
                } />
                <Route path="/payment-methods" element={
                    <ProtectedRoute>
                        <DefaultLayout onCartClick={() => setIsCartOpen(true)}>
                            <PaymentMethodsPage />
                        </DefaultLayout>
                    </ProtectedRoute>
                } />
                <Route path="/services" element={
                    <ProtectedRoute>
                        <DefaultLayout onCartClick={() => setIsCartOpen(true)}>
                            <ServicesPage />
                        </DefaultLayout>
                    </ProtectedRoute>
                } />

                {/* Admin routes */}
                <Route path="/admin-dashboard" element={
                    <ProtectedRoute requiredRole="admin">
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
            </Routes>

            {/* Cart Sidebar */}
            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </Provider>
    );
}

export default App;