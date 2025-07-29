import './MainContent.css';
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/home/Home.tsx";
import About from "../../pages/About/About.tsx";
import Contact from "../../pages/Contact/Contact.tsx";
import PaymentMethodsPage from "../../pages/PaymentMethod/PaymentMethods";
import { ShoppingCart } from "../../pages/ShoppingCart/ShoppingCart.tsx";
import ServicesPage from "../../pages/Service/services";
import { ProductCard } from "../Product/ProductCard.tsx";


export function MainContent() {
    return (
        <section>
            <div className="flex justify-center items-center min-h-screen">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/product" element={<ProductCard/>} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/shopping-cart" element={<ShoppingCart />} />
                    <Route path="/payment-methods" element={<PaymentMethodsPage />} />
                </Routes>
            </div>
        </section>
    );
}