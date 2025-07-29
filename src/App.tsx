import {Route, Routes} from "react-router-dom";
import {DefaultLayout} from "./view/common/DefaultLayout/DefaultLayout.tsx";
import Login from "./view/pages/login/Login.tsx";
import SignupPage from "./view/pages/Signup/Signup.tsx";
import ContactPage from "./view/pages/Contact/Contact.tsx";
import HomePage from "./view/pages/home/Home.tsx";
import ProductsPage from "./view/common/Product/ProductPage.tsx";

function App() {
    return (
        <DefaultLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SignupPage/>} />
                <Route path="/contact" element={<ContactPage/>} />
                {/* Add more routes here as needed */}
            </Routes>
        </DefaultLayout>
    )
}

export default App
