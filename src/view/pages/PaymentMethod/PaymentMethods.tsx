"use client"

import { useState, useEffect, useRef } from "react"
import {
    CreditCard,
    Smartphone,
    Building2,
    Wallet,
    Shield,
    Clock,
    CheckCircle,
    ArrowRight,
    Zap,
    Globe,
    Lock,
    Users,
    TrendingUp,
    AlertCircle,
    Info,
    DollarSign,
    Percent,
    Calendar,
    Receipt,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ParticleBackground from "../home/particle-background"

interface PaymentMethod {
    id: string
    name: string
    icon: any
    description: string
    features: string[]
    processingTime: string
    fees: string
    category: string
    color: string
    gradient: string
    popular?: boolean
    secure: boolean
    availability: string
    logo?: string
}

interface PaymentStep {
    step: number
    title: string
    description: string
    icon: any
    color: string
}

export default function PaymentMethodsPage() {
    const [activeCategory, setActiveCategory] = useState("all")
    const [activeMethod, setActiveMethod] = useState<string | null>(null)
    const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)

    const categories = [
        { id: "all", name: "All Methods", icon: Wallet },
        { id: "cards", name: "Credit/Debit Cards", icon: CreditCard },
        { id: "digital", name: "Digital Wallets", icon: Smartphone },
        { id: "bank", name: "Bank Transfers", icon: Building2 },
        { id: "installment", name: "Installment Plans", icon: Calendar },
    ]

    const paymentMethods: PaymentMethod[] = [
        {
            id: "visa-mastercard",
            name: "Visa & Mastercard",
            icon: CreditCard,
            description: "Secure payments with international credit and debit cards",
            features: ["Instant Processing", "3D Secure", "Fraud Protection", "International Cards", "EMV Chip Support"],
            processingTime: "Instant",
            fees: "2.9% + LKR 30",
            category: "cards",
            color: "text-blue-500",
            gradient: "from-blue-500 to-blue-600",
            popular: true,
            secure: true,
            availability: "24/7",
            logo: "/placeholder.svg?height=40&width=60&text=VISA",
        },
        {
            id: "american-express",
            name: "American Express",
            icon: CreditCard,
            description: "Premium card payments with enhanced security features",
            features: ["Premium Support", "Enhanced Security", "Reward Points", "Global Acceptance", "Purchase Protection"],
            processingTime: "Instant",
            fees: "3.4% + LKR 30",
            category: "cards",
            color: "text-green-500",
            gradient: "from-green-500 to-green-600",
            secure: true,
            availability: "24/7",
            logo: "/placeholder.svg?height=40&width=60&text=AMEX",
        },
        {
            id: "paypal",
            name: "PayPal",
            icon: Smartphone,
            description: "Secure digital wallet payments with buyer protection",
            features: ["Buyer Protection", "One-Click Payments", "Mobile App", "International", "Dispute Resolution"],
            processingTime: "Instant",
            fees: "3.9% + LKR 35",
            category: "digital",
            color: "text-blue-600",
            gradient: "from-blue-600 to-purple-600",
            popular: true,
            secure: true,
            availability: "24/7",
            logo: "/placeholder.svg?height=40&width=60&text=PayPal",
        },
        {
            id: "google-pay",
            name: "Google Pay",
            icon: Smartphone,
            description: "Fast and secure payments using your Google account",
            features: ["Biometric Security", "Quick Setup", "Contactless", "Reward Points", "Transaction History"],
            processingTime: "Instant",
            fees: "Free",
            category: "digital",
            color: "text-red-500",
            gradient: "from-red-500 to-orange-500",
            secure: true,
            availability: "24/7",
            logo: "/placeholder.svg?height=40&width=60&text=GPay",
        },
        {
            id: "apple-pay",
            name: "Apple Pay",
            icon: Smartphone,
            description: "Seamless payments using Touch ID or Face ID",
            features: ["Touch/Face ID", "Privacy Focused", "No Card Numbers", "Secure Element", "Easy Setup"],
            processingTime: "Instant",
            fees: "Free",
            category: "digital",
            color: "text-gray-400",
            gradient: "from-gray-500 to-gray-600",
            secure: true,
            availability: "24/7",
            logo: "/placeholder.svg?height=40&width=60&text=Apple",
        },
        {
            id: "bank-transfer",
            name: "Bank Transfer",
            icon: Building2,
            description: "Direct bank transfers for large purchases",
            features: ["Low Fees", "High Limits", "Secure", "All Banks", "Bulk Payments"],
            processingTime: "1-3 Business Days",
            fees: "LKR 50 - 200",
            category: "bank",
            color: "text-purple-500",
            gradient: "from-purple-500 to-purple-600",
            secure: true,
            availability: "Business Hours",
            logo: "/placeholder.svg?height=40&width=60&text=Bank",
        },
        {
            id: "online-banking",
            name: "Online Banking",
            icon: Globe,
            description: "Secure online banking payments from major Sri Lankan banks",
            features: ["All Major Banks", "Real-time", "Secure Login", "Transaction Alerts", "Mobile Banking"],
            processingTime: "Instant",
            fees: "LKR 25 - 100",
            category: "bank",
            color: "text-teal-500",
            gradient: "from-teal-500 to-teal-600",
            secure: true,
            availability: "24/7",
            logo: "/placeholder.svg?height=40&width=60&text=eBank",
        },
        {
            id: "installment-0",
            name: "0% Installments",
            icon: Percent,
            description: "Interest-free installment plans for qualified purchases",
            features: ["0% Interest", "3-24 Months", "Easy Approval", "No Hidden Fees", "Early Settlement"],
            processingTime: "24-48 Hours",
            fees: "Processing Fee Only",
            category: "installment",
            color: "text-green-600",
            gradient: "from-green-600 to-emerald-600",
            popular: true,
            secure: true,
            availability: "Business Hours",
            logo: "/placeholder.svg?height=40&width=60&text=0%",
        },
        {
            id: "koko",
            name: "Koko",
            icon: Smartphone,
            description: "Local digital wallet for convenient payments",
            features: ["Local Support", "QR Payments", "Cashback", "Bill Payments", "Mobile Top-up"],
            processingTime: "Instant",
            fees: "1.5% + LKR 20",
            category: "digital",
            color: "text-orange-500",
            gradient: "from-orange-500 to-red-500",
            secure: true,
            availability: "24/7",
            logo: "/placeholder.svg?height=40&width=60&text=Koko",
        },
        {
            id: "frimi",
            name: "Frimi",
            icon: Calendar,
            description: "Buy now, pay later with flexible payment options",
            features: ["Pay Later", "Flexible Terms", "Quick Approval", "No Interest", "Credit Building"],
            processingTime: "Instant Approval",
            fees: "Service Fee",
            category: "installment",
            color: "text-pink-500",
            gradient: "from-pink-500 to-rose-500",
            secure: true,
            availability: "24/7",
            logo: "/placeholder.svg?height=40&width=60&text=Frimi",
        },
        {
            id: "crypto",
            name: "Cryptocurrency",
            icon: Zap,
            description: "Accept Bitcoin and other major cryptocurrencies",
            features: ["Bitcoin", "Ethereum", "USDT", "Low Fees", "Global Access"],
            processingTime: "10-60 Minutes",
            fees: "1% + Network Fee",
            category: "digital",
            color: "text-yellow-500",
            gradient: "from-yellow-500 to-orange-500",
            secure: true,
            availability: "24/7",
            logo: "/placeholder.svg?height=40&width=60&text=BTC",
        },
        {
            id: "cash-on-delivery",
            name: "Cash on Delivery",
            icon: Receipt,
            description: "Pay with cash when your order is delivered",
            features: ["No Online Payment", "Inspect Before Pay", "Colombo Area", "Same Day Delivery", "Change Available"],
            processingTime: "On Delivery",
            fees: "LKR 300 Service Fee",
            category: "cash",
            color: "text-gray-500",
            gradient: "from-gray-500 to-gray-600",
            secure: true,
            availability: "Delivery Hours",
            logo: "/placeholder.svg?height=40&width=60&text=COD",
        },
    ]

    const paymentSteps: PaymentStep[] = [
        {
            step: 1,
            title: "Select Products",
            description: "Choose your gaming laptop and add to cart",
            icon: Smartphone,
            color: "from-blue-500 to-blue-600",
        },
        {
            step: 2,
            title: "Choose Payment",
            description: "Select your preferred payment method",
            icon: CreditCard,
            color: "from-green-500 to-green-600",
        },
        {
            step: 3,
            title: "Secure Checkout",
            description: "Complete payment with bank-level security",
            icon: Shield,
            color: "from-purple-500 to-purple-600",
        },
        {
            step: 4,
            title: "Order Confirmation",
            description: "Receive instant confirmation and tracking",
            icon: CheckCircle,
            color: "from-red-500 to-red-600",
        },
    ]

    const securityFeatures = [
        {
            icon: Shield,
            title: "SSL Encryption",
            description: "256-bit SSL encryption protects all transactions",
        },
        {
            icon: Lock,
            title: "PCI Compliance",
            description: "PCI DSS Level 1 certified payment processing",
        },
        {
            icon: Users,
            title: "Fraud Detection",
            description: "Advanced AI-powered fraud prevention system",
        },
        {
            icon: CheckCircle,
            title: "3D Secure",
            description: "Additional authentication layer for card payments",
        },
    ]

    const stats = [
        { icon: Users, label: "Transactions Processed", value: "500K+", color: "text-blue-500" },
        { icon: Shield, label: "Security Rating", value: "99.9%", color: "text-green-500" },
        { icon: Clock, label: "Average Processing", value: "< 3 Sec", color: "text-yellow-500" },
        { icon: TrendingUp, label: "Success Rate", value: "99.8%", color: "text-red-500" },
    ]

    const filteredMethods =
        activeCategory === "all" ? paymentMethods : paymentMethods.filter((method) => method.category === activeCategory)

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
    }, [filteredMethods])

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
                                PAYMENT METHODS
                            </h1>
                            <p className="text-xl lg:text-2xl text-red-400 font-semibold tracking-wider">
                                SECURE & CONVENIENT PAYMENT OPTIONS
                            </p>
                        </div>

                        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                            Choose from our wide range of secure payment methods. From traditional cards to modern digital wallets, we
                            support all major payment options with bank-level security and instant processing.
                        </p>

                        <div className="flex items-center justify-center space-x-8">
                            <div className="flex items-center space-x-2 text-green-400">
                                <Shield className="w-6 h-6" />
                                <span className="font-semibold">Bank-Level Security</span>
                            </div>
                            <div className="flex items-center space-x-2 text-blue-400">
                                <Zap className="w-6 h-6" />
                                <span className="font-semibold">Instant Processing</span>
                            </div>
                            <div className="flex items-center space-x-2 text-purple-400">
                                <Globe className="w-6 h-6" />
                                <span className="font-semibold">Global Acceptance</span>
                            </div>
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

            {/* Payment Categories */}
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent"></div>

                <div className="relative z-10 container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            Payment <span className="text-red-500">Categories</span>
                        </h2>
                        <p className="text-lg text-gray-300">Choose the payment method that works best for you</p>
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
                                <category.icon className="w-5 h-5" />
                                <span className="font-medium">{category.name}</span>
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Payment Methods Grid */}
            <section className="py-20 bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredMethods.map((method, index) => (
                            <Card
                                key={method.id}
                                data-index={index}
                                className={`group bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-all duration-700 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20 cursor-pointer overflow-hidden ${
                                    visibleCards.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                } ${selectedMethod === method.id ? "ring-2 ring-red-500 border-red-500" : ""}`}
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                    transitionDelay: `${index * 0.1}s`,
                                }}
                                onMouseEnter={() => setActiveMethod(method.id)}
                                onMouseLeave={() => setActiveMethod(null)}
                                onClick={() => setSelectedMethod(selectedMethod === method.id ? null : method.id)}
                            >
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className={`w-12 h-12 rounded-full bg-gradient-to-br ${method.gradient} flex items-center justify-center transform transition-all duration-300 ${
                                                    activeMethod === method.id ? "scale-110 shadow-lg" : ""
                                                }`}
                                            >
                                                <method.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                                                    {method.name}
                                                </h3>
                                                {method.logo && (
                                                    <img
                                                        src={method.logo || "/placeholder.svg"}
                                                        alt={method.name}
                                                        className="h-6 w-auto mt-1 opacity-70"
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            {method.popular && (
                                                <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
                                                    Popular
                                                </div>
                                            )}
                                            {method.secure && <Shield className="w-5 h-5 text-green-500" />}
                                        </div>
                                    </div>

                                    <p className="text-gray-300 text-sm leading-relaxed">{method.description}</p>

                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <div className="text-gray-400">Processing Time</div>
                                            <div className="text-white font-semibold">{method.processingTime}</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-400">Fees</div>
                                            <div className="text-white font-semibold">{method.fees}</div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-sm font-semibold text-red-400">Features:</h4>
                                        <div className="grid grid-cols-1 gap-1">
                                            {method.features.slice(0, 3).map((feature, idx) => (
                                                <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                                                    <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                            {method.features.length > 3 && (
                                                <div className="text-sm text-gray-400">+{method.features.length - 3} more features</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                                            <Clock className="w-4 h-4" />
                                            <span>{method.availability}</span>
                                        </div>
                                        <Button
                                            size="sm"
                                            className={`transform hover:scale-105 transition-all duration-300 ${
                                                selectedMethod === method.id ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                                            } text-white`}
                                        >
                                            {selectedMethod === method.id ? "Selected" : "Select"}
                                            <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Payment Process */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

                <div className="relative z-10 container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            Payment <span className="text-red-500">Process</span>
                        </h2>
                        <p className="text-lg text-gray-300">Simple and secure checkout in 4 easy steps</p>
                    </div>

                    <div className="relative">
                        {/* Process Line */}
                        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500 transform -translate-y-1/2"></div>

                        <div className="grid lg:grid-cols-4 gap-8">
                            {paymentSteps.map((step, index) => (
                                <div key={index} className="text-center group">
                                    <div className="relative mb-6">
                                        <div
                                            className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-500/30`}
                                        >
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

            {/* Security Features */}
            <section className="py-20 bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            Security <span className="text-red-500">Features</span>
                        </h2>
                        <p className="text-lg text-gray-300">Your payments are protected by industry-leading security measures</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {securityFeatures.map((feature, index) => (
                            <Card
                                key={index}
                                className="group bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-all duration-500 transform hover:-translate-y-2"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <CardContent className="p-6 text-center space-y-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Important Information */}
            <section className="py-16 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center space-x-3 mb-6">
                            <Info className="w-6 h-6 text-blue-400" />
                            <h3 className="text-2xl font-bold text-white">Important Payment Information</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="bg-gray-800/50 border-gray-700">
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                                        <h4 className="text-lg font-semibold text-white">Processing Times</h4>
                                    </div>
                                    <ul className="space-y-2 text-gray-300 text-sm">
                                        <li>• Card payments: Instant processing</li>
                                        <li>• Bank transfers: 1-3 business days</li>
                                        <li>• Digital wallets: Instant processing</li>
                                        <li>• Installment approvals: 24-48 hours</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-gray-800/50 border-gray-700">
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <DollarSign className="w-5 h-5 text-green-500" />
                                        <h4 className="text-lg font-semibold text-white">Fee Structure</h4>
                                    </div>
                                    <ul className="space-y-2 text-gray-300 text-sm">
                                        <li>• No hidden fees or charges</li>
                                        <li>• Transparent pricing displayed</li>
                                        <li>• Some payment methods are free</li>
                                        <li>• Installment processing fees apply</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-red-900/20 via-black to-blue-900/20">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white">
                            Ready to <span className="text-red-500">Purchase</span>?
                        </h2>
                        <p className="text-lg text-gray-300">
                            Choose your preferred payment method and complete your order with confidence. All payments are secured
                            with bank-level encryption.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/25"
                            >
                                Start Shopping
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 bg-transparent"
                            >
                                Contact Support
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
