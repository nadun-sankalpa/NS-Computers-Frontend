"use client"

import { useState, useEffect, useRef } from "react"
import {
    Wrench,
    Shield,
    Cpu,
    Gamepad2,
    Clock,
    Users,
    Star,
    CheckCircle,
    ArrowRight,
    Play,
    Pause,
    Settings,
    Zap,
    HeadphonesIcon,
    Download,
    Wifi,
    HardDrive,
    MemoryStick,
    Laptop,
    Thermometer, type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ParticleBackground from "../home/particle-background"

interface Service {
    id: string
    icon: LucideIcon
    title: string
    description: string
    features: string[]
    price: string
    duration: string
    category: string
    color: string
    image: string
    popular?: boolean
}


interface AnimatedIconProps {
    icon: LucideIcon
    isActive: boolean
    color: string
}

function AnimatedIcon({ icon: Icon, isActive, color }: AnimatedIconProps) {
    return (
        <div
            className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                isActive ? `bg-gradient-to-br ${color} scale-110 shadow-lg shadow-red-500/30` : "bg-gray-800"
            }`}
        >
            <Icon className={`w-8 h-8 transition-all duration-300 ${isActive ? "text-white" : "text-gray-400"}`} />
            {isActive && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-white/20 animate-pulse"></div>
            )}
        </div>
    )
}

export default function ServicesPage() {
    const [activeCategory, setActiveCategory] = useState("all")
    const [activeService, setActiveService] = useState<string | null>(null)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
    const observerRef = useRef<IntersectionObserver | null>(null)

    const categories = [
        { id: "all", name: "All Services", icon: Settings },
        { id: "repair", name: "Repair & Maintenance", icon: Wrench },
        { id: "custom", name: "Custom Builds", icon: Cpu },
        { id: "support", name: "Technical Support", icon: HeadphonesIcon },
        { id: "upgrade", name: "Upgrades", icon: Zap },
        { id: "warranty", name: "Warranty", icon: Shield },
    ]

    const services: Service[] = [
        {
            id: "laptop-repair",
            icon: Laptop,
            title: "Laptop Repair & Diagnostics",
            description:
                "Complete laptop repair services including hardware diagnostics, component replacement, and performance optimization.",
            features: [
                "Free Diagnostics",
                "Component Replacement",
                "Performance Tuning",
                "Data Recovery",
                "Screen Replacement",
            ],
            price: "From LKR 2,500",
            duration: "1-3 Days",
            category: "repair",
            color: "from-red-500 to-red-600",
            image: "/images/laptop repair.webp",
            popular: true,
        },
        {
            id: "custom-gaming-pc",
            icon: Gamepad2,
            title: "Custom Gaming PC Build",
            description: "Professional custom gaming PC builds tailored to your performance needs and budget requirements.",
            features: [
                "Performance Consultation",
                "Component Selection",
                "Professional Assembly",
                "Stress Testing",
                "1 Year Support",
            ],
            price: "From LKR 15,000",
            duration: "3-5 Days",
            category: "custom",
            color: "from-blue-500 to-blue-600",
            image: "/images/gaming pc.jpg",
        },
        {
            id: "technical-support",
            icon: HeadphonesIcon,
            title: "24/7 Technical Support",
            description:
                "Round-the-clock technical support for all your computing needs with expert guidance and remote assistance.",
            features: ["24/7 Availability", "Remote Assistance", "Phone Support", "Email Support", "Live Chat"],
            price: "LKR 1,500/month",
            duration: "Ongoing",
            category: "support",
            color: "from-green-500 to-green-600",
            image: "/images/TechSupport.jpeg",
        },
        {
            id: "hardware-upgrade",
            icon: MemoryStick,
            title: "Hardware Upgrades",
            description:
                "Upgrade your existing system with latest components for improved performance and extended lifespan.",
            features: ["RAM Upgrades", "SSD Installation", "Graphics Card Upgrade", "CPU Upgrade", "Cooling Solutions"],
            price: "From LKR 1,000",
            duration: "Same Day",
            category: "upgrade",
            color: "from-purple-500 to-purple-600",
            image: "/images/hardware.webp",
        },
        {
            id: "data-recovery",
            icon: HardDrive,
            title: "Data Recovery Services",
            description: "Professional data recovery from damaged hard drives, SSDs, and other storage devices.",
            features: ["HDD Recovery", "SSD Recovery", "RAID Recovery", "USB Recovery", "Emergency Service"],
            price: "From LKR 5,000",
            duration: "2-7 Days",
            category: "repair",
            color: "from-orange-500 to-orange-600",
            image: "/images/data recovery.jpg",
        },
        {
            id: "warranty-service",
            icon: Shield,
            title: "Extended Warranty",
            description: "Comprehensive warranty coverage for your devices with priority support and replacement services.",
            features: ["Extended Coverage", "Priority Support", "Free Repairs", "Replacement Service", "On-site Service"],
            price: "From LKR 8,000/year",
            duration: "1-3 Years",
            category: "warranty",
            color: "from-teal-500 to-teal-600",
            image: "/images/warranty.jpg",
        },
        {
            id: "network-setup",
            icon: Wifi,
            title: "Network Setup & Configuration",
            description: "Professional network setup, configuration, and optimization for homes and offices.",
            features: [
                "Router Configuration",
                "WiFi Optimization",
                "Network Security",
                "Cable Management",
                "Performance Testing",
            ],
            price: "From LKR 3,500",
            duration: "1-2 Days",
            category: "support",
            color: "from-cyan-500 to-cyan-600",
            image: "/images/network.jpg",
        },
        {
            id: "software-installation",
            icon: Download,
            title: "Software Installation & Setup",
            description: "Professional software installation, configuration, and optimization for maximum performance.",
            features: [
                "OS Installation",
                "Driver Updates",
                "Software Setup",
                "Security Configuration",
                "Performance Optimization",
            ],
            price: "From LKR 1,500",
            duration: "Same Day",
            category: "support",
            color: "from-indigo-500 to-indigo-600",
            image: "/images/software install.webp",
        },
        {
            id: "thermal-management",
            icon: Thermometer,
            title: "Thermal Management",
            description: "Advanced cooling solutions and thermal management for optimal system performance and longevity.",
            features: [
                "Thermal Analysis",
                "Cooling Solutions",
                "Thermal Paste Application",
                "Fan Replacement",
                "Temperature Monitoring",
            ],
            price: "From LKR 2,000",
            duration: "1 Day",
            category: "upgrade",
            color: "from-pink-500 to-pink-600",
            image: "/ima",
        },
    ]

    const stats = [
        { icon: Users, label: "Happy Customers", value: "15,000+", color: "text-blue-500" },
        { icon: Wrench, label: "Repairs Completed", value: "25,000+", color: "text-green-500" },
        { icon: Clock, label: "Average Response", value: "< 2 Hours", color: "text-yellow-500" },
        { icon: Star, label: "Customer Rating", value: "4.9/5", color: "text-red-500" },
    ]

    const processSteps = [
        {
            step: 1,
            title: "Contact Us",
            description: "Reach out via phone, email, or visit our service center",
            icon: HeadphonesIcon,
        },
        {
            step: 2,
            title: "Diagnosis",
            description: "Free comprehensive diagnosis of your device or requirements",
            icon: Settings,
        },
        {
            step: 3,
            title: "Quote",
            description: "Transparent pricing with detailed breakdown of services",
            icon: CheckCircle,
        },
        {
            step: 4,
            title: "Service",
            description: "Professional service delivery with quality assurance",
            icon: Wrench,
        },
    ]

    const filteredServices =
        activeCategory === "all" ? services : services.filter((service) => service.category === activeCategory)

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
                        setVisibleCards((prev) => new Set([...prev, index]))
                    }
                })
            },
            { threshold: 0.1 },
        )

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
            }
        }
    }, [])

    useEffect(() => {
        const cards = document.querySelectorAll("[data-index]")
        cards.forEach((card) => {
            if (observerRef.current) {
                observerRef.current.observe(card)
            }
        })
    }, [filteredServices])

    return (
        <div className="min-h-screen w-screen bg-black text-white pt-32">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <ParticleBackground />

                <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-blue-900/20"></div>

                <div className="relative z-10 container mx-auto px-4">
                    <div className="text-center space-y-8 max-w-4xl mx-auto">
                        <div className="space-y-4">
                            <h1 className="text-6xl lg:text-8xl font-bold bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent animate-pulse">
                                OUR SERVICES
                            </h1>
                            <p className="text-xl lg:text-2xl text-red-400 font-semibold tracking-wider">
                                COMPREHENSIVE TECH SOLUTIONS
                            </p>
                        </div>

                        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                            From custom gaming PC builds to professional repair services, we offer comprehensive technology solutions
                            to keep you at the cutting edge of performance and reliability.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                size="lg"
                                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/25"
                            >
                                Get Quote
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 bg-transparent"
                                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                            >
                                {isVideoPlaying ? <Pause className="mr-2 w-5 h-5" /> : <Play className="mr-2 w-5 h-5" />}
                                {isVideoPlaying ? "Pause" : "Watch"} Demo
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-900/50 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center group transform hover:scale-105 transition-all duration-300"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div className="bg-gradient-to-br from-gray-800 to-gray-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-red-500/30 transition-all duration-300">
                                    <stat.icon className={`w-10 h-10 ${stat.color}`} />
                                </div>
                                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                                <p className="text-gray-300 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Service Categories */}
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent"></div>

                <div className="relative z-10 container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            Service <span className="text-red-500">Categories</span>
                        </h2>
                        <p className="text-lg text-gray-300">Choose from our comprehensive range of technology services</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {categories.map((category, index) => (
                            <Button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                variant={activeCategory === category.id ? "default" : "outline"}
                                className={`flex items-center space-x-2 px-6 py-3 transition-all duration-300 transform hover:scale-105 ${
                                    activeCategory === category.id
                                        ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/25"
                                        : "border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400 bg-transparent"
                                }`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <AnimatedIcon
                                    icon={category.icon}
                                    isActive={activeCategory === category.id}
                                    color="from-red-500 to-red-600"
                                />
                                <span className="font-medium">{category.name}</span>
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredServices.map((service, index) => (
                            <Card
                                key={service.id}
                                data-index={index}
                                className={`group bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-all duration-700 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20 cursor-pointer overflow-hidden ${
                                    visibleCards.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                }`}
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                    transitionDelay: `${index * 0.1}s`,
                                }}
                                onMouseEnter={() => setActiveService(service.id)}
                                onMouseLeave={() => setActiveService(null)}
                            >
                                {service.popular && (
                                    <div className="absolute top-4 right-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                                        Popular
                                    </div>
                                )}

                                <div className="relative overflow-hidden">
                                    <img
                                        src={service.image || "/placeholder.svg"}
                                        alt={service.title}
                                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    <div
                                        className={`absolute top-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center transform transition-all duration-300 ${
                                            activeService === service.id ? "scale-110 shadow-lg" : ""
                                        }`}
                                    >
                                        <service.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>

                                <CardContent className="p-6 space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-sm font-semibold text-red-400">Features:</h4>
                                        <ul className="space-y-1">
                                            {service.features.slice(0, 3).map((feature, idx) => (
                                                <li key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                            {service.features.length > 3 && (
                                                <li className="text-sm text-gray-400">+{service.features.length - 3} more features</li>
                                            )}
                                        </ul>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                                        <div>
                                            <div className="text-lg font-bold text-red-500">{service.price}</div>
                                            <div className="text-sm text-gray-400">{service.duration}</div>
                                        </div>
                                        <Button
                                            size="sm"
                                            className="bg-red-600 hover:bg-red-700 text-white transform hover:scale-105 transition-all duration-300"
                                        >
                                            Get Quote
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

                <div className="relative z-10 container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            Our <span className="text-red-500">Process</span>
                        </h2>
                        <p className="text-lg text-gray-300">Simple steps to get your tech issues resolved</p>
                    </div>

                    <div className="relative">
                        {/* Process Line */}
                        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500 transform -translate-y-1/2"></div>

                        <div className="grid lg:grid-cols-4 gap-8">
                            {processSteps.map((step, index) => (
                                <div key={index} className="text-center group">
                                    <div className="relative mb-6">
                                        <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-500/30">
                                            <step.icon className="w-10 h-10 text-white" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            {step.step}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-red-900/20 via-black to-blue-900/20">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white">
                            Ready to Get <span className="text-red-500">Started</span>?
                        </h2>
                        <p className="text-lg text-gray-300">
                            Contact our expert team today for a free consultation and quote for your technology needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/25"
                            >
                                Contact Us Now
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 bg-transparent"
                            >
                                View Pricing
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
