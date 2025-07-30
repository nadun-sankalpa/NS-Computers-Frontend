"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Star, Shield, Truck, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AuthNotification } from "@/components/ui"
import { useAuth } from "@/contexts/AuthContext"
import ParticleBackground from "./particle-background"

export default function HomePage() {
    const { isAuthenticated, user, loading } = useAuth()
    const [showNotification, setShowNotification] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    // Show notification on login
    useEffect(() => {
        // Skip the initial render
        if (isInitialLoad) {
            console.log('Skipping initial render');
            setIsInitialLoad(false);
            return;
        }

        // Only run this effect after initial auth check is complete
        if (loading) {
            console.log('Auth is still loading...');
            return;
        }
        
        console.log('Auth state changed:', { isAuthenticated, user });
        
        if (isAuthenticated && user) {
            console.log('User is authenticated, showing notification...');
            
            // Reset the notification flag if this is a new login
            const lastLogin = sessionStorage.getItem('lastLogin');
            const currentTime = new Date().getTime();
            
            // If it's a new login (no lastLogin or more than 1 minute ago)
            if (!lastLogin || (currentTime - parseInt(lastLogin)) > 60000) {
                console.log('New login detected, showing notification');
                setShowNotification(true);
                
                // Auto-hide after 5 seconds
                const timer = setTimeout(() => {
                    console.log('Auto-hiding notification');
                    setShowNotification(false);
                }, 5000);
                
                // Store the current login time
                sessionStorage.setItem('lastLogin', currentTime.toString());
                
                return () => clearTimeout(timer);
            } else {
                console.log('Recent login detected, not showing notification again');
            }
        } else {
            console.log('User is not authenticated, resetting notification state');
            setShowNotification(false);
        }
    }, [isAuthenticated, user, loading, isInitialLoad]);

    const handleNotificationClose = useCallback(() => {
        console.log('Manually closing notification');
        setShowNotification(false);
    }, []);

    const heroSlides = [
        {
            title: "GAMING LAPTOPS",
            subtitle: "THE POWER IS IN THE GAME",
            image: "/images/asnus no bg.png",
            background: "bg-gradient-to-r from-black-900 via-yellow-900 to-black-900",
        },
        {
            title: "WORKSTATION LAPTOPS",
            subtitle: "PROFESSIONAL PERFORMANCE",
            image: "/images/macbooks.png",
            background: "bg-gradient-to-r from-black-900 via-blue-900 to-black-900",
        },
        {
            title: "GAMING LAPTOPS",
            subtitle: "ULTIMATE GAMING EXPERIENCE",
            image: "/images/asus tuf no bg.png",
            background: "bg-gradient-to-r from-black-900 via-green-900 to-black",
        },
    ]

    const featuredProducts = [
        {
            id: 1,
            name: "MSI Gaming Laptop",
            price: "LKR 450,000",
            originalPrice: "LKR 500,000",
            image: "/images/msi.jpg",
            rating: 4.8,
            specs: ["Intel i7", "RTX 4060", "16GB RAM", "512GB SSD"],
        },
        {
            id: 2,
            name: "ASUS ROG Strix",
            price: "LKR 380,000",
            originalPrice: "LKR 420,000",
            image: "/images/Asus rog.jpg",
            rating: 4.9,
            specs: ["AMD Ryzen 7", "RTX 4050", "16GB RAM", "1TB SSD"],
        },
        {
            id: 3,
            name: "ASUS TUF Gaming",
            price: "LKR 280,000",
            originalPrice: "LKR 320,000",
            image: "/images/asus tuf2.webp",
            rating: 4.6,
            specs: ["Intel i5", "RTX 3050", "8GB RAM", "512GB SSD"],
        },
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [heroSlides.length])

    return (
        <div className="relative min-h-screen bg-black text-white">
            {/* Auth Notification */}
            <AuthNotification 
                visible={showNotification}
                onClose={handleNotificationClose}
            />
            
            {/* Hero Section */}
            <section className="relative h-screen w-screen overflow-hidden">
                <ParticleBackground />

                {/* Background Image with Overlay */}
                <div className={`absolute inset-0 ${heroSlides[currentSlide].background} transition-all duration-1000`}>
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                    <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-6xl lg:text-8xl font-bold bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent animate-pulse">
                                    {heroSlides[currentSlide].title}
                                </h1>
                                <p className="text-xl lg:text-2xl text-red-400 font-semibold tracking-wider">
                                    {heroSlides[currentSlide].subtitle}
                                </p>
                            </div>

                            <div className="flex space-x-4">
                                <Button
                                    size="lg"
                                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/25"
                                >
                                    SHOP NOW
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 bg-transparent"
                                >
                                    VIEW SPECS
                                </Button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                                <img
                                    src={heroSlides[currentSlide].image || "/placeholder.svg"}
                                    alt="Gaming Laptop"
                                    className="w-full h-auto drop-shadow-2xl"
                                />
                            </div>
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-blue-500/20 blur-3xl transform scale-110"></div>
                        </div>
                    </div>
                </div>

                {/* Slide Navigation */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentSlide ? "bg-red-500 scale-125" : "bg-white/50 hover:bg-white/75"
                            }`}
                        />
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/75 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/75 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: Shield, title: "Warranty", desc: "2 Year Warranty" },
                            { icon: Truck, title: "Free Delivery", desc: "Island Wide" },
                            { icon: Headphones, title: "24/7 Support", desc: "Expert Help" },
                            { icon: Star, title: "Quality", desc: "Premium Products" },
                        ].map((feature, index) => (
                            <div key={index} className="text-center group">
                                <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest Laptops Section */}
            <section className="py-16 bg-gray-50 text-black">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">LATEST LAPTOPS IN SRI LANKA</h2>
                        <div className="inline-block bg-red-600 text-white px-6 py-2 rounded-full font-semibold">
                            PRICE NEGOTIABLE | ගණන් ගැන සාකච්ඡා කර ගන්න
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProducts.map((product) => (
                            <Card
                                key={product.id}
                                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden"
                            >
                                <div className="relative">
                                    <img
                                        src={product.image || ""}
                                        alt={product.name}
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        SALE
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                                    <div className="flex items-center mb-3">
                                        <div className="flex text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : ""}`} />
                                            ))}
                                        </div>
                                        <span className="ml-2 text-gray-600">({product.rating})</span>
                                    </div>
                                    <div className="mb-4">
                                        {product.specs.map((spec, index) => (
                                            <span
                                                key={index}
                                                className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs mr-2 mb-1"
                                            >
                        {spec}
                      </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-2xl font-bold text-red-600">{product.price}</span>
                                            <span className="text-gray-500 line-through ml-2">{product.originalPrice}</span>
                                        </div>
                                        <Button className="bg-red-600 hover:bg-red-700 text-white">Buy Now</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}

        </div>
    )
}
