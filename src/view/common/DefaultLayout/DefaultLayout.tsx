import { Outlet } from 'react-router-dom';
import Navbar from "../Navbar/Navbar.tsx";
import Footer from "../Footer/Footer.tsx";

export function DefaultLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}