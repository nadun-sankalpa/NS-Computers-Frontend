"use client"

import { useState } from "react"
import {
    Search,
    Plus,
    Download,
    ShoppingCart,
    TrendingUp,
    Users,
    DollarSign,
    Save,
    Package,
    Bell,
    User,
    X,
    LogOut,
    Clock,
    Truck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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

export default function AdminOrdersPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("all")

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            <AnimatedBackground />

            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-full w-64 bg-slate-800/90 backdrop-blur-xl border-r border-slate-700/50 z-10">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/30 animate-pulse">
                            <ShoppingCart className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-red-400">NS Computers</span>
                    </div>

                    <nav className="space-y-2">
                        {[
                            { icon: TrendingUp, label: "Dashboard", active: false },
                            { icon: Users, label: "Users", active: false },
                            { icon: ShoppingCart, label: "Orders", active: true },
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
                                    placeholder="Search orders..."
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
                            <h1 className="text-3xl font-bold text-white mb-2">Order Management</h1>
                            <p className="text-slate-400">Track and manage customer orders</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                className="border-slate-600 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 bg-transparent text-white"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/40 hover:shadow-red-500/60 transform hover:scale-110 transition-all duration-300 animate-pulse">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Order
                                    </Button>
                                </DialogTrigger>
                            </Dialog>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
                            {
                                title: "Total Orders",
                                value: "3,247",
                                icon: ShoppingCart,
                                change: "18.5% from last week",
                                changeColor: "text-green-400",
                                iconColor: "text-red-400",
                                bgGlow: "shadow-red-500/15",
                            },
                            {
                                title: "Pending Orders",
                                value: "156",
                                icon: Clock,
                                change: "12 new today",
                                changeColor: "text-yellow-400",
                                iconColor: "text-yellow-400",
                                bgGlow: "shadow-yellow-500/15",
                            },
                            {
                                title: "Shipped Orders",
                                value: "2,891",
                                icon: Truck,
                                change: "15.2% from last week",
                                changeColor: "text-green-400",
                                iconColor: "text-cyan-400",
                                bgGlow: "shadow-cyan-500/15",
                            },
                            {
                                title: "Total Revenue",
                                value: "LKR 8,456,200",
                                icon: DollarSign,
                                change: "22.8% from last week",
                                changeColor: "text-green-400",
                                iconColor: "text-green-400",
                                bgGlow: "shadow-green-500/15",
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

                    {/* Orders Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Main Orders Table */}
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
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">USER ID</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">USERNAME</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">ITEMS</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">STATUS</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">TOTAL PRICE</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">ACTIONS</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {/* Empty table - no data */}
                                            <tr>
                                                <td colSpan={7} className="p-12 text-center">
                                                    <div className="flex flex-col items-center gap-4">
                                                        <ShoppingCart className="w-12 h-12 text-slate-600" />
                                                        <p className="text-slate-400">No orders found</p>
                                                        <p className="text-slate-500 text-sm">
                                                            Orders will appear here once customers start placing them
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
                            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 shadow-xl shadow-red-500/5">
                                <CardHeader>
                                    <CardTitle className="text-white text-lg">Order Analytics</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400">Today's Orders</span>
                                        <span className="text-white font-semibold">47</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400">Processing</span>
                                        <span className="text-yellow-400 font-semibold">23</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400">Cancelled</span>
                                        <span className="text-red-400 font-semibold">5</span>
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

            {/* Add Order Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700/50 max-w-3xl shadow-2xl shadow-red-500/15">
                    <DialogHeader className="border-b border-slate-700/50 pb-4">
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-xl font-bold text-white">Add New Order</DialogTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-slate-400 hover:text-white hover:bg-red-500/15"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </DialogHeader>

                    <div className="py-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="orderId" className="text-slate-300 font-medium">
                                        Order ID
                                    </Label>
                                    <Input
                                        id="orderId"
                                        type="number"
                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/25 mt-2 text-white placeholder:text-slate-400 transition-all duration-300"
                                        placeholder="Enter order ID"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="userId" className="text-slate-300 font-medium">
                                        User ID
                                    </Label>
                                    <Input
                                        id="userId"
                                        type="number"
                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/25 mt-2 text-white placeholder:text-slate-400 transition-all duration-300"
                                        placeholder="Enter user ID"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="username" className="text-slate-300 font-medium">
                                        Username
                                    </Label>
                                    <Input
                                        id="username"
                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/25 mt-2 text-white placeholder:text-slate-400 transition-all duration-300"
                                        placeholder="Enter username"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="totalPrice" className="text-slate-300 font-medium">
                                        Total Price (LKR)
                                    </Label>
                                    <Input
                                        id="totalPrice"
                                        type="number"
                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/25 mt-2 text-white placeholder:text-slate-400 transition-all duration-300"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="status" className="text-slate-300 font-medium">
                                        Order Status
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="bg-slate-700/50 border-slate-600 focus:border-red-500 mt-2 text-white">
                                            <SelectValue placeholder="Select order status" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700">
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="processing">Processing</SelectItem>
                                            <SelectItem value="shipped">Shipped</SelectItem>
                                            <SelectItem value="delivered">Delivered</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="items" className="text-slate-300 font-medium">
                                        Order Items (JSON Format)
                                    </Label>
                                    <Textarea
                                        id="items"
                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/25 mt-2 text-white placeholder:text-slate-400 min-h-[120px] transition-all duration-300"
                                        placeholder='[{"productId": 1, "name": "Product Name", "quantity": 2, "price": 1500}]'
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
                        <Button className="bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/40 hover:shadow-red-500/60 transform hover:scale-110 transition-all duration-300">
                            <Save className="w-4 h-4 mr-2" />
                            Save Order
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
