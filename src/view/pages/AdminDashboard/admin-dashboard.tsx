"use client"

import { useState } from "react"
import {
    Search,
    Download,
    TrendingUp,
    ShoppingCart,
    DollarSign,
    Users,
    Package,
    Bell,
    User,
    LogOut,
    MoreHorizontal,
    Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
// Removed Chart imports as they are no longer needed
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
// import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"

// Enhanced animated background with intense red effects
const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Enhanced floating particles with more red variants */}
            {[...Array(35)].map((_, i) => (
                <div
                    key={i}
                    className={`absolute rounded-full animate-pulse ${
                        i % 4 === 0
                            ? "w-2 h-2 bg-red-400/50"
                            : i % 4 === 1
                                ? "w-1 h-1 bg-red-500/40"
                                : i % 4 === 2
                                    ? "w-1.5 h-1.5 bg-cyan-400/35"
                                    : "w-1 h-1 bg-red-600/30"
                    }`}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 4}s`,
                        animationDuration: `${2 + Math.random() * 4}s`,
                    }}
                />
            ))}

            {/* Enhanced gradient orbs with intense red */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-red-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse" />
            <div
                className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/10 to-red-500/12 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
            />
            <div
                className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-red-600/8 to-orange-500/8 rounded-full blur-2xl animate-pulse"
                style={{ animationDelay: "2s" }}
            />
            <div
                className="absolute top-3/4 left-1/3 w-64 h-64 bg-gradient-to-r from-red-400/6 to-red-600/6 rounded-full blur-xl animate-pulse"
                style={{ animationDelay: "3s" }}
            />

            {/* Floating red glows with varying sizes */}
            {[...Array(10)].map((_, i) => (
                <div
                    key={`glow-${i}`}
                    className={`absolute bg-red-500/8 rounded-full blur-xl animate-pulse ${
                        i % 3 === 0 ? "w-40 h-40" : i % 3 === 1 ? "w-32 h-32" : "w-24 h-24"
                    }`}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${3 + Math.random() * 3}s`,
                    }}
                />
            ))}

            {/* Pulsing red dots */}
            {[...Array(15)].map((_, i) => (
                <div
                    key={`dot-${i}`}
                    className="absolute w-3 h-3 bg-red-500/20 rounded-full animate-ping"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 6}s`,
                        animationDuration: `${4 + Math.random() * 2}s`,
                    }}
                />
            ))}
        </div>
    )
}

export default function AdminDashboardPage() {
    const [searchTerm, setSearchTerm] = useState("")

    // Fake data for Recent Orders table
    const recentOrders = [
        { id: "#1001", customer: "John Doe", status: "Delivered", total: "LKR 120,000" },
        { id: "#1002", customer: "Jane Smith", status: "Processing", total: "LKR 85,500" },
        { id: "#1003", customer: "Robert Johnson", status: "Pending", total: "LKR 220,000" },
        { id: "#1004", customer: "Emily Davis", status: "Shipped", total: "LKR 175,250" },
        { id: "#1005", customer: "Michael Wilson", status: "Cancelled", total: "LKR 65,990" },
        { id: "#1006", customer: "Sarah Brown", status: "Delivered", total: "LKR 300,000" },
        { id: "#1007", customer: "David Lee", status: "Processing", total: "LKR 99,000" },
        { id: "#1008", customer: "Olivia White", status: "Shipped", total: "LKR 140,000" },
    ]

    // Fake data for Top Selling Products
    const topProducts = [
        { name: "Gaming Laptop Pro", sales: "LKR 5,200,000", units: 120 },
        { name: "Mechanical Keyboard RGB", sales: "LKR 1,800,000", units: 350 },
        { name: "4K Ultra HD Monitor", sales: "LKR 2,500,000", units: 80 },
        { name: "Wireless Gaming Mouse", sales: "LKR 950,000", units: 500 },
        { name: "External SSD 1TB", sales: "LKR 1,100,000", units: 150 },
    ]

    // Fake data for Recent User Activity
    const userActivity = [
        { user: "Alice Johnson", action: "logged in", time: "2 minutes ago" },
        { user: "Bob Williams", action: "updated profile", time: "15 minutes ago" },
        { user: "Charlie Brown", action: "placed new order #1009", time: "30 minutes ago" },
        { user: "Diana Prince", action: "viewed product 'Gaming Laptop Pro'", time: "1 hour ago" },
        { user: "Eve Adams", action: "reset password", time: "2 hours ago" },
    ]

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case "Delivered":
                return "bg-green-500/20 text-green-400 border-green-500/30"
            case "Processing":
                return "bg-blue-500/20 text-blue-400 border-blue-500/30"
            case "Pending":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
            case "Shipped":
                return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
            case "Cancelled":
                return "bg-red-500/20 text-red-400 border-red-500/30"
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30"
        }
    }

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            <AnimatedBackground />

            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-full w-64 bg-slate-800/90 backdrop-blur-xl border-r border-slate-700/50 z-10">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/30 animate-pulse">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-red-400">NS Computers</span>
                    </div>

                    <nav className="space-y-2">
                        {[
                            { icon: TrendingUp, label: "Dashboard", active: true },
                            { icon: Users, label: "Users", active: false },
                            { icon: ShoppingCart, label: "Orders", active: false },
                            { icon: Package, label: "Products", active: false },
                            { icon: DollarSign, label: "Analytics", active: false },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer ${
                                    item.active
                                        ? "bg-red-500/25 border border-red-500/40 text-red-400 shadow-lg shadow-red-500/15 animate-pulse"
                                        : "hover:bg-slate-700/50 text-slate-300 hover:shadow-md hover:shadow-red-500/5"
                                }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </div>
                        ))}
                    </nav>

                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-slate-700/50 rounded-lg p-4 mb-4 border border-red-500/15 shadow-lg shadow-red-500/10">
                            <p className="text-sm text-slate-300 mb-2">Need help?</p>
                            <p className="text-xs text-slate-400 mb-3">Our support team is here to help you</p>
                            <Button className="w-full bg-red-500 hover:bg-red-600 text-white text-sm shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105">
                                Contact Support
                            </Button>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-slate-400">Dark Mode</span>
                            <div className="w-10 h-6 bg-red-500 rounded-full relative shadow-lg shadow-red-500/40 animate-pulse">
                                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <Button
                            variant="outline"
                            className="w-full border-red-500/40 text-red-400 hover:bg-red-500/15 hover:border-red-500/60 transition-all duration-300 bg-transparent shadow-lg shadow-red-500/10 hover:shadow-red-500/20"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="ml-64">
                {/* Top Header */}
                <div className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                                <Input
                                    placeholder="Search..."
                                    className="pl-10 bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/25 transition-all duration-300"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="relative hover:bg-red-500/15">
                                <Bell className="w-5 h-5" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/60 animate-ping"></div>
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2 hover:bg-red-500/15">
                                        <User className="w-5 h-5" />
                                        <span>Admin</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-slate-800 border-slate-700">
                                    <DropdownMenuItem className="hover:bg-slate-700">Profile</DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-slate-700">Settings</DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-red-500/20 text-red-400">
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                            <p className="text-slate-400">Welcome back, Admin</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                className="border-slate-600 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 bg-transparent text-white"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                            {/* Removed "Add New" button as requested */}
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
                            {
                                title: "Total Revenue",
                                value: "LKR 24,780",
                                icon: DollarSign,
                                change: "12.5% from last week",
                                changeColor: "text-green-400",
                                iconColor: "text-cyan-400",
                                bgGlow: "shadow-cyan-500/15",
                            },
                            {
                                title: "Total Orders",
                                value: "1,245",
                                icon: ShoppingCart,
                                change: "8.2% from last week",
                                changeColor: "text-green-400",
                                iconColor: "text-red-400",
                                bgGlow: "shadow-red-500/15",
                            },
                            {
                                title: "Total Customers",
                                value: "845",
                                icon: Users,
                                change: "2.1% from last week",
                                changeColor: "text-red-400",
                                iconColor: "text-purple-400",
                                bgGlow: "shadow-purple-500/15",
                            },
                            {
                                title: "Total Products",
                                value: "1,289",
                                icon: Package,
                                change: "5.3% from last week",
                                changeColor: "text-green-400",
                                iconColor: "text-yellow-400",
                                bgGlow: "shadow-yellow-500/15",
                            },
                        ].map((stat) => (
                            <Card
                                key={stat.title}
                                className={`bg-slate-800/50 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:shadow-xl ${stat.bgGlow} hover:transform hover:scale-105`}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-slate-400 text-sm font-medium">{stat.title}</p>
                                            <p className="text-2xl font-bold mt-1 text-white">{stat.value}</p>
                                            <p className={`text-sm mt-1 ${stat.changeColor}`}>
                                                {stat.change.includes("-") ? "↓" : "↑"} {stat.change}
                                            </p>
                                        </div>
                                        <div
                                            className={`w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center shadow-lg ${stat.bgGlow} animate-pulse`}
                                        >
                                            <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* New UI Elements Section (replacing charts) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Top Selling Products */}
                        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 shadow-xl shadow-red-500/5">
                            <CardHeader className="border-b border-slate-700/50">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-white">Top Selling Products</CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-400 hover:text-red-300 hover:bg-red-500/15 transition-all duration-300"
                                    >
                                        View All
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                        <tr className="border-b border-slate-700/50">
                                            <th className="text-left p-4 font-medium text-slate-400 text-sm">PRODUCT</th>
                                            <th className="text-left p-4 font-medium text-slate-400 text-sm">SALES</th>
                                            <th className="text-left p-4 font-medium text-slate-400 text-sm">UNITS</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {topProducts.map((product, index) => (
                                            <tr
                                                key={index}
                                                className="border-b border-slate-700/50 last:border-b-0 hover:bg-slate-700/20 transition-colors"
                                            >
                                                <td className="p-4 text-sm text-white font-medium">{product.name}</td>
                                                <td className="p-4 text-sm text-slate-300">{product.sales}</td>
                                                <td className="p-4 text-sm text-white">{product.units}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent User Activity */}
                        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 shadow-xl shadow-red-500/5">
                            <CardHeader className="border-b border-slate-700/50">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-white">Recent User Activity</CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-400 hover:text-red-300 hover:bg-red-500/15 transition-all duration-300"
                                    >
                                        View All
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                {userActivity.map((activity, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <Activity className="w-5 h-5 text-red-400 flex-shrink-0" />
                                        <div className="flex-1">
                                            <p className="text-sm text-white">
                                                <span className="font-semibold">{activity.user}</span> {activity.action}
                                            </p>
                                            <p className="text-xs text-slate-400">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Orders Table & Quick Stats Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Recent Orders Table */}
                        <div className="lg:col-span-3">
                            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 shadow-xl shadow-red-500/5">
                                <CardHeader className="border-b border-slate-700/50">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-white">Recent Orders</CardTitle>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-400 hover:text-red-300 hover:bg-red-500/15 transition-all duration-300"
                                        >
                                            View All
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                            <tr className="border-b border-slate-700/50">
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">ORDER ID</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">CUSTOMER</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">STATUS</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">TOTAL</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">ACTIONS</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {recentOrders.map((order) => (
                                                <tr
                                                    key={order.id}
                                                    className="border-b border-slate-700/50 last:border-b-0 hover:bg-slate-700/20 transition-colors"
                                                >
                                                    <td className="p-4 text-sm text-white font-medium">{order.id}</td>
                                                    <td className="p-4 text-sm text-slate-300">{order.customer}</td>
                                                    <td className="p-4 text-sm">
                                                        <Badge variant="outline" className={`border ${getStatusBadgeColor(order.status)}`}>
                                                            {order.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="p-4 text-sm text-white font-medium">{order.total}</td>
                                                    <td className="p-4 text-sm text-slate-400">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-700/50">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent className="bg-slate-800 border-slate-700">
                                                                <DropdownMenuItem className="hover:bg-slate-700">View Details</DropdownMenuItem>
                                                                <DropdownMenuItem className="hover:bg-slate-700">Edit</DropdownMenuItem>
                                                                <DropdownMenuItem className="hover:bg-red-500/20 text-red-400">
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Quick Stats Sidebar */}
                        <div className="space-y-6">
                            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 shadow-xl shadow-red-500/5">
                                <CardHeader>
                                    <CardTitle className="text-white text-lg">Quick Stats</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400">Total Sales</span>
                                        <span className="text-white font-semibold">LKR 45,231</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400">Total Orders</span>
                                        <span className="text-white font-semibold">3,456</span>
                                    </div>
                                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white mt-4 shadow-lg shadow-red-500/40 hover:shadow-red-500/60 transition-all duration-300 transform hover:scale-105">
                                        Generate Report
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}