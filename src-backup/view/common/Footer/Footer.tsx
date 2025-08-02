"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Mail,
    Phone,
    MapPin,
    Clock,
    ArrowRight,
    Cpu,
    Monitor,
    Gamepad2,
    Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FloatingIcon {
    id: number
    x: number
    y: number
    vx: number
    vy: number
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    size: number
    opacity: number
}

export default function AnimatedFooter() {
    const [email, setEmail] = useState("")
    const [isSubscribed, setIsSubscribed] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const iconsRef = useRef<FloatingIcon[]>([])
    const animationRef = useRef<number | null>(null)

    const footerLinks = {
        products: [
            "Gaming Laptops",
            "Workstation Laptops",
            "Ultrabooks",
            "Desktop PCs",
            "Gaming Accessories",
            "Components",
        ],
        support: ["Technical Support", "Warranty Service", "Installation Guide", "Driver Downloads", "FAQ", "Contact Us"],
        company: ["About Us", "Our Story", "Careers", "Press", "Partners", "Reviews"],
    }

    const socialLinks = [
        { icon: Facebook, href: "#", color: "hover:text-blue-500", name: "Facebook" },
        { icon: Instagram, href: "#", color: "hover:text-pink-500", name: "Instagram" },
        { icon: Twitter, href: "#", color: "hover:text-blue-400", name: "Twitter" },
        { icon: Youtube, href: "#", color: "hover:text-red-500", name: "YouTube" },
    ]

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }

        const createFloatingIcons = () => {
            const icons = [Cpu, Monitor, Gamepad2, Zap]
            const floatingIcons: FloatingIcon[] = []

            for (let i = 0; i < 8; i++) {
                floatingIcons.push({
                    id: i,
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    icon: icons[Math.floor(Math.random() * icons.length)],
                    size: Math.random() * 20 + 15,
                    opacity: Math.random() * 0.3 + 0.1,
                })
            }
            iconsRef.current = floatingIcons
        }

        const drawFloatingIcons = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            iconsRef.current.forEach((iconData) => {
                // Update position
                iconData.x += iconData.vx
                iconData.y += iconData.vy

                // Bounce off edges
                if (iconData.x < 0 || iconData.x > canvas.width) iconData.vx *= -1
                if (iconData.y < 0 || iconData.y > canvas.height) iconData.vy *= -1

                // Draw icon background glow
                const gradient = ctx.createRadialGradient(iconData.x, iconData.y, 0, iconData.x, iconData.y, iconData.size)
                gradient.addColorStop(0, `rgba(239, 68, 68, ${iconData.opacity})`)
                gradient.addColorStop(1, "rgba(239, 68, 68, 0)")

                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(iconData.x, iconData.y, iconData.size, 0, Math.PI * 2)
                ctx.fill()
            })
        }

        const animate = () => {
            drawFloatingIcons()
            animationRef.current = requestAnimationFrame(animate)
        }

        resizeCanvas()
        createFloatingIcons()
        animate()

        window.addEventListener("resize", () => {
            resizeCanvas()
            createFloatingIcons()
        })

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            window.removeEventListener("resize", resizeCanvas)
        }
    }, [])

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            setIsSubscribed(true)
            setEmail("")
            setTimeout(() => setIsSubscribed(false), 3000)
        }
    }

    return (
        <footer className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden">
            {/* Animated Background */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" style={{ zIndex: 1 }} />

            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-10" style={{ zIndex: 0 }}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-pulse"></div>
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
            `,
                        backgroundSize: "50px 50px",
                        animation: "grid-move 20s linear infinite",
                    }}
                ></div>
            </div>

            <div className="relative z-10">
                {/* Main Footer Content */}
                <div className="container mx-auto px-4 py-16">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
                        {/* Company Info */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-3xl font-bold text-red-500 animate-pulse">
                                    nS-Computers<sup className="text-sm">®</sup>
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    Your ultimate destination for high-performance gaming laptops, workstations, and custom PC builds.
                                    Empowering gamers and professionals with cutting-edge technology.
                                </p>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 group">
                                    <div className="bg-red-600 p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <span className="group-hover:text-red-400 transition-colors">+94 714 576 576</span>
                                </div>
                                <div className="flex items-center space-x-3 group">
                                    <div className="bg-red-600 p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span className="group-hover:text-red-400 transition-colors">info@ns-computers.lk</span>
                                </div>
                                <div className="flex items-center space-x-3 group">
                                    <div className="bg-red-600 p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <span className="group-hover:text-red-400 transition-colors">Colombo, Sri Lanka</span>
                                </div>
                                <div className="flex items-center space-x-3 group">
                                    <div className="bg-red-600 p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <span className="group-hover:text-red-400 transition-colors">Mon-Sat: 9AM-8PM</span>
                                </div>
                            </div>
                        </div>

                        {/* Products */}
                        <div className="space-y-6">
                            <h4 className="text-xl font-bold text-white border-b-2 border-red-500 pb-2 inline-block">Products</h4>
                            <ul className="space-y-3">
                                {footerLinks.products.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href="#"
                                            className="text-gray-300 hover:text-red-400 transition-all duration-300 flex items-center group"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                            <span className="group-hover:translate-x-2 transition-transform duration-300">{link}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support */}
                        <div className="space-y-6">
                            <h4 className="text-xl font-bold text-white border-b-2 border-red-500 pb-2 inline-block">Support</h4>
                            <ul className="space-y-3">
                                {footerLinks.support.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href="#"
                                            className="text-gray-300 hover:text-red-400 transition-all duration-300 flex items-center group"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                            <span className="group-hover:translate-x-2 transition-transform duration-300">{link}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div className="space-y-6">
                            <h4 className="text-xl font-bold text-white border-b-2 border-red-500 pb-2 inline-block">Stay Updated</h4>
                            <p className="text-gray-300">Subscribe to get the latest deals, product launches, and tech news.</p>

                            <form onSubmit={handleSubscribe} className="space-y-4">
                                <div className="relative">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 pr-12 focus:border-red-500 transition-colors"
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        size="sm"
                                        className="absolute right-1 top-1 bottom-1 bg-red-600 hover:bg-red-700 text-white px-4 transform hover:scale-105 transition-all duration-300"
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </div>
                                {isSubscribed && <p className="text-green-400 text-sm animate-bounce">✓ Successfully subscribed!</p>}
                            </form>

                            {/* Social Media */}
                            <div className="space-y-4">
                                <h5 className="text-lg font-semibold">Follow Us</h5>
                                <div className="flex space-x-4">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.href}
                                            className={`bg-gray-800 p-3 rounded-full text-gray-300 ${social.color} transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl`}
                                            aria-label={social.name}
                                            style={{ animationDelay: `${index * 0.2}s` }}
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 bg-black/50 backdrop-blur-sm">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <div className="text-gray-400 text-sm">
                                © 2024 nS-Computers. All rights reserved. | Designed with ❤️ for gamers
                            </div>
                            <div className="flex space-x-6 text-sm">
                                <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                                    Privacy Policy
                                </a>
                                <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                                    Terms of Service
                                </a>
                                <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                                    Cookie Policy
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Action Button */}
                <div className="fixed bottom-8 right-8 z-50">
                    <Button
                        className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 animate-bounce"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        <ArrowRight className="w-6 h-6 transform -rotate-90" />
                    </Button>
                </div>
            </div>

            <style jsx>{`
                @keyframes grid-move {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(50px, 50px); }
                }
            `}</style>
        </footer>
    )
}
