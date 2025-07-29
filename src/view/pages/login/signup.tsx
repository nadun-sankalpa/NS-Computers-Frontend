"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Github, Chrome, Facebook, Phone, CheckCircle, MapPin, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Link, useNavigate } from "react-router-dom"
import ParticleBackground from "@/view/pages/home/particle-background.tsx";

interface SignupForm {
    fullName: string;
    email: string
    phone: string
    address: string;
    role: 'customer' | 'admin';
    password: string
    // Removed: confirmPassword: string
    agreeToTerms: boolean
    subscribeNewsletter: boolean
}

export default function SignupPage() {
    const [formData, setFormData] = useState<SignupForm>({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        role: "customer",
        password: "",
        // Removed: confirmPassword: "",
        agreeToTerms: false,
        subscribeNewsletter: true,
    })
    const [showPassword, setShowPassword] = useState(false)
    // Removed: const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [focusedField, setFocusedField] = useState<string | null>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [passwordStrength, setPasswordStrength] = useState(0)
    const [currentStep, setCurrentStep] = useState(1)
    const [signupSuccess, setSignupSuccess] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true)
    }, [])

    useEffect(() => {
        const password = formData.password
        let strength = 0
        if (password.length >= 8) strength++
        if (/[A-Z]/.test(password)) strength++
        if (/[a-z]/.test(password)) strength++
        if (/[0-9]/.test(password)) strength++
        if (/[^A-Za-z0-9]/.test(password)) strength++
        setPasswordStrength(strength)
    }, [formData.password])

    const validateStep1 = () => {
        const newErrors: { [key: string]: string } = {}

        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
        if (!formData.address.trim()) newErrors.address = "Address is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const validateStep2 = () => {
        const newErrors: { [key: string]: string } = {}

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters"
        }

        // Removed: confirmPassword validation
        // if (!formData.confirmPassword) {
        //     newErrors.confirmPassword = "Please confirm your password"
        // } else if (formData.password !== formData.confirmPassword) {
        //     newErrors.confirmPassword = "Passwords do not match"
        // }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = "You must agree to the terms and conditions"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleNext = () => {
        if (currentStep === 1 && validateStep1()) {
            setCurrentStep(2)
        }
    }

    const handleBack = () => {
        setCurrentStep(1)
        setErrors({})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateStep2()) return

        setIsLoading(true)
        setErrors({})

        try {
            const response = await fetch("http://localhost:3000/api/users/save-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    role: formData.role,
                    password: formData.password,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                setSignupSuccess(true)
                setTimeout(() => {
                    navigate("/login")
                }, 2000);
            } else {
                setErrors({ api: data.message || data.error || "Signup failed. Please try again." })
            }
        } catch (error) {
            console.error("Signup error:", error)
            setErrors({ api: "Network error or server is unreachable. Please try again later." })
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (field: keyof SignupForm, value: string | boolean | 'customer' | 'admin') => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
        if (errors.api) {
            setErrors((prev) => ({ ...prev, api: "" }));
        }
    }

    const socialLogins = [
        { icon: Chrome, name: "Google", color: "hover:bg-red-600" },
        { icon: Facebook, name: "Facebook", color: "hover:bg-blue-600" },
        { icon: Github, name: "GitHub", color: "hover:bg-gray-600" },
    ]

    const getPasswordStrengthColor = () => {
        if (passwordStrength <= 2) return "bg-red-500"
        if (passwordStrength <= 3) return "bg-yellow-500"
        return "bg-green-500"
    }

    const getPasswordStrengthText = () => {
        if (passwordStrength <= 2) return "Weak"
        if (passwordStrength <= 3) return "Medium"
        return "Strong"
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
            <ParticleBackground />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-blue-900/20 z-0"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-red-500/5 to-transparent z-0"></div>

            {/* Animated Grid */}
            <div className="absolute inset-0 opacity-10 z-0">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.3) 1px, transparent 1px)
            `,
                        backgroundSize: "60px 60px",
                        animation: "grid-move 30s linear infinite",
                    }}
                ></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                <Card
                    className={`bg-gray-900/80 backdrop-blur-xl border-gray-700 shadow-2xl shadow-red-500/10 transform transition-all duration-1000 ${
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                >
                    <CardContent className="p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="mb-4">
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent">
                                    Join nS-Computers
                                </h1>
                                <p className="text-gray-400 mt-2">Create your account to get started</p>
                            </div>

                            {/* Progress Indicator */}
                            <div className="flex items-center justify-center space-x-4 mb-6">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        currentStep >= 1 ? "bg-red-500 text-white" : "bg-gray-700 text-gray-400"
                                    }`}
                                >
                                    {currentStep > 1 ? <CheckCircle className="w-5 h-5" /> : "1"}
                                </div>
                                <div
                                    className={`w-16 h-1 transition-all duration-300 ${currentStep >= 2 ? "bg-red-500" : "bg-gray-700"}`}
                                ></div>
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        currentStep >= 2 ? "bg-red-500 text-white" : "bg-gray-700 text-gray-400"
                                    }`}
                                >
                                    2
                                </div>
                            </div>
                        </div>

                        {signupSuccess ? (
                            <div className="text-center py-10">
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                                <h2 className="text-2xl font-bold text-green-400 mb-2">Signup Successful!</h2>
                                <p className="text-gray-300">Your account has been created. Redirecting to login...</p>
                            </div>
                        ) : (
                            <>
                                {currentStep === 1 ? (
                                    <>
                                        {/* Social Login */}
                                        <div className="mb-6">
                                            <div className="grid grid-cols-3 gap-3">
                                                {socialLogins.map((social, index) => (
                                                    <Button
                                                        key={index}
                                                        variant="outline"
                                                        className={`border-gray-600 text-gray-300 ${social.color} hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                                                        style={{ animationDelay: `${index * 0.1}s` }}
                                                    >
                                                        <social.icon className="w-5 h-5" />
                                                    </Button>
                                                ))}
                                            </div>

                                            <div className="relative my-6">
                                                <div className="absolute inset-0 flex items-center">
                                                    <div className="w-full border-t border-gray-600"></div>
                                                </div>
                                                <div className="relative flex justify-center text-sm">
                                                    <span className="px-2 bg-gray-900 text-gray-400">Or continue with email</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Step 1 Form */}
                                        <div className="space-y-6">
                                            {/* Full Name Field */}
                                            <div className="relative">
                                                <User
                                                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                                                        focusedField === "fullName" ? "text-red-500" : "text-gray-400"
                                                    }`}
                                                />
                                                <Input
                                                    type="text"
                                                    placeholder="Full name"
                                                    value={formData.fullName}
                                                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                                                    onFocus={() => setFocusedField("fullName")}
                                                    onBlur={() => setFocusedField(null)}
                                                    className={`pl-12 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 transition-all duration-300 ${
                                                        focusedField === "fullName"
                                                            ? "border-red-500 shadow-lg shadow-red-500/20 bg-gray-800/80"
                                                            : ""
                                                    } ${errors.fullName ? "border-red-500" : ""}`}
                                                />
                                                {errors.fullName && (
                                                    <p className="text-red-400 text-sm mt-1 animate-bounce">{errors.fullName}</p>
                                                )}
                                            </div>

                                            {/* Email Field */}
                                            <div className="relative">
                                                <Mail
                                                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                                                        focusedField === "email" ? "text-red-500" : "text-gray-400"
                                                    }`}
                                                />
                                                <Input
                                                    type="email"
                                                    placeholder="Email address"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                                    onFocus={() => setFocusedField("email")}
                                                    onBlur={() => setFocusedField(null)}
                                                    className={`pl-12 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 transition-all duration-300 ${
                                                        focusedField === "email" ? "border-red-500 shadow-lg shadow-red-500/20 bg-gray-800/80" : ""
                                                    } ${errors.email ? "border-red-500" : ""}`}
                                                />
                                                {errors.email && <p className="text-red-400 text-sm mt-1 animate-bounce">{errors.email}</p>}
                                            </div>

                                            {/* Phone Field */}
                                            <div className="relative">
                                                <Phone
                                                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                                                        focusedField === "phone" ? "text-red-500" : "text-gray-400"
                                                    }`}
                                                />
                                                <Input
                                                    type="tel"
                                                    placeholder="Phone number"
                                                    value={formData.phone}
                                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                                    onFocus={() => setFocusedField("phone")}
                                                    onBlur={() => setFocusedField(null)}
                                                    className={`pl-12 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 transition-all duration-300 ${
                                                        focusedField === "phone" ? "border-red-500 shadow-lg shadow-red-500/20 bg-gray-800/80" : ""
                                                    } ${errors.phone ? "border-red-500" : ""}`}
                                                />
                                                {errors.phone && <p className="text-red-400 text-sm mt-1 animate-bounce">{errors.phone}</p>}
                                            </div>

                                            {/* Address Field */}
                                            <div className="relative">
                                                <MapPin
                                                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                                                        focusedField === "address" ? "text-red-500" : "text-gray-400"
                                                    }`}
                                                />
                                                <Input
                                                    type="text"
                                                    placeholder="Address"
                                                    value={formData.address}
                                                    onChange={(e) => handleInputChange("address", e.target.value)}
                                                    onFocus={() => setFocusedField("address")}
                                                    onBlur={() => setFocusedField(null)}
                                                    className={`pl-12 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 transition-all duration-300 ${
                                                        focusedField === "address" ? "border-red-500 shadow-lg shadow-red-500/20 bg-gray-800/80" : ""
                                                    } ${errors.address ? "border-red-500" : ""}`}
                                                />
                                                {errors.address && <p className="text-red-400 text-sm mt-1 animate-bounce">{errors.address}</p>}
                                            </div>

                                            {/* Role Field (Dropdown) */}
                                            <div className="relative">
                                                <Briefcase
                                                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                                                        focusedField === "role" ? "text-red-500" : "text-gray-400"
                                                    }`}
                                                />
                                                <div className="relative">
                                                    <select
                                                        value={formData.role}
                                                        onChange={(e) => handleInputChange("role", e.target.value as 'customer' | 'admin')}
                                                        onFocus={() => setFocusedField("role")}
                                                        onBlur={() => setFocusedField(null)}
                                                        className={`w-full pl-12 pr-4 py-2 bg-gray-800/50 border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 appearance-none ${
                                                            focusedField === "role" ? "border-red-500 shadow-lg shadow-red-500/20 bg-gray-800/80" : ""
                                                        }`}
                                                    >
                                                        <option value="customer" className="bg-gray-800 text-white">Customer</option>
                                                        <option value="admin" className="bg-gray-800 text-white">Admin</option>
                                                    </select>
                                                    {/* Custom arrow for select */}
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                                    </div>
                                                </div>
                                            </div>


                                            {/* Next Button */}
                                            <Button
                                                onClick={handleNext}
                                                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/25"
                                            >
                                                <div className="flex items-center justify-center space-x-2">
                                                    <span>Continue</span>
                                                    <ArrowRight className="w-5 h-5" />
                                                </div>
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Step 2 Form */}
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {/* Password Field */}
                                            <div className="relative">
                                                <Lock
                                                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                                                        focusedField === "password" ? "text-red-500" : "text-gray-400"
                                                    }`}
                                                />
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Password"
                                                    value={formData.password}
                                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                                    onFocus={() => setFocusedField("password")}
                                                    onBlur={() => setFocusedField(null)}
                                                    className={`pl-12 pr-12 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 transition-all duration-300 ${
                                                        focusedField === "password" ? "border-red-500 shadow-lg shadow-red-500/20 bg-gray-800/80" : ""
                                                    } ${errors.password ? "border-red-500" : ""}`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>

                                                {/* Password Strength Indicator */}
                                                {formData.password && (
                                                    <div className="mt-2">
                                                        <div className="flex items-center space-x-2">
                                                            <div className="flex-1 bg-gray-700 rounded-full h-2">
                                                                <div
                                                                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                                                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                                                ></div>
                                                            </div>
                                                            <span
                                                                className={`text-xs font-medium ${
                                                                    passwordStrength <= 2
                                                                        ? "text-red-400"
                                                                        : passwordStrength <= 3
                                                                            ? "text-yellow-400"
                                                                            : "text-green-400"
                                                                }`}
                                                            >
                                                                {getPasswordStrengthText()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}

                                                {errors.password && <p className="text-red-400 text-sm mt-1 animate-bounce">{errors.password}</p>}
                                            </div>

                                            {/* Removed Confirm Password Field */}
                                            {/*
                                            <div className="relative">
                                                <Lock
                                                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                                                        focusedField === "confirmPassword" ? "text-red-500" : "text-gray-400"
                                                    }`}
                                                />
                                                <Input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="Confirm password"
                                                    value={formData.confirmPassword}
                                                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                                    onFocus={() => setFocusedField("confirmPassword")}
                                                    onBlur={() => setFocusedField(null)}
                                                    className={`pl-12 pr-12 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 transition-all duration-300 ${
                                                        focusedField === "confirmPassword"
                                                            ? "border-red-500 shadow-lg shadow-red-500/20 bg-gray-800/80"
                                                            : ""
                                                    } ${errors.confirmPassword ? "border-red-500" : ""}`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                                                >
                                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                                {errors.confirmPassword && (
                                                    <p className="text-red-400 text-sm mt-1 animate-bounce">{errors.confirmPassword}</p>
                                                )}
                                            </div>
                                            */}

                                            {/* Checkboxes */}
                                            <div className="space-y-3">
                                                <label className="flex items-start space-x-3 cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.agreeToTerms}
                                                        onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                                                        className="w-4 h-4 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-500 focus:ring-2 mt-1"
                                                    />
                                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                                        I agree to the{" "}
                                                        <Link to="/terms" className="text-red-400 hover:text-red-300">
                                                            Terms of Service
                                                        </Link>{" "}
                                                        and{" "}
                                                        <Link to="/privacy" className="text-red-400 hover:text-red-300">
                                                            Privacy Policy
                                                        </Link>
                                                    </span>
                                                </label>
                                                {errors.agreeToTerms && (
                                                    <p className="text-red-400 text-sm animate-bounce">{errors.agreeToTerms}</p>
                                                )}

                                                <label className="flex items-center space-x-3 cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.subscribeNewsletter}
                                                        onChange={(e) => handleInputChange("subscribeNewsletter", e.target.checked)}
                                                        className="w-4 h-4 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-500 focus:ring-2"
                                                    />
                                                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                                        Subscribe to our newsletter for latest updates and offers
                                                    </span>
                                                </label>
                                            </div>

                                            {/* Display general API error */}
                                            {errors.api && (
                                                <p className="text-red-400 text-sm text-center animate-bounce">{errors.api}</p>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="flex space-x-4">
                                                <Button
                                                    type="button"
                                                    onClick={handleBack}
                                                    variant="outline"
                                                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300 bg-transparent"
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    disabled={isLoading}
                                                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                                >
                                                    {isLoading ? (
                                                        <div className="flex items-center space-x-2">
                                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                            <span>Creating...</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-center space-x-2">
                                                            <span>Create Account</span>
                                                            <ArrowRight className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </Button>
                                            </div>
                                        </form>
                                    </>
                                )}
                            </>
                        )}


                        {/* Sign In Link */}
                        <div className="text-center mt-6">
                            <p className="text-gray-400">
                                Already have an account?{" "}
                                <Link to="/login" className="text-red-400 hover:text-red-300 font-semibold transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Floating Elements */}
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
                <div
                    className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute top-1/2 -left-20 w-16 h-16 bg-green-500/20 rounded-full blur-xl animate-pulse"
                    style={{ animationDelay: "2s" }}
                ></div>
            </div>
        </div>
    )
}
