"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    MessageSquare,
    Headphones,
    Shield,
    Zap,
    Users,
    CheckCircle,
    AlertCircle,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    ArrowRight,
    Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import ParticleBackground from "../home/particle-background"

interface FormData {
    name: string
    email: string
    phone: string
    subject: string
    message: string
    category: string
}

interface FormErrors {
    [key: string]: string
}

export default function ContactPage() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        category: "general",
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const contactInfo = [
        {
            icon: Phone,
            title: "Call Us",
            primary: "+94 714 576 576",
            secondary: "+94 112 345 678",
            description: "Mon-Sat: 9AM-8PM",
            color: "from-green-500 to-emerald-500",
            action: "tel:+94714576576",
        },
        {
            icon: Mail,
            title: "Email Us",
            primary: "info@ns-computers.lk",
            secondary: "support@ns-computers.lk",
            description: "24/7 Email Support",
            color: "from-blue-500 to-cyan-500",
            action: "mailto:info@ns-computers.lk",
        },
        {
            icon: MapPin,
            title: "Visit Us",
            primary: "123 Galle Road",
            secondary: "Colombo 03, Sri Lanka",
            description: "Open 7 Days a Week",
            color: "from-purple-500 to-pink-500",
            action: "#map",
        },
        {
            icon: MessageSquare,
            title: "Live Chat",
            primary: "Instant Support",
            secondary: "Available Now",
            description: "Average response: 2 min",
            color: "from-red-500 to-orange-500",
            action: "#chat",
        },
    ]

    const supportOptions = [
        {
            icon: Headphones,
            title: "Technical Support",
            description: "Hardware troubleshooting and software assistance",
            availability: "24/7",
        },
        {
            icon: Shield,
            title: "Warranty Claims",
            description: "Process warranty claims and repairs",
            availability: "Mon-Fri",
        },
        {
            icon: Zap,
            title: "Sales Inquiry",
            description: "Product information and pricing",
            availability: "9AM-8PM",
        },
        {
            icon: Users,
            title: "Custom Builds",
            description: "Personalized PC building consultation",
            availability: "By Appointment",
        },
    ]

    const testimonials = [
        {
            name: "Ravindu Perera",
            role: "Professional Gamer",
            message: "Excellent service and top-quality gaming laptops. The team really knows their stuff!",
            rating: 5,
            image: "/placeholder.svg?height=60&width=60",
        },
        {
            name: "Sachini Fernando",
            role: "Graphic Designer",
            message: "Found the perfect workstation laptop here. Great prices and amazing customer support.",
            rating: 5,
            image: "/placeholder.svg?height=60&width=60",
        },
        {
            name: "Kasun Silva",
            role: "Software Developer",
            message: "Fast delivery and professional setup service. Highly recommend nS-Computers!",
            rating: 5,
            image: "/placeholder.svg?height=60&width=60",
        },
    ]

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!formData.name.trim()) newErrors.name = "Name is required"
        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
        if (!formData.subject.trim()) newErrors.subject = "Subject is required"
        if (!formData.message.trim()) newErrors.message = "Message is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))

        setIsSubmitting(false)
        setIsSubmitted(true)
        setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
            category: "general",
        })

        setTimeout(() => setIsSubmitted(false), 5000)
    }

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

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
                                CONTACT US
                            </h1>
                            <p className="text-xl lg:text-2xl text-red-400 font-semibold tracking-wider">
                                GET IN TOUCH WITH THE EXPERTS
                            </p>
                        </div>

                        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                            Have questions about our gaming laptops? Need technical support? Want to discuss a custom build? Our team
                            of experts is here to help you find the perfect solution for your needs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-16 bg-gray-900/50 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <Card
                                key={index}
                                className="group bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20 cursor-pointer"
                                onClick={() => {
                                    if (info.action.startsWith("#")) {
                                        document.querySelector(info.action)?.scrollIntoView({ behavior: "smooth" })
                                    } else {
                                        window.open(info.action, "_blank")
                                    }
                                }}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <CardContent className="p-6 text-center space-y-4">
                                    <div
                                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${info.color} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <info.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors mb-2">
                                            {info.title}
                                        </h3>
                                        <p className="text-red-400 font-semibold">{info.primary}</p>
                                        <p className="text-gray-300 text-sm">{info.secondary}</p>
                                        <p className="text-gray-400 text-xs mt-2">{info.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Contact Section */}
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent"></div>

                <div className="relative z-10 container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl font-bold text-white">
                                    Send us a <span className="text-red-500">Message</span>
                                </h2>
                                <p className="text-gray-300">Fill out the form below and we'll get back to you within 24 hours.</p>
                            </div>

                            {isSubmitted && (
                                <div className="bg-green-600/20 border border-green-500/50 rounded-lg p-4 flex items-center space-x-3 animate-bounce">
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                    <p className="text-green-400">Message sent successfully! We'll get back to you soon.</p>
                                </div>
                            )}

                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="relative">
                                        <Input
                                            type="text"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange("name", e.target.value)}
                                            onFocus={() => setFocusedField("name")}
                                            onBlur={() => setFocusedField(null)}
                                            className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 transition-all duration-300 ${
                                                focusedField === "name" ? "border-red-500 shadow-lg shadow-red-500/20" : ""
                                            } ${errors.name ? "border-red-500" : ""}`}
                                        />
                                        {errors.name && (
                                            <div className="flex items-center space-x-1 mt-1 text-red-400 text-sm">
                                                <AlertCircle className="w-4 h-4" />
                                                <span>{errors.name}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <Input
                                            type="email"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            onFocus={() => setFocusedField("email")}
                                            onBlur={() => setFocusedField(null)}
                                            className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 transition-all duration-300 ${
                                                focusedField === "email" ? "border-red-500 shadow-lg shadow-red-500/20" : ""
                                            } ${errors.email ? "border-red-500" : ""}`}
                                        />
                                        {errors.email && (
                                            <div className="flex items-center space-x-1 mt-1 text-red-400 text-sm">
                                                <AlertCircle className="w-4 h-4" />
                                                <span>{errors.email}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="relative">
                                        <Input
                                            type="tel"
                                            placeholder="Phone Number"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange("phone", e.target.value)}
                                            onFocus={() => setFocusedField("phone")}
                                            onBlur={() => setFocusedField(null)}
                                            className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 transition-all duration-300 ${
                                                focusedField === "phone" ? "border-red-500 shadow-lg shadow-red-500/20" : ""
                                            } ${errors.phone ? "border-red-500" : ""}`}
                                        />
                                        {errors.phone && (
                                            <div className="flex items-center space-x-1 mt-1 text-red-400 text-sm">
                                                <AlertCircle className="w-4 h-4" />
                                                <span>{errors.phone}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <select
                                            value={formData.category}
                                            onChange={(e) => handleInputChange("category", e.target.value)}
                                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 focus:border-red-500 focus:outline-none transition-colors"
                                        >
                                            <option value="general">General Inquiry</option>
                                            <option value="sales">Sales</option>
                                            <option value="support">Technical Support</option>
                                            <option value="warranty">Warranty</option>
                                            <option value="custom">Custom Build</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="relative">
                                    <Input
                                        type="text"
                                        placeholder="Subject"
                                        value={formData.subject}
                                        onChange={(e) => handleInputChange("subject", e.target.value)}
                                        onFocus={() => setFocusedField("subject")}
                                        onBlur={() => setFocusedField(null)}
                                        className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 transition-all duration-300 ${
                                            focusedField === "subject" ? "border-red-500 shadow-lg shadow-red-500/20" : ""
                                        } ${errors.subject ? "border-red-500" : ""}`}
                                    />
                                    {errors.subject && (
                                        <div className="flex items-center space-x-1 mt-1 text-red-400 text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.subject}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="relative">
                                    <Textarea
                                        placeholder="Your Message"
                                        rows={6}
                                        value={formData.message}
                                        onChange={(e) => handleInputChange("message", e.target.value)}
                                        onFocus={() => setFocusedField("message")}
                                        onBlur={() => setFocusedField(null)}
                                        className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 transition-all duration-300 resize-none ${
                                            focusedField === "message" ? "border-red-500 shadow-lg shadow-red-500/20" : ""
                                        } ${errors.message ? "border-red-500" : ""}`}
                                    />
                                    {errors.message && (
                                        <div className="flex items-center space-x-1 mt-1 text-red-400 text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.message}</span>
                                        </div>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Sending...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <Send className="w-5 h-5" />
                                            <span>Send Message</span>
                                        </div>
                                    )}
                                </Button>
                            </form>
                        </div>

                        {/* Contact Info & Image */}
                        <div className="space-y-8">
                            <div className="relative">
                                <img
                                    src="/placeholder.svg?height=400&width=600&text=nS-Computers+Office"
                                    alt="nS-Computers Office"
                                    className="w-full h-64 object-cover rounded-lg shadow-2xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-xl font-bold">Visit Our Showroom</h3>
                                    <p className="text-gray-300">Experience our products firsthand</p>
                                </div>
                            </div>

                            {/* Support Options */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-white">How Can We Help?</h3>
                                <div className="space-y-3">
                                    {supportOptions.map((option, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center space-x-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700 hover:border-red-500/50 transition-all duration-300 group cursor-pointer"
                                        >
                                            <div className="bg-red-600 p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                                                <option.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-white group-hover:text-red-400 transition-colors">
                                                    {option.title}
                                                </h4>
                                                <p className="text-gray-300 text-sm">{option.description}</p>
                                            </div>
                                            <div className="text-red-400 text-sm font-medium">{option.availability}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Office Hours */}
                            <Card className="bg-gray-800/50 border-gray-700">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                        <Clock className="w-5 h-5 mr-2 text-red-500" />
                                        Office Hours
                                    </h3>
                                    <div className="space-y-2 text-gray-300">
                                        <div className="flex justify-between">
                                            <span>Monday - Friday</span>
                                            <span className="text-red-400">9:00 AM - 8:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Saturday</span>
                                            <span className="text-red-400">9:00 AM - 6:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Sunday</span>
                                            <span className="text-red-400">10:00 AM - 4:00 PM</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section id="map" className="py-16 bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Find <span className="text-red-500">Our Location</span>
                        </h2>
                        <p className="text-gray-300">Visit our showroom to see our products in person</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl h-96 relative">
                                <img
                                    src="/placeholder.svg?height=400&width=800&text=Interactive+Map+View"
                                    alt="Map Location"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <div className="bg-red-600 px-4 py-2 rounded-full text-sm font-semibold">
                                        📍 nS-Computers Location
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Card className="bg-gray-800/50 border-gray-700">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-4">Address Details</h3>
                                    <div className="space-y-3 text-gray-300">
                                        <div className="flex items-start space-x-3">
                                            <MapPin className="w-5 h-5 text-red-500 mt-1" />
                                            <div>
                                                <p className="font-semibold">123 Galle Road</p>
                                                <p>Colombo 03, Sri Lanka</p>
                                                <p>Postal Code: 00300</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gray-800/50 border-gray-700">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-4">Getting Here</h3>
                                    <div className="space-y-2 text-gray-300 text-sm">
                                        <p>• 5 minutes walk from Bambalapitiya Station</p>
                                        <p>• Free parking available</p>
                                        <p>• Bus routes: 100, 101, 102</p>
                                        <p>• Taxi/Uber pickup point available</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 font-semibold transform hover:scale-105 transition-all duration-300">
                                Get Directions
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-blue-900/10"></div>

                <div className="relative z-10 container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            What Our <span className="text-red-500">Customers Say</span>
                        </h2>
                        <p className="text-gray-300">Don't just take our word for it</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card
                                key={index}
                                className="bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-all duration-500 transform hover:-translate-y-2"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <img
                                            src={testimonial.image || "/placeholder.svg"}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-semibold text-white">{testimonial.name}</h4>
                                            <p className="text-red-400 text-sm">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex mb-3">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-gray-300 italic">"{testimonial.message}"</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Media */}
            <section className="py-16 bg-gray-900">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Follow Us on <span className="text-red-500">Social Media</span>
                    </h2>
                    <p className="text-gray-300 mb-8">Stay updated with our latest products and offers</p>

                    <div className="flex justify-center space-x-6">
                        {[
                            { icon: Facebook, href: "#", color: "hover:text-blue-500", name: "Facebook" },
                            { icon: Instagram, href: "#", color: "hover:text-pink-500", name: "Instagram" },
                            { icon: Twitter, href: "#", color: "hover:text-blue-400", name: "Twitter" },
                            { icon: Youtube, href: "#", color: "hover:text-red-500", name: "YouTube" },
                        ].map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                className={`bg-gray-800 p-4 rounded-full text-gray-300 ${social.color} transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl`}
                                aria-label={social.name}
                            >
                                <social.icon className="w-8 h-8" />
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
