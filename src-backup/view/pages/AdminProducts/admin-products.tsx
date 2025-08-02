"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import {
    Search,
    Plus,
    Download,
    Package,
    TrendingUp,
    ShoppingCart,
    DollarSign,
    Save,
    Heart,
    Bell,
    User,
    X,
    Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Animated background component
const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Floating particles */}
            {[...Array(15)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-pulse"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${3 + Math.random() * 2}s`,
                    }}
                />
            ))}

            {/* Gradient orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse" />
            <div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-teal-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
            />
        </div>
    )
}

export default function AdminProductPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            <AnimatedBackground />

            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-full w-64 bg-slate-800/90 backdrop-blur-xl border-r border-slate-700/50 z-10">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                            <Package className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-red-400">NS Computers</span>
                    </div>

                    <nav className="space-y-2">
                        {[
                            { icon: TrendingUp, label: "Dashboard", link: "/admin-dashboard" },
                            { icon: Users, label: "Users", link: "/admin/users" },
                            { icon: Package, label: "Products", link: "/admin/products" },
                            { icon: ShoppingCart, label: "Orders", link: "/admin/orders" },
                            { icon: DollarSign, label: "Analytics", link: "/admin/analytics" },
                        ].map((item) => {
                            const isActive = window.location.pathname === item.link;
                            return (
                                <Link
                                    key={item.label}
                                    to={item.link}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                                        isActive
                                            ? "bg-red-500/20 border border-red-500/30 text-red-400 shadow-lg shadow-red-500/10"
                                            : "hover:bg-slate-700/50 text-slate-300 hover:shadow-md"
                                    }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                            <p className="text-sm text-slate-300 mb-2">Need help?</p>
                            <p className="text-xs text-slate-400 mb-3">Our support team is here to help you</p>
                            <Button className="w-full bg-red-500 hover:bg-red-600 text-white text-sm">Contact Support</Button>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">Dark Mode</span>
                            <div className="w-10 h-6 bg-red-500 rounded-full relative">
                                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                            </div>
                        </div>
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
                                    className="pl-10 bg-slate-700/50 border-slate-600 focus:border-cyan-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="relative">
                                <Bell className="w-5 h-5" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2">
                                        <User className="w-5 h-5" />
                                        <span>Admin</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-slate-800 border-slate-700">
                                    <DropdownMenuItem className="hover:bg-slate-700">Profile</DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-slate-700">Settings</DropdownMenuItem>
                                    <DropdownMenuItem className="hover:bg-slate-700">Logout</DropdownMenuItem>
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
                                className="border-slate-600 hover:border-cyan-500 transition-colors bg-transparent text-white"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-red-500 hover:bg-red-600 text-white">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add New
                                    </Button>
                                </DialogTrigger>
                            </Dialog>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
                            {
                                title: "Total Revenue",
                                value: "LKR 4,956,000",
                                icon: DollarSign,
                                change: "12.5% from last week",
                                changeColor: "text-green-400",
                                iconColor: "text-cyan-400",
                            },
                            {
                                title: "Total Orders",
                                value: "1,245",
                                icon: ShoppingCart,
                                change: "8.2% from last week",
                                changeColor: "text-green-400",
                                iconColor: "text-cyan-400",
                            },
                            {
                                title: "Total Customers",
                                value: "845",
                                icon: Heart,
                                change: "2.1% from last week",
                                changeColor: "text-red-400",
                                iconColor: "text-purple-400",
                            },
                            {
                                title: "Total Products",
                                value: "1,289",
                                icon: Package,
                                change: "5.3% from last week",
                                changeColor: "text-green-400",
                                iconColor: "text-yellow-400",
                            },
                        ].map((stat) => (
                            <Card
                                key={stat.title}
                                className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
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
                                        <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center">
                                            <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Products Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Main Products Table */}
                        <div className="lg:col-span-3">
                            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
                                <CardHeader className="border-b border-slate-700/50">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-white">Products</CardTitle>
                                        <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                                            View All
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                            <tr className="border-b border-slate-700/50">
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">NAME</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">DESCRIPTION</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">PRICE</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">STOCK</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">CATEGORY</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">IMAGE URL</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">ACTIONS</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {/* Empty table - no data */}
                                            <tr>
                                                <td colSpan={7} className="p-12 text-center">
                                                    <div className="flex flex-col items-center gap-4">
                                                        <Package className="w-12 h-12 text-slate-600" />
                                                        <p className="text-slate-400">No products found</p>
                                                        <p className="text-slate-500 text-sm">
                                                            Products will appear here once you add them to your inventory
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Quick Stats Sidebar */}
                        <div className="space-y-6">
                            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
                                <CardHeader>
                                    <CardTitle className="text-white text-lg">Quick Stats</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400">Total Sales</span>
                                        <span className="text-white font-semibold">LKR 9,046,200</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400">Total Orders</span>
                                        <span className="text-white font-semibold">3,456</span>
                                    </div>
                                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white mt-4">Generate Report</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Product Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700/50 max-w-2xl">
                    <DialogHeader className="border-b border-slate-700/50 pb-4">
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-xl font-bold text-white">Add New Product</DialogTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-slate-400 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </DialogHeader>

                    <div className="py-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name" className="text-slate-300 font-medium">
                                        Product Name
                                    </Label>
                                    <Input
                                        id="name"
                                        className="bg-slate-700/50 border-slate-600 focus:border-cyan-500 mt-2 text-white placeholder:text-slate-400"
                                        placeholder="Enter product name"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="category" className="text-slate-300 font-medium">
                                        Category
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="bg-slate-700/50 border-slate-600 focus:border-cyan-500 mt-2 text-white">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700">
                                            <SelectItem value="laptops">Laptops</SelectItem>
                                            <SelectItem value="desktops">Desktops</SelectItem>
                                            <SelectItem value="monitors">Monitors</SelectItem>
                                            <SelectItem value="accessories">Accessories</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="price" className="text-slate-300 font-medium">
                                        Price (LKR)
                                    </Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        className="bg-slate-700/50 border-slate-600 focus:border-cyan-500 mt-2 text-white placeholder:text-slate-400"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="stock" className="text-slate-300 font-medium">
                                        Stock Quantity
                                    </Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        className="bg-slate-700/50 border-slate-600 focus:border-cyan-500 mt-2 text-white placeholder:text-slate-400"
                                        placeholder="0"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="imageUrl" className="text-slate-300 font-medium">
                                        Image URL (Optional)
                                    </Label>
                                    <Input
                                        id="imageUrl"
                                        className="bg-slate-700/50 border-slate-600 focus:border-cyan-500 mt-2 text-white placeholder:text-slate-400"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="description" className="text-slate-300 font-medium">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        className="bg-slate-700/50 border-slate-600 focus:border-cyan-500 mt-2 text-white placeholder:text-slate-400 min-h-[80px]"
                                        placeholder="Enter product description"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
                        <Button
                            variant="outline"
                            onClick={() => setIsAddModalOpen(false)}
                            className="border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white bg-transparent"
                        >
                            Cancel
                        </Button>
                        <Button className="bg-red-500 hover:bg-red-600 text-white">
                            <Save className="w-4 h-4 mr-2" />
                            Save Product
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
