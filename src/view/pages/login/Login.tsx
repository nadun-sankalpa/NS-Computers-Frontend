"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Github, Chrome, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import AuthBackground from "./auth-background"
import { Link, useNavigate } from "react-router-dom"

interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({}) // Allow null for API errors
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) { // Minimum password length validation
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      return // Stop if frontend validation fails
    }

    setIsLoading(true)
    setErrors({}) // Clear previous errors

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", { // Correct login endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Assuming your backend returns { accessToken, refreshToken, user: { role, ... } }
        const userRole = data.user?.role; // Safely access user role

        // Store tokens (e.g., in localStorage or a state management solution)
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('userRole', userRole); // Store role for persistence if needed

        console.log("Login successful:", data);

        // Conditional navigation based on role
        if (userRole === 'admin') {
          navigate('/admin-dashboard'); // Navigate to admin dashboard
        } else {
          navigate('/'); // Navigate to home page for other roles (e.g., customer)
        }

      } else {
        // Handle backend errors (e.g., invalid credentials)
        setErrors({ api: data.message || "Login failed. Please check your credentials." });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ api: "Network error or server is unreachable. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  }

  const handleNavigateToSignup = () => {
    setIsNavigating(true)
    setTimeout(() => {
      navigate('/signup')
    }, 300)
  }

  const handleInputChange = (field: keyof LoginForm, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null })) // Clear specific field error
    }
    if (errors.api) {
      setErrors((prev) => ({ ...prev, api: null })); // Clear API error on input change
    }
  }

  const socialLogins = [
    { icon: Chrome, name: "Google", color: "hover:bg-red-600" },
    { icon: Facebook, name: "Facebook", color: "hover:bg-blue-600" },
    { icon: Github, name: "GitHub", color: "hover:bg-gray-600" },
  ]

  return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
        <AuthBackground />

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
                    Welcome Back
                  </h1>
                  <p className="text-gray-400 mt-2">Sign in to your nS-Computers account</p>
                </div>

                {/* Logo Animation */}
                <div className="relative mx-auto w-16 h-16 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-pulse"></div>
                  <div className="relative z-10 w-full h-full bg-black rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-red-500" />
                  </div>
                </div>
              </div>

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

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="relative">
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
                  </div>
                  {errors.email && <p className="text-red-400 text-sm mt-1 animate-bounce">{errors.email}</p>}
                </div>

                {/* Password Field */}
                <div className="relative">
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
                  </div>
                  {errors.password && <p className="text-red-400 text-sm mt-1 animate-bounce">{errors.password}</p>}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
                        className="w-4 h-4 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-sm text-red-400 hover:text-red-300 transition-colors">
                    Forgot password?
                  </Link>
                </div>

                {/* Display general API error */}
                {errors.api && (
                    <p className="text-red-400 text-sm text-center animate-bounce">{errors.api}</p>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                  ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                  )}
                </Button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center mt-6">
                <p className="text-gray-400">
                  Don't have an account?{" "}
                  <button
                      onClick={handleNavigateToSignup}
                      disabled={isNavigating}
                      className="text-red-400 hover:text-red-300 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isNavigating ? (
                        <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-400 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Redirecting...
                      </span>
                    ) : 'Sign up'}
                  </button>
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
        </div>
      </div>
  )
}
