import './MainContent.css';
import {Route, Routes} from "react-router-dom";
import Home from "../../pages/home/Home.tsx";
import About from "../../pages/About/About.tsx";
import Contact from "../../pages/Contact/Contact.tsx";
import {ShoppingCart} from "../../pages/ShoppingCart/ShoppingCart.tsx";
export function MainContent() {
    return (
        <section>
            <div className="flex justify-center items-center min-h-screen">
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/contact" element={<Contact />}></Route>
                    <Route path="/shopping-cart" element={<ShoppingCart  />}></Route>
                </Routes>
            </div>
        </section>


    );
}