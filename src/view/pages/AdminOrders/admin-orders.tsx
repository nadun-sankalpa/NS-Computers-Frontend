"use client"

import { useState, useEffect, FormEvent } from "react"
import { useDispatch } from "react-redux"
import {
    fetchOrders,
    createOrder,
    updateOrder,
    deleteOrder,
} from "@/slices/orderSlice"
import { useAppSelector } from "@/store";
import { selectAllOrdersData } from "@/slices/selectors/orderSelectors";
import type { AppDispatch, RootState } from "@/store/store"
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
import { format } from "date-fns"
import { toast } from "sonner"

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

// Helper function to get status badge styling
const getStatusBadge = (status: Order['status']) => {
    switch (status) {
        case "pending":
            return "bg-yellow-500/20 text-yellow-400";
        case "processing":
            return "bg-blue-500/20 text-blue-400";
        case "shipped":
            return "bg-cyan-500/20 text-cyan-400";
        case "delivered":
            return "bg-green-500/20 text-green-400";
        case "cancelled":
            return "bg-red-500/20 text-red-400";
        default:
            return "bg-gray-500/20 text-gray-400";
    }
};

export default function AdminOrdersPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { orders, isLoading, error } = useAppSelector(selectAllOrdersData);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // State for the new order form
    const [newOrder, setNewOrder] = useState({
        userId: "",
        username: "",
        items: "",
        status: "pending",
        totalPrice: "",
    });

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setNewOrder((prev) => ({ ...prev, [id]: value }));
    };

    const handleStatusChange = (value: string) => {
        setNewOrder((prev) => ({ ...prev, status: value }));
    };

    // Handle edit order
    const handleEditOrder = (order: Order) => {
        setSelectedOrder(order);
        setIsEditModalOpen(true);
    };

    // Handle delete order
    const handleDeleteOrder = (orderId: string | number) => {
        const orderToDelete = orders.find(order => order._id === orderId);
        if (orderToDelete) {
            setSelectedOrder(orderToDelete);
            setIsDeleteModalOpen(true);
        }
    };

    // Confirm delete order
    const confirmDeleteOrder = async () => {
        if (!selectedOrder) return;
        
        try {
            await dispatch(deleteOrder(selectedOrder._id)).unwrap();
            toast.success('Order deleted successfully');
            dispatch(fetchOrders());
        } catch (error) {
            toast.error(`Error deleting order: ${error}`);
        } finally {
            setIsDeleteModalOpen(false);
            setSelectedOrder(null);
        }
    };

    const handleSaveOrder = (e: FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!newOrder.items.trim()) {
            alert("Please enter order items");
            return;
        }

        // Prepare the order data with the correct item format
        const orderToCreate = {
            orderNumber: `ORD-${Date.now()}`,
            customerName: newOrder.username || `User ${newOrder.userId}`,
            customerEmail: `user${newOrder.userId}@example.com`,
            items: [{
                productId: Date.now().toString(),
                name: newOrder.items || "Custom Order Item",
                quantity: 1,
                price: Number(newOrder.totalPrice) || 0
            }],
            totalAmount: Number(newOrder.totalPrice) || 0,
            status: newOrder.status as Order['status'],
            shippingAddress: "123 Shipping Address",
            paymentMethod: "credit_card",
            paymentStatus: "pending" as const,
            userId: newOrder.userId,
            username: newOrder.username
        };
        
        // Validate required fields
        if (!orderToCreate.userId || !orderToCreate.username || !newOrder.items.trim()) {
            toast.error("User ID, Username, and Order Items are required");
            return;
        }

        console.log('Creating order with data:', orderToCreate);

        // Dispatch the createOrder thunk
        dispatch(createOrder(orderToCreate))
            .then((result) => {
                if (createOrder.fulfilled.match(result)) {
                    toast.success("Order created successfully!");
                    setIsAddModalOpen(false);
                    // Clear form
                    setNewOrder({
                        userId: "",
                        username: "",
                        items: "",
                        status: "pending",
                        totalPrice: "",
                    });
                    dispatch(fetchOrders()); // Refetch orders to update the list
                } else if (createOrder.rejected.match(result)) {
                    const errorMessage = result.payload || 'Failed to create order';
                    console.error('Order creation failed:', result.error);
                    toast.error(`Error: ${errorMessage}`);
                }
            })
            .catch((error) => {
                console.error('Unexpected error in order creation:', error);
                toast.error(`Unexpected error: ${error.message}`);
            });
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearchTerm = searchTerm === "" ||
            order._id.toString().includes(searchTerm) ||
            order.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;

        return matchesSearchTerm && matchesStatus;
    });

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
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
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

                                    <form onSubmit={handleSaveOrder} className="py-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="userId" className="text-slate-300 font-medium">
                                                        User ID
                                                    </Label>
                                                    <Input
                                                        id="userId"
                                                        type="number"
                                                        value={newOrder.userId}
                                                        onChange={handleInputChange}
                                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/25 mt-2 text-white placeholder:text-slate-400 transition-all duration-300"
                                                        placeholder="Enter user ID"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="username" className="text-slate-300 font-medium">
                                                        Username
                                                    </Label>
                                                    <Input
                                                        id="username"
                                                        value={newOrder.username}
                                                        onChange={handleInputChange}
                                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/25 mt-2 text-white placeholder:text-slate-400 transition-all duration-300"
                                                        placeholder="Enter username"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="totalPrice" className="text-slate-300 font-medium">
                                                        Total Price (LKR)
                                                    </Label>
                                                    <Input
                                                        id="totalPrice"
                                                        type="number"
                                                        value={newOrder.totalPrice}
                                                        onChange={handleInputChange}
                                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/25 mt-2 text-white placeholder:text-slate-400 transition-all duration-300"
                                                        placeholder="0.00"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="status" className="text-slate-300 font-medium">
                                                        Order Status
                                                    </Label>
                                                    <Select value={newOrder.status} onValueChange={handleStatusChange}>
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
                                                        value={newOrder.items}
                                                        onChange={handleInputChange}
                                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/25 mt-2 text-white placeholder:text-slate-400 min-h-[120px] transition-all duration-300"
                                                        placeholder='[{"name": "Product Name", "price": 1500}]'
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50 mt-6">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setIsAddModalOpen(false)}
                                                className="border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white bg-transparent"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/40 hover:shadow-red-500/60 transform hover:scale-105 transition-all duration-300"
                                            >
                                                <Save className="w-4 h-4 mr-2" />
                                                Save Order
                                            </Button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Static stats cards for now */}
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
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">CUSTOMER</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">ITEMS</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">STATUS</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">TOTAL</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">DATE</th>
                                                <th className="text-right p-4 font-medium text-slate-400 text-sm">ACTIONS</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {isLoading && (
                                                <tr>
                                                    <td colSpan={7} className="p-12 text-center text-slate-400">Loading orders...</td>
                                                </tr>
                                            )}
                                            {error && (
                                                <tr>
                                                    <td colSpan={7} className="p-12 text-center text-red-500">Error: {error}</td>
                                                </tr>
                                            )}
                                            {!isLoading && filteredOrders.length === 0 && (
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
                                            )}
                                            {filteredOrders.map((order) => (
                                                <tr key={order._id} className="border-b border-slate-700/50 last:border-0 hover:bg-slate-800/30 transition-colors duration-200">
                                                    <td className="p-4 text-sm text-slate-300 font-medium">#{String(order._id).substring(0, 8)}</td>
                                                    <td className="p-4 text-sm text-slate-300">{order.username || 'Guest'}</td>
                                                    <td className="p-4 text-sm text-slate-400">
                                                        {typeof order.items === 'string' ? (
                                                            <span className="block text-xs whitespace-pre-line">
                                                                {order.items}
                                                            </span>
                                                        ) : (
                                                            order.items?.map((item, index) => (
                                                                <span key={index} className="block text-xs">
                                                                    {item.name} x {item.quantity}
                                                                </span>
                                                            ))
                                                        )}
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(order.status)}`}>
                                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-sm text-white font-bold">LKR {order.totalPrice.toFixed(2)}</td>
                                                    <td className="p-4 text-sm text-slate-400">
                                                        {order.createdAt ? format(new Date(order.createdAt), "MMM d, yyyy") : 'N/A'}
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <div className="flex justify-end space-x-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/15 p-2 h-8 w-8"
                                                                onClick={() => handleEditOrder(order)}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                                                    <path d="m15 5 4 4" />
                                                                </svg>
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="text-red-400 hover:text-red-300 hover:bg-red-500/15 p-2 h-8 w-8"
                                                                onClick={() => handleDeleteOrder(order._id)}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M3 6h18" />
                                                                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                                                </svg>
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

                        {/* Quick Stats Sidebar */}
                        <div className="space-y-6">
                            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 shadow-xl shadow-red-500/5">
                                <CardHeader>
                                    <CardTitle className="text-white text-lg">Order Analytics</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400">Total Orders</span>
                                        <span className="text-white font-semibold">{orders.length}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400">Processing</span>
                                        <span className="text-yellow-400 font-semibold">{orders.filter(o => o.status === 'processing').length}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400">Cancelled</span>
                                        <span className="text-red-400 font-semibold">{orders.filter(o => o.status === 'cancelled').length}</span>
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

            {/* Edit Order Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700/50 max-w-3xl shadow-2xl shadow-red-500/15">
                    <DialogHeader className="border-b border-slate-700/50 pb-4">
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-xl font-bold text-white">Edit Order</DialogTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsEditModalOpen(false)}
                                className="text-slate-400 hover:text-white hover:bg-red-500/15"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </DialogHeader>
                    
                    {selectedOrder && (
                        <div className="py-4 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="edit-customer" className="text-slate-300 font-medium">
                                        Customer
                                    </Label>
                                    <Input
                                        id="edit-customer"
                                        value={selectedOrder.customerName}
                                        disabled
                                        className="bg-slate-700/50 border-slate-600 mt-2 text-white"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="edit-status" className="text-slate-300 font-medium">
                                        Status
                                    </Label>
                                    <Select
                                        value={selectedOrder.status}
                                        onValueChange={(value) => {
                                            setSelectedOrder({
                                                ...selectedOrder,
                                                status: value as Order['status']
                                            });
                                        }}
                                    >
                                        <SelectTrigger className="bg-slate-700/50 border-slate-600 mt-2 text-white">
                                            <SelectValue placeholder="Select status" />
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
                                <div className="md:col-span-2">
                                    <Label htmlFor="edit-items" className="text-slate-300 font-medium">
                                        Order Items
                                    </Label>
                                    <Textarea
                                        id="edit-items"
                                        value={Array.isArray(selectedOrder.items) 
                                            ? selectedOrder.items.map(item => `${item.name} x${item.quantity}`).join('\n')
                                            : selectedOrder.items}
                                        disabled
                                        className="bg-slate-700/50 border-slate-600 mt-2 text-white min-h-[100px]"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="edit-total" className="text-slate-300 font-medium">
                                        Total Amount
                                    </Label>
                                    <Input
                                        id="edit-total"
                                        value={selectedOrder.totalAmount}
                                        disabled
                                        className="bg-slate-700/50 border-slate-600 mt-2 text-white"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="edit-payment" className="text-slate-300 font-medium">
                                        Payment Status
                                    </Label>
                                    <Select
                                        value={selectedOrder.paymentStatus}
                                        onValueChange={(value) => {
                                            setSelectedOrder({
                                                ...selectedOrder,
                                                paymentStatus: value as 'pending' | 'paid' | 'failed' | 'refunded'
                                            });
                                        }}
                                    >
                                        <SelectTrigger className="bg-slate-700/50 border-slate-600 mt-2 text-white">
                                            <SelectValue placeholder="Payment status" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700">
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="paid">Paid</SelectItem>
                                            <SelectItem value="failed">Failed</SelectItem>
                                            <SelectItem value="refunded">Refunded</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            
                            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700/50">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-red-500 hover:bg-red-600 text-white"
                                    onClick={async () => {
                                        try {
                                            await dispatch(updateOrder({
                                                id: selectedOrder._id,
                                                updatedOrderData: {
                                                    status: selectedOrder.status,
                                                    paymentStatus: selectedOrder.paymentStatus
                                                }
                                            })).unwrap();
                                            toast.success('Order updated successfully');
                                            setIsEditModalOpen(false);
                                            dispatch(fetchOrders());
                                        } catch (error) {
                                            toast.error(`Error updating order: ${error}`);
                                        }
                                    }}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700/50 max-w-md shadow-2xl shadow-red-500/15">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-white">Delete Order</DialogTitle>
                        <p className="text-slate-400 text-sm">
                            Are you sure you want to delete this order? This action cannot be undone.
                        </p>
                    </DialogHeader>
                    <div className="flex justify-end space-x-3 pt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            className="bg-red-500 hover:bg-red-600 text-white"
                            onClick={confirmDeleteOrder}
                        >
                            Delete Order
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}