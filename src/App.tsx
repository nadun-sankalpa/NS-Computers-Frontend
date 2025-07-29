import {Route, Routes, Navigate} from "react-router-dom";
import {DefaultLayout} from "./view/common/DefaultLayout/DefaultLayout.tsx";
import Login from "./view/pages/login/Login.tsx";
import SignupPage from "./view/pages/login/signup";
import ContactPage from "./view/pages/Contact/Contact.tsx";
import HomePage from "./view/pages/home/Home.tsx";
import ProductsPage from "./view/common/Product/ProductPage.tsx";
import AdminDashboard from "./view/pages/AdminDashboard/admin-dashboard.tsx";
import { useAuth } from "@/contexts/AuthContext";
import AboutPage from "@/view/pages/About/About.tsx";
import PaymentMethodsPage from "@/view/pages/PaymentMethod/PaymentMethods.tsx";
import ServicesPage from "@/view/pages/Service/services.tsx";

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = 'user' }: { children: React.ReactNode, requiredRole?: 'user' | 'admin' }) => {
    const { isAuthenticated, user } = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    if (requiredRole === 'admin' && (!user || user.role !== 'admin')) {
        return <Navigate to="/" replace />;
    }
    
    return <>{children}</>;
};

function App() {
    return (
        <Routes>
            {/* Redirect root to /home */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            
            {/* Routes with DefaultLayout */}
            <Route element={<DefaultLayout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/payment-methods" element={<PaymentMethodsPage />} />
                <Route path="/services" element={<ServicesPage />} />
            </Route>
            
            {/* Routes without DefaultLayout */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute requiredRole="admin">
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default App
