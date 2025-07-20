"use client"

import { useState, useEffect } from "react"
import { Menu, X, Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navItems = [
        { name: "HOME", href: "#", active: true },
        { name: "ABOUT US", href: "/about" },
        { name: "ALL PRODUCTS", href: "#", hasDropdown: true },
        { name: "SERVICES", href: "#" },
        { name: "PAYMENT METHODS", href: "#" },
        { name: "GALLERY", href: "#" },
        { name: "CONTACT US", href: "/Contact" },
    ]

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            {/* Top Banner */}
            <div className="bg-gray-900 text-white text-sm py-2 px-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-center flex-1">
                        {"All prices displayed are "}
                        <span className="font-bold text-red-500">EXCLUSIVE</span>
                        {" of VAT."}
                    </div>
                    <div className="hidden md:flex items-center space-x-4 text-xs">
                        <a href="/login" className="hover:underline">LOGIN / REGISTER</a>
                        <span>|</span>
                        <span>INSTALMENT PLANS</span>
                        <span>|</span>
                        <span>MY CART</span>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav
                className={`bg-black/95 backdrop-blur-md transition-all duration-300 ${
                    isScrolled ? "shadow-lg shadow-red-500/20" : ""
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-4">
                        {/* Logo */}
                        <div className="flex items-center space-x-4">
                            <div className="text-red-500 font-bold text-2xl">
                                NS-Computers<sup className="text-xs">®</sup>
                            </div>
                            <div className="hidden lg:block">
                                <div className="text-white font-semibold">NS-COMPUTERS ONLINE STORE</div>
                                <div className="text-gray-400 text-xs">GAMING LAPTOPS | WORKSTATIONS | CUSTOM BUILDS</div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="hidden lg:flex items-center space-x-6">
                            <div className="text-center">
                                <div className="text-white text-xs">[ ONLINE STORE ]</div>
                                <div className="text-red-500 font-bold text-lg">+94 762 099 693</div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-white text-sm">Follow Us:</span>
                                <Facebook className="w-5 h-5 text-blue-500 hover:text-blue-400 cursor-pointer transition-colors" />
                                <Instagram className="w-5 h-5 text-pink-500 hover:text-pink-400 cursor-pointer transition-colors" />
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="lg:hidden text-white"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                    </div>

                    {/* Navigation Menu */}
                    <div className={`${isMenuOpen ? "block" : "hidden"} lg:block border-t border-gray-800 lg:border-t-0`}>
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 lg:py-2">
                            <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-8">
                                {navItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={item.href}
                                        className={`relative group px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-red-500 ${
                                            item.active ? "text-red-500" : "text-white"
                                        }`}
                                        onClick={() => {
                                            // Close mobile menu when a link is clicked
                                            if (isMenuOpen) {
                                                setIsMenuOpen(false);
                                            }
                                        }}
                                    >
                                        {item.name}
                                        {item.active && (
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 animate-pulse"></div>
                                        )}
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                    </Link>
                                ))}
                            </div>

                            {/* Search Bar */}
                            <div className="flex items-center mt-4 lg:mt-0">
                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder="SEARCH HERE"
                                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 pr-12 w-64"
                                    />
                                    <Button
                                        size="sm"
                                        className="absolute right-0 top-0 bottom-0 bg-red-600 hover:bg-red-700 text-white px-4"
                                    >
                                        Search
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
