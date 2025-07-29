import { ReactNode } from 'react';
import Navbar from "../Navbar/Navbar.tsx";
import Footer from "../Footer/Footer.tsx";

interface DefaultLayoutProps {
    children?: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}