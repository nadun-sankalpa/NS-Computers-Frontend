"use client"

import { useState, useEffect } from "react"
import {
    BarChart3,
    Users,
    ShoppingCart,
    DollarSign,
    Package,
    TrendingUp,
    TrendingDown,
    Eye,
    Edit,
    Plus,
    Search,
    Filter,
    Download,
    Bell,
    Settings,
    LogOut,
    Calendar,
    Clock,
    Star,
    AlertTriangle,
    CheckCircle,
    XCircle,
    MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardStats {
    totalRevenue: number
    totalOrders: number
    totalCustomers: number
    totalProducts: number
    revenueChange: number
    ordersChange: number
    customersChange: number
    productsChange: number
}

interface RecentOrder {
    id: string
    customer: string
    product: string
    amount: number
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
    date: string
}

interface TopProduct {
    id: string
    name: string
    sales: number
    revenue: number
    image: string
    category: string
}

interface Customer {
    id: string
    name: string
    email: string
    orders: number
    totalSpent: number
    lastOrder: string
    status: "active" | "inactive"
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("overview")
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedTimeRange, setSelectedTimeRange] = useState("7d")

    const [stats, setStats] = useState<DashboardStats>({
        totalRevenue: 2450000,
        totalOrders: 1234,
        totalCustomers: 5678,
        totalProducts: 156,
        revenueChange: 12.5,
        ordersChange: 8.2,
        customersChange: 15.3,
        productsChange: 3.1,
    })

    const recentOrders: RecentOrder[] = [
        {
            id: "ORD-001",
            customer: "Ravindu Perera",
            product: "MSI Gaming Laptop GF63",
            amount: 450000,
            status: "processing",
            date: "2024-01-15",
        },
        {
            id: "ORD-002",
            customer: "Sachini Fernando",
            product: "ASUS ROG Strix G15",
            amount: 380000,
            status: "shipped",
            date: "2024-01-15",
        },
        {
            id: "ORD-003",
            customer: "Kasun Silva",
            product: "HP Pavilion Gaming",
            amount: 280000,
            status: "delivered",
            date: "2024-01-14",
        },
        {
            id: "ORD-004",
            customer: "Priya Jayawardena",
            product: "Dell Inspiron 15",
            amount: 320000,
            status: "pending",
            date: "2024-01-14",
        },
        {
            id: "ORD-005",
            customer: "Nuwan Bandara",
            product: "Lenovo Legion 5",
            amount: 420000,
            status: "cancelled",
            date: "2024-01-13",
        },
    ]

    const topProducts: TopProduct[] = [
        {
            id: "PRD-001",
            name: "MSI Gaming Laptop GF63",
            sales: 45,
            revenue: 2025000,
            image: "/placeholder.svg?height=60&width=60",
            category: "Gaming Laptops",
        },
        {
            id: "PRD-002",
            name: "ASUS ROG Strix G15",
            sales: 38,
            revenue: 1444000,
            image: "/placeholder.svg?height=60&width=60",
            category: "Gaming Laptops",
        },
        {
            id: "PRD-003",
            name: "HP Pavilion Gaming",
            sales: 32,
            revenue: 896000,
            image: "/placeholder.svg?height=60&width=60",
            category: "Gaming Laptops",
        },
        {
            id: "PRD-004",
            name: "Dell Inspiron 15",
            sales: 28,
            revenue: 896000,
            image: "/placeholder.svg?height=60&width=60",
            category: "Ultrabooks",
        },
    ]

    const customers: Customer[] = [
        {
            id: "CUST-001",
            name: "Ravindu Perera",
            email: "ravindu@email.com",
            orders: 5,
            totalSpent: 1250000,
            lastOrder: "2024-01-15",
            status: "active",
        },
        {
            id: "CUST-002",
            name: "Sachini Fernando",
            email: "sachini@email.com",
            orders: 3,
            totalSpent: 890000,
            lastOrder: "2024-01-15",
            status: "active",
        },
        {
            id: "CUST-003",
            name: "Kasun Silva",
            email: "kasun@email.com",
            orders: 2,
            totalSpent: 600000,
            lastOrder: "2024-01-14",
            status: "active",
        },
        {
            id: "CUST-004",
            name: "Priya Jayawardena",
            email: "priya@email.com",
            orders: 1,
            totalSpent: 320000,
            lastOrder: "2024-01-14",
            status: "inactive",
        },
    ]

    const tabs = [
        { id: "overview", name: "Overview", icon: BarChart3 },
        { id: "orders", name: "Orders", icon: ShoppingCart },
        { id: "products", name: "Products", icon: Package },
        { id: "customers", name: "Customers", icon: Users },
        { id: "analytics", name: "Analytics", icon: TrendingUp },
    ]

    const getStatusColor = (status: string) => {
        switch (status) {
            case "pending":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
            case "processing":
                return "bg-blue-500/20 text-blue-400 border-blue-500/30"
            case "shipped":
                return "bg-purple-500/20 text-purple-400 border-purple-500/30"
            case "delivered":
                return "bg-green-500/20 text-green-400 border-green-500/30"
            case "cancelled":
                return "bg-red-500/20 text-red-400 border-red-500/30"
            case "active":
                return "bg-green-500/20 text-green-400 border-green-500/30"
            case "inactive":
                return "bg-gray-500/20 text-gray-400 border-gray-500/30"
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "pending":
                return <Clock className="w-4 h-4" />
            case "processing":
                return <Settings className="w-4 h-4 animate-spin" />
            case "shipped":
                return <Package className="w-4 h-4" />
            case "delivered":
                return <CheckCircle className="w-4 h-4" />
            case "cancelled":
                return <XCircle className="w-4 h-4" />
            case "active":
                return <CheckCircle className="w-4 h-4" />
            case "inactive":
                return <XCircle className="w-4 h-4" />
            default:
                return <AlertTriangle className="w-4 h-4" />
        }
    }

    useEffect(() => {
        // Simulate loading
        setTimeout(() => setIsLoading(false), 1500)
    }, [])

    const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
        <Card className="bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/20">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm font-medium">{title}</p>
                        <div className="flex items-center space-x-2 mt-2">
                            <p className="text-2xl font-bold text-white">
                                {typeof value === "number" ? value.toLocaleString() : value}
                            </p>
                            <div
                                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${
                                    change >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                                }`}
                            >
                                {change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                <span>{Math.abs(change)}%</span>
                            </div>
                        </div>
                    </div>
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-white text-lg">Loading Dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
                                nS-Computers Admin
                            </h1>
                            <div className="hidden md:flex items-center space-x-2 bg-gray-800 rounded-lg px-3 py-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <select
                                    value={selectedTimeRange}
                                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                                    className="bg-transparent text-white text-sm focus:outline-none"
                                >
                                    <option value="7d">Last 7 days</option>
                                    <option value="30d">Last 30 days</option>
                                    <option value="90d">Last 90 days</option>
                                    <option value="1y">Last year</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Bell className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400 bg-transparent"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-900/50 backdrop-blur-sm border-r border-gray-800 min-h-screen">
                    <nav className="p-4 space-y-2">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                                    activeTab === tab.id
                                        ? "bg-red-600 text-white shadow-lg shadow-red-500/25"
                                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <tab.icon className="w-5 h-5" />
                                <span className="font-medium">{tab.name}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {activeTab === "overview" && (
                        <div className="space-y-6">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatCard
                                    title="Total Revenue"
                                    value={`LKR ${stats.totalRevenue.toLocaleString()}`}
                                    change={stats.revenueChange}
                                    icon={DollarSign}
                                    color="from-green-500 to-green-600"
                                />
                                <StatCard
                                    title="Total Orders"
                                    value={stats.totalOrders}
                                    change={stats.ordersChange}
                                    icon={ShoppingCart}
                                    color="from-blue-500 to-blue-600"
                                />
                                <StatCard
                                    title="Total Customers"
                                    value={stats.totalCustomers}
                                    change={stats.customersChange}
                                    icon={Users}
                                    color="from-purple-500 to-purple-600"
                                />
                                <StatCard
                                    title="Total Products"
                                    value={stats.totalProducts}
                                    change={stats.productsChange}
                                    icon={Package}
                                    color="from-red-500 to-red-600"
                                />
                            </div>

                            {/* Charts and Recent Activity */}
                            <div className="grid lg:grid-cols-2 gap-6">
                                {/* Revenue Chart */}
                                <Card className="bg-gray-800/50 border-gray-700">
                                    <CardHeader>
                                        <CardTitle className="text-white flex items-center space-x-2">
                                            <BarChart3 className="w-5 h-5 text-red-500" />
                                            <span>Revenue Overview</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-64 bg-gray-900/50 rounded-lg flex items-center justify-center">
                                            <div className="text-center">
                                                <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                                <p className="text-gray-400">Chart visualization would go here</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Top Products */}
                                <Card className="bg-gray-800/50 border-gray-700">
                                    <CardHeader>
                                        <CardTitle className="text-white flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <Star className="w-5 h-5 text-red-500" />
                                                <span>Top Products</span>
                                            </div>
                                            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                                                View All
                                            </Button>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {topProducts.map((product, index) => (
                                                <div
                                                    key={product.id}
                                                    className="flex items-center space-x-4 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900/70 transition-colors"
                                                    style={{ animationDelay: `${index * 0.1}s` }}
                                                >
                                                    <img
                                                        src={product.image || "/placeholder.svg"}
                                                        alt={product.name}
                                                        className="w-12 h-12 rounded-lg object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <h4 className="text-white font-semibold text-sm">{product.name}</h4>
                                                        <p className="text-gray-400 text-xs">{product.category}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-white font-semibold text-sm">{product.sales} sold</p>
                                                        <p className="text-green-400 text-xs">LKR {product.revenue.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Recent Orders */}
                            <Card className="bg-gray-800/50 border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-white flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <ShoppingCart className="w-5 h-5 text-red-500" />
                                            <span>Recent Orders</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                                                <Download className="w-4 h-4 mr-2" />
                                                Export
                                            </Button>
                                            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                                                View All
                                            </Button>
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                            <tr className="border-b border-gray-700">
                                                <th className="text-left text-gray-400 font-medium py-3">Order ID</th>
                                                <th className="text-left text-gray-400 font-medium py-3">Customer</th>
                                                <th className="text-left text-gray-400 font-medium py-3">Product</th>
                                                <th className="text-left text-gray-400 font-medium py-3">Amount</th>
                                                <th className="text-left text-gray-400 font-medium py-3">Status</th>
                                                <th className="text-left text-gray-400 font-medium py-3">Date</th>
                                                <th className="text-left text-gray-400 font-medium py-3">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {recentOrders.map((order, index) => (
                                                <tr
                                                    key={order.id}
                                                    className="border-b border-gray-800 hover:bg-gray-900/30 transition-colors"
                                                    style={{ animationDelay: `${index * 0.1}s` }}
                                                >
                                                    <td className="py-4 text-white font-mono text-sm">{order.id}</td>
                                                    <td className="py-4 text-white">{order.customer}</td>
                                                    <td className="py-4 text-gray-300 text-sm">{order.product}</td>
                                                    <td className="py-4 text-green-400 font-semibold">LKR {order.amount.toLocaleString()}</td>
                                                    <td className="py-4">
                                                        <div
                                                            className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                                                order.status,
                                                            )}`}
                                                        >
                                                            {getStatusIcon(order.status)}
                                                            <span className="capitalize">{order.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 text-gray-400 text-sm">{order.date}</td>
                                                    <td className="py-4">
                                                        <div className="flex items-center space-x-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400 bg-transparent"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="border-gray-600 text-gray-300 hover:border-green-500 hover:text-green-400 bg-transparent"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === "orders" && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-white">Orders Management</h2>
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            placeholder="Search orders..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                                        />
                                    </div>
                                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                                        <Filter className="w-4 h-4 mr-2" />
                                        Filter
                                    </Button>
                                </div>
                            </div>

                            <Card className="bg-gray-800/50 border-gray-700">
                                <CardContent className="p-6">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                            <tr className="border-b border-gray-700">
                                                <th className="text-left text-gray-400 font-medium py-3">Order ID</th>
                                                <th className="text-left text-gray-400 font-medium py-3">Customer</th>
                                                <th className="text-left text-gray-400 font-medium py-3">Product</th>
                                                <th className="text-left text-gray-400 font-medium py-3">Amount</th>
                                                <th className="text-left text-gray-400 font-medium py-3">Status</th>
                                                <th className="text-left text-gray-400 font-medium py-3">Date</th>
                                                <th className="text-left text-gray-400 font-medium py-3">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {recentOrders.map((order, index) => (
                                                <tr
                                                    key={order.id}
                                                    className="border-b border-gray-800 hover:bg-gray-900/30 transition-colors"
                                                >
                                                    <td className="py-4 text-white font-mono text-sm">{order.id}</td>
                                                    <td className="py-4 text-white">{order.customer}</td>
                                                    <td className="py-4 text-gray-300 text-sm">{order.product}</td>
                                                    <td className="py-4 text-green-400 font-semibold">LKR {order.amount.toLocaleString()}</td>
                                                    <td className="py-4">
                                                        <div
                                                            className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                                                order.status,
                                                            )}`}
                                                        >
                                                            {getStatusIcon(order.status)}
                                                            <span className="capitalize">{order.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 text-gray-400 text-sm">{order.date}</td>
                                                    <td className="py-4">
                                                        <div className="flex items-center space-x-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400 bg-transparent"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="border-gray-600 text-gray-300 hover:border-green-500 hover:text-green-400 bg-transparent"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400 bg-transparent"
                                                            >
                                                                <MoreHorizontal className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === "customers" && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-white">Customer Management</h2>
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            placeholder="Search customers..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                                        />
                                    </div>
                                    <Button className="bg-red-600 hover:bg-red-700 text-white">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Customer
                                    </Button>
                                </div>
                            </div>

                            <Card className="bg-gray-800/50 border-gray-700">
                                <CardContent className="p-6">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                            <tr className="border-b border-gray-700">
                                                <th className="text-left text-gray-400 font-medium py-3">Customer</th>
                                                <th className="text-left text-gray-400 font-medium py-3">Email</th>
                                                <th className="text-left text-gray-400 font-medium py-3">Orders</th>
                                                <th className="text-left text-gray-400 font-medium py-3">Total Spent</th>
                                                <th className="text-left text-gray-400 font-medium py-3">Last Order</th>
                                                <th className="text-left text-gray-400 font-medium py-3">Status</th>
                                                <th className="text-left text-gray-400 font-medium py-3">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {customers.map((customer, index) => (
                                                <tr
                                                    key={customer.id}
                                                    className="border-b border-gray-800 hover:bg-gray-900/30 transition-colors"
                                                >
                                                    <td className="py-4 text-white font-semibold">{customer.name}</td>
                                                    <td className="py-4 text-gray-300">{customer.email}</td>
                                                    <td className="py-4 text-white">{customer.orders}</td>
                                                    <td className="py-4 text-green-400 font-semibold">
                                                        LKR {customer.totalSpent.toLocaleString()}
                                                    </td>
                                                    <td className="py-4 text-gray-400 text-sm">{customer.lastOrder}</td>
                                                    <td className="py-4">
                                                        <div
                                                            className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                                                customer.status,
                                                            )}`}
                                                        >
                                                            {getStatusIcon(customer.status)}
                                                            <span className="capitalize">{customer.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4">
                                                        <div className="flex items-center space-x-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="border-gray-600 text-gray-300 hover:border-blue-500 hover:text-blue-400 bg-transparent"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="border-gray-600 text-gray-300 hover:border-green-500 hover:text-green-400 bg-transparent"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
