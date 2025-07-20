"use client"

import { useState, useEffect, useRef } from "react"
import {
    Users,
    Award,
    Target,
    Heart,
    Zap,
    Shield,
    Cpu,
    Monitor,
    Gamepad2,
    TrendingUp,
    Star,
    CheckCircle,
    ArrowRight,
    Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ParticleBackground from "../home/particle-background"

interface CounterProps {
    end: number
    duration: number
    suffix?: string
}

function AnimatedCounter({ end, duration, suffix = "" }: CounterProps) {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 },
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!isVisible) return

        let startTime: number
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            setCount(Math.floor(progress * end))

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [isVisible, end, duration])

    return (
        <div ref={ref} className="text-4xl font-bold text-red-500">
            {count.toLocaleString()}
            {suffix}
        </div>
    )
}

export default function AboutPage() {
    const [activeTimeline, setActiveTimeline] = useState(0)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)

    const stats = [
        { icon: Users, label: "Happy Customers", value: 15000, suffix: "+" },
        { icon: Award, label: "Years Experience", value: 8, suffix: "+" },
        { icon: Cpu, label: "Products Sold", value: 25000, suffix: "+" },
        { icon: Shield, label: "Warranty Claims", value: 99, suffix: "%" },
    ]

    const values = [
        {
            icon: Target,
            title: "Innovation",
            description: "Constantly pushing boundaries with cutting-edge technology and forward-thinking solutions.",
            color: "from-red-500 to-orange-500",
        },
        {
            icon: Heart,
            title: "Customer First",
            description: "Every decision we make is centered around delivering exceptional customer experiences.",
            color: "from-blue-500 to-purple-500",
        },
        {
            icon: Zap,
            title: "Performance",
            description: "Delivering high-performance solutions that exceed expectations and drive success.",
            color: "from-green-500 to-teal-500",
        },
        {
            icon: Shield,
            title: "Reliability",
            description: "Building trust through consistent quality, dependable service, and unwavering support.",
            color: "from-purple-500 to-pink-500",
        },
    ]

    const timeline = [
        {
            year: "2016",
            title: "The Beginning",
            description: "Started as a small computer repair shop with a passion for gaming technology.",
            icon: Gamepad2,
        },
        {
            year: "2018",
            title: "First Expansion",
            description: "Opened our first retail store and began selling gaming laptops and accessories.",
            icon: Monitor,
        },
        {
            year: "2020",
            title: "Online Presence",
            description: "Launched our e-commerce platform and expanded to island-wide delivery.",
            icon: TrendingUp,
        },
        {
            year: "2022",
            title: "Premium Partnership",
            description: "Became authorized dealers for major gaming brands like MSI, ASUS, and HP.",
            icon: Award,
        },
        {
            year: "2024",
            title: "Market Leader",
            description: "Established as Sri Lanka's leading gaming laptop retailer with 15,000+ customers.",
            icon: Star,
        },
    ]

    const team = [
        {
            name: "Nuwan Silva",
            role: "Founder & CEO",
            image: "/placeholder.svg?height=300&width=300",
            description: "Gaming enthusiast with 10+ years in tech industry",
        },
        {
            name: "Samantha Perera",
            role: "Technical Director",
            image: "/placeholder.svg?height=300&width=300",
            description: "Expert in hardware optimization and performance tuning",
        },
        {
            name: "Kasun Fernando",
            role: "Customer Success Manager",
            image: "/placeholder.svg?height=300&width=300",
            description: "Dedicated to ensuring exceptional customer experiences",
        },
        {
            name: "Priya Jayawardena",
            role: "Marketing Director",
            image: "/placeholder.svg?height=300&width=300",
            description: "Creative strategist driving brand growth and engagement",
        },
    ]

    const achievements = [
        "Best Gaming Retailer 2023 - Sri Lanka Tech Awards",
        "Customer Choice Award 2022 - E-commerce Excellence",
        "Fastest Growing Tech Company 2021 - Business Today",
        "Innovation in Retail 2020 - Digital Commerce Awards",
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTimeline((prev) => (prev + 1) % timeline.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [timeline.length])

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
                                ABOUT US
                            </h1>
                            <p className="text-xl lg:text-2xl text-red-400 font-semibold tracking-wider">
                                POWERING DREAMS THROUGH TECHNOLOGY
                            </p>
                        </div>

                        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                            At nS-Computers, we're more than just a retailer – we're your partners in unleashing the full potential of
                            gaming and professional computing. Since 2016, we've been at the forefront of bringing cutting-edge
                            technology to Sri Lankan gamers and professionals.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                size="lg"
                                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/25"
                            >
                                Our Story
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 bg-transparent"
                                onClick={() => setIsVideoPlaying(true)}
                            >
                                <Play className="mr-2 w-5 h-5" />
                                Watch Video
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
                                <div className="bg-gradient-to-br from-red-600 to-red-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-red-500/50 transition-all duration-300">
                                    <stat.icon className="w-10 h-10 text-white" />
                                </div>
                                <AnimatedCounter end={stat.value} duration={2000} suffix={stat.suffix} />
                                <p className="text-gray-300 mt-2 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent"></div>

                <div className="relative z-10 container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-4xl lg:text-5xl font-bold text-white">
                                    Our <span className="text-red-500">Mission</span>
                                </h2>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    To democratize access to high-performance computing technology in Sri Lanka, empowering gamers,
                                    creators, and professionals to achieve their full potential through cutting-edge hardware solutions.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-red-400">What Drives Us</h3>
                                <ul className="space-y-3">
                                    {[
                                        "Bringing the latest gaming technology to Sri Lanka",
                                        "Providing expert guidance and support",
                                        "Building lasting relationships with our customers",
                                        "Fostering the local gaming and tech community",
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-center space-x-3 group">
                                            <CheckCircle className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
                                            <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-red-600/20 to-blue-600/20 rounded-2xl p-8 backdrop-blur-sm border border-red-500/20">
                                <h3 className="text-3xl font-bold text-white mb-6">Our Vision</h3>
                                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                    To be Sri Lanka's most trusted and innovative technology partner, recognized for excellence in
                                    customer service, product quality, and community impact.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-black/30 rounded-lg">
                                        <div className="text-2xl font-bold text-red-500">2030</div>
                                        <div className="text-sm text-gray-400">Vision Year</div>
                                    </div>
                                    <div className="text-center p-4 bg-black/30 rounded-lg">
                                        <div className="text-2xl font-bold text-red-500">#1</div>
                                        <div className="text-sm text-gray-400">Market Position</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            Our <span className="text-red-500">Values</span>
                        </h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            The principles that guide everything we do and shape our company culture
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <Card
                                key={index}
                                className="group bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <CardContent className="p-6 text-center space-y-4">
                                    <div
                                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <value.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>

                <div className="relative z-10 container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            Our <span className="text-red-500">Journey</span>
                        </h2>
                        <p className="text-lg text-gray-300">From humble beginnings to market leadership</p>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 via-red-600 to-red-500"></div>

                        <div className="space-y-16">
                            {timeline.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} group`}
                                >
                                    <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                                        <Card
                                            className={`bg-gray-800/50 border-gray-700 group-hover:border-red-500/50 transition-all duration-500 transform ${activeTimeline === index ? "scale-105 border-red-500/50 shadow-lg shadow-red-500/20" : "hover:scale-105"}`}
                                        >
                                            <CardContent className="p-6">
                                                <div className="flex items-center space-x-3 mb-3">
                                                    <div className="bg-red-600 p-2 rounded-full">
                                                        <item.icon className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div className="text-2xl font-bold text-red-500">{item.year}</div>
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                                <p className="text-gray-300">{item.description}</p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Timeline Node */}
                                    <div className="relative z-10">
                                        <div
                                            className={`w-6 h-6 rounded-full border-4 border-red-500 transition-all duration-300 ${activeTimeline === index ? "bg-red-500 scale-125" : "bg-black"}`}
                                        ></div>
                                    </div>

                                    <div className="w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            Meet Our <span className="text-red-500">Team</span>
                        </h2>
                        <p className="text-lg text-gray-300">The passionate individuals driving our success</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <Card
                                key={index}
                                className="group bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={member.image || "/placeholder.svg"}
                                        alt={member.name}
                                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <CardContent className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                                        {member.name}
                                    </h3>
                                    <p className="text-red-500 font-medium mb-3">{member.role}</p>
                                    <p className="text-gray-300 text-sm">{member.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-blue-900/10"></div>

                <div className="relative z-10 container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            Our <span className="text-red-500">Achievements</span>
                        </h2>
                        <p className="text-lg text-gray-300">Recognition for our commitment to excellence</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {achievements.map((achievement, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-4 p-6 bg-gray-800/30 rounded-lg border border-gray-700 hover:border-red-500/50 transition-all duration-300 group"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div className="bg-red-600 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                                    <Award className="w-6 h-6 text-white" />
                                </div>
                                <p className="text-gray-300 group-hover:text-white transition-colors">{achievement}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-red-900/20 via-black to-blue-900/20">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white">
                            Ready to <span className="text-red-500">Level Up</span>?
                        </h2>
                        <p className="text-lg text-gray-300">
                            Join thousands of satisfied customers who trust nS-Computers for their gaming and professional needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/25"
                            >
                                Shop Now
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300 bg-transparent"
                            >
                                Contact Us
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
