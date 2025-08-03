"use client"

import { useState } from "react"
import {
    Search,
    Plus,
    Download,
    Users,
    TrendingUp,
    ShoppingCart,
    DollarSign,
    Save,
    Package,
    Bell,
    User,
    X,
    Shield,
    UserCheck,
    LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Enhanced animated background with more red effects (no lines)
const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Floating particles with red variants */}
            {[...Array(25)].map((_, i) => (
                <div
                    key={i}
                    className={`absolute w-1 h-1 rounded-full animate-pulse ${
                        i % 3 === 0 ? "bg-red-400/40" : i % 3 === 1 ? "bg-cyan-400/30" : "bg-red-500/20"
                    }`}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 3}s`,
                    }}
                />
            ))}

            {/* Enhanced gradient orbs with red */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
            <div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-red-500/8 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
            />
            <div
                className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-red-600/5 to-orange-500/5 rounded-full blur-2xl animate-pulse"
                style={{ animationDelay: "2s" }}
            />

            {/* Floating red glows */}
            {[...Array(6)].map((_, i) => (
                <div
                    key={`glow-${i}`}
                    className="absolute w-32 h-32 bg-red-500/5 rounded-full blur-xl animate-pulse"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 4}s`,
                        animationDuration: `${4 + Math.random() * 2}s`,
                    }}
                />
            ))}
        </div>
    )
}

export default function AdminUsersPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedRole, setSelectedRole] = useState("all")

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            <AnimatedBackground />

            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-full w-64 bg-slate-800/90 backdrop-blur-xl border-r border-slate-700/50 z-10">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/25">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-red-400">NS Computers</span>
                    </div>

                    <nav className="space-y-2">
                        {[
                            { icon: TrendingUp, label: "Dashboard", active: false },
                            { icon: Users, label: "Users", active: true },
                            { icon: ShoppingCart, label: "Orders", active: false },
                            { icon: Package, label: "Products", active: false },
                            { icon: DollarSign, label: "Analytics", active: false },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer ${
                                    item.active
                                        ? "bg-red-500/20 border border-red-500/30 text-red-400 shadow-lg shadow-red-500/10"
                                        : "hover:bg-slate-700/50 text-slate-300 hover:shadow-md"
                                }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </div>
                        ))}
                    </nav>

                    <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-slate-700/50 rounded-lg p-4 mb-4 border border-red-500/10">
                            <p className="text-sm text-slate-300 mb-2">Need help?</p>
                            <p className="text-xs text-slate-400 mb-3">Our support team is here to help you</p>
                            <Button className="w-full bg-red-500 hover:bg-red-600 text-white text-sm shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300">
                                Contact Support
                            </Button>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-slate-400">Dark Mode</span>
                            <div className="w-10 h-6 bg-red-500 rounded-full relative shadow-lg shadow-red-500/30">
                                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <Button
                            variant="outline"
                            className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-all duration-300 bg-transparent"
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
                                    className="pl-10 bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/20 transition-all duration-300"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="relative hover:bg-red-500/10">
                                <Bell className="w-5 h-5" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50 animate-pulse"></div>
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2 hover:bg-red-500/10">
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
                            <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
                            <p className="text-slate-400">Manage system users and their permissions</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                className="border-slate-600 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 bg-transparent text-white"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </Button>
                            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add User
                                    </Button>
                                </DialogTrigger>
                            </Dialog>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
                            {
                                title: "Total Users",
                                value: "2,847",
                                icon: Users,
                                change: "15.2% from last week",
                                changeColor: "text-green-400",
                                iconColor: "text-red-400",
                                bgGlow: "shadow-red-500/10",
                            },
                            {
                                title: "Active Users",
                                value: "2,156",
                                icon: UserCheck,
                                change: "8.7% from last week",
                                changeColor: "text-green-400",
                                iconColor: "text-cyan-400",
                                bgGlow: "shadow-cyan-500/10",
                            },
                            {
                                title: "Admin Users",
                                value: "23",
                                icon: Shield,
                                change: "2 new this week",
                                changeColor: "text-green-400",
                                iconColor: "text-purple-400",
                                bgGlow: "shadow-purple-500/10",
                            },
                            {
                                title: "Customer Users",
                                value: "2,824",
                                icon: Package,
                                change: "12.8% from last week",
                                changeColor: "text-green-400",
                                iconColor: "text-yellow-400",
                                bgGlow: "shadow-yellow-500/10",
                            },
                        ].map((stat) => (
                            <Card
                                key={stat.title}
                                className={`bg-slate-800/50 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:shadow-xl ${stat.bgGlow}`}
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
                                            className={`w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center shadow-lg ${stat.bgGlow}`}
                                        >
                                            <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Users Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Main Users Table */}
                        <div className="lg:col-span-3">
                            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 shadow-xl">
                                <CardHeader className="border-b border-slate-700/50">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-white">System Users</CardTitle>
                                        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
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
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">EMAIL</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">ADDRESS</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">PHONE</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">ROLE</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">ACTIONS</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {/* Empty table - no data */}
                                            <tr>
                                                <td colSpan={6} className="p-12 text-center">
                                                    <div className="flex flex-col items-center gap-4">
                                                        <Users className="w-12 h-12 text-slate-600" />
                                                        <p className="text-slate-400">No users found</p>
                                                        <p className="text-slate-500 text-sm">
                                                            Users will appear here once you add them to the system
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
                            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 shadow-xl">
                                <CardHeader>
                                    <CardTitle className="text-white text-lg">User Analytics</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400">New Registrations</span>
                                        <span className="text-white font-semibold">156</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400">Active Sessions</span>
                                        <span className="text-white font-semibold">1,234</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400">Pending Approvals</span>
                                        <span className="text-red-400 font-semibold">8</span>
                                    </div>
                                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white mt-4 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300">
                                        Generate Report
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add User Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700/50 max-w-2xl shadow-2xl shadow-red-500/10">
                    <DialogHeader className="border-b border-slate-700/50 pb-4">
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-xl font-bold text-white">Add New User</DialogTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsAddModalOpen(false)}
                                className="text-slate-400 hover:text-white hover:bg-red-500/10"
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
                                        Full Name
                                    </Label>
                                    <Input
                                        id="name"
                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/20 mt-2 text-white placeholder:text-slate-400 transition-all duration-300"
                                        placeholder="Enter full name"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="email" className="text-slate-300 font-medium">
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/20 mt-2 text-white placeholder:text-slate-400 transition-all duration-300"
                                        placeholder="Enter email address"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="password" className="text-slate-300 font-medium">
                                        Password (Optional)
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/20 mt-2 text-white placeholder:text-slate-400 transition-all duration-300"
                                        placeholder="Enter password"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="phone" className="text-slate-300 font-medium">
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="phone"
                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/20 mt-2 text-white placeholder:text-slate-400 transition-all duration-300"
                                        placeholder="Enter phone number"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="role" className="text-slate-300 font-medium">
                                        User Role
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="bg-slate-700/50 border-slate-600 focus:border-red-500 mt-2 text-white">
                                            <SelectValue placeholder="Select user role" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700">
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="customer">Customer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="address" className="text-slate-300 font-medium">
                                        Address
                                    </Label>
                                    <Textarea
                                        id="address"
                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/20 mt-2 text-white placeholder:text-slate-400 min-h-[80px] transition-all duration-300"
                                        placeholder="Enter full address"
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
                        <Button className="bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300">
                            <Save className="w-4 h-4 mr-2" />
                            Save User
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
