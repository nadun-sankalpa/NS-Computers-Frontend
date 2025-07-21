import './MainContent.css';
import {Route, Routes} from "react-router-dom";
import Home from "../../pages/home/Home.tsx";
import About from "../../pages/About/About.tsx";
import Contact from "../../pages/Contact/Contact.tsx";
import PaymentMethodsPage from "../../pages/PaymentMethod/PaymentMethods";
import LoginPage from "../../pages/login/Login.tsx";

import {ShoppingCart} from "../../pages/ShoppingCart/ShoppingCart.tsx";
import ServicesPage from "@/view/pages/Service/services.tsx";
export function MainContent() {
    return (
        <section>
            <div className="flex justify-center items-center min-h-screen">
                <Routes>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/contact" element={<Contact />}></Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route path="/services" element={<ServicesPage />}></Route>
                    <Route path="/shopping-cart" element={<ShoppingCart />}></Route>
                    <Route path="/payment-methods" element={<PaymentMethodsPage />}></Route>
                </Routes>
            </div>
        </section>
    );
}