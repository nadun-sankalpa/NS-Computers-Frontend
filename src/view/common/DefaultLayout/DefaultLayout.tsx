import { Outlet } from 'react-router-dom';
import Navbar from "../Navbar/Navbar.tsx";
import Footer from "../Footer/Footer.tsx";
import { CartButton } from '@/components/cart/CartButton';

interface DefaultLayoutProps {
    children: React.ReactNode;
    onCartClick?: () => void;
}

export function DefaultLayout({ children, onCartClick }: DefaultLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar>
                <CartButton onClick={onCartClick} />
            </Navbar>
            <main className="flex-grow">
                {children || <Outlet />}
            </main>
            <Footer />
        </div>
    );
}