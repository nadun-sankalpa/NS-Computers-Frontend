"use client"

import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
    Search,
    Plus,
    Save,
    X,
    Loader2,
    AlertCircle,
    RefreshCw,
    Package,
    Pencil,
    Trash2,
    Download,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    TrendingUp,
    Users,
    ShoppingCart,
    DollarSign,
    Bell,
    User,
    Heart,
    Edit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "@/slices/productSlice";
import type { ProductData } from "@/model/ProductData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the form data type
interface ProductFormData {
    id?: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl: string;
}

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
    // Redux hooks
    const dispatch = useAppDispatch();
    const { list: products, loading, error } = useAppSelector((state) => {
        console.log('🔍 [Redux] Current state:', {
            stateKeys: Object.keys(state),
            productState: state.product,
            productList: state.product.list,
            productListType: Array.isArray(state.product.list) ? 'array' : typeof state.product.list,
            productListLength: Array.isArray(state.product.list) ? state.product.list.length : 'N/A'
        });
        return state.product;
    });
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    // Log when products change
    useEffect(() => {
        console.log('🔄 Products updated:', {
            products,
            loading,
            error
        });
    }, [products, loading, error]);

    // Local state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDebug, setShowDebug] = useState(false);

    // Form state
    const [currentProduct, setCurrentProduct] = useState<Partial<ProductFormData>>({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "laptops",
        imageUrl: ""
    });

    // Calculate filtered products based on search and category
    const filteredProducts = useMemo(() => {
        if (!products) return [];

        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               product.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' ||
                                 product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);

    // Log Redux state changes
    useEffect(() => {
        console.log('🔄 Product state changed:', {
            loading,
            error,
            products: products, // Log the actual products array
            productCount: products?.length || 0,
            filteredProducts: filteredProducts, // Log the filtered products
            filteredCount: filteredProducts.length
        });

        // Log the Redux state structure
        if (products && products.length > 0) {
            console.log('📊 First product structure:', {
                keys: Object.keys(products[0]),
                values: Object.values(products[0]).map(v => ({
                    type: typeof v,
                    value: v
                }))
            });
        }
    }, [loading, error, products, filteredProducts]);

    // Debug function to log Redux state
    const logReduxState = () => {
        console.group('Redux State Dump');
        console.log('Products:', products);
        console.log('Filtered Products:', filteredProducts);
        console.log('Loading:', loading);
        console.log('Error:', error);
        console.groupEnd();
    };

    // Log when component renders
    console.log('🎬 Component render:', {
        products,
        filteredProducts,
        loading,
        error,
        productsType: typeof products,
        isArray: Array.isArray(products),
        keys: products ? Object.keys(products) : []
    });

    // Log Redux state on mount and when products change
    useEffect(() => {
        console.log('🔍 Products state changed:', {
            products,
            filteredProducts,
            loading,
            error
        });
    }, [products, filteredProducts, loading, error]);

    // Direct product fetch function
    const fetchProductsDirectly = async () => {
        try {
            console.log('🔄 [Direct Fetch] Fetching products directly...');
            const response = await fetch('http://localhost:3000/api/products/get-all-products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ [Direct Fetch] Products data:', data);

            // Try different response formats
            let productsData = [];
            if (Array.isArray(data)) {
                productsData = data;
            } else if (data && Array.isArray(data.data)) {
                productsData = data.data;
            } else if (data && Array.isArray(data.products)) {
                productsData = data.products;
            }

            console.log(`✅ [Direct Fetch] Found ${productsData.length} products`);

            // Update state directly
            dispatch({
                type: 'product/getAllProducts/fulfilled',
                payload: productsData
            });

            return productsData;

        } catch (error) {
            console.error('❌ [Direct Fetch] Error:', error);
            toast.error('Failed to load products');
            return [];
        }
    };

    // Fetch products on component mount
    useEffect(() => {
        if (isInitialLoad) {
            console.log('🔄 [Component] Fetching products...');

            // First try direct fetch
            fetchProductsDirectly()
                .then(products => {
                    if (!products || products.length === 0) {
                        // If direct fetch failed, try the Redux thunk
                        console.log('🔄 [Component] Trying Redux thunk...');
                        return dispatch(getAllProducts());
                    }
                    return products;
                })
                .then(() => {
                    console.log('✅ [Component] Products loaded successfully');
                    setIsInitialLoad(false);
                })
                .catch((err) => {
                    console.error('❌ [Component] Error loading products:', err);
                    setIsInitialLoad(false);
                });
        }
    }, [dispatch, isInitialLoad]);

    // Direct fetch function to test API
    const testDirectFetch = async () => {
        try {
            console.log('🔍 [Direct Fetch] Testing direct API call...');
            const token = localStorage.getItem('token');
            console.log('🔑 [Direct Fetch] Token:', token ? 'Exists' : 'Missing');

            const response = await fetch('http://localhost:3000/api/products/get-all-products', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('📡 [Direct Fetch] Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ [Direct Fetch] Error response:', errorText);
                return;
            }

            const data = await response.json();
            console.log('✅ [Direct Fetch] Success! Data:', {
                dataType: typeof data,
                isArray: Array.isArray(data),
                keys: Object.keys(data || {}),
                data: data
            });

            // Try to extract products
            let products = [];
            if (Array.isArray(data)) {
                products = data;
            } else if (data && Array.isArray(data.data)) {
                products = data.data;
            } else if (data && Array.isArray(data.products)) {
                products = data.products;
            }

            console.log(`📦 [Direct Fetch] Extracted ${products.length} products`);
            if (products.length > 0) {
                console.log('📝 [Direct Fetch] First product:', products[0]);
            }

        } catch (error) {
            console.error('❌ [Direct Fetch] Error:', error);
        }
    };

    // Debug: Log when filteredProducts changes
    useEffect(() => {
        console.log('🔄 filteredProducts updated:', {
            count: filteredProducts?.length,
            firstItem: filteredProducts?.[0]
        });

        // Run direct fetch test when component mounts
        testDirectFetch();
    }, [filteredProducts]);

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('🔄 [Component] Fetching products...');
                const result = await dispatch(getAllProducts()).unwrap();
                console.log('✅ [Component] Products loaded successfully:', result);
            } catch (error) {
                console.error('❌ [Component] Failed to fetch products:', error);
                toast.error('Failed to load products. Please check your connection and try again.');
            } finally {
                setIsInitialLoad(false);
            }
        };

        if (isInitialLoad) {
            fetchProducts();
        }

        // Set up polling every 30 seconds to keep data fresh
        const intervalId = setInterval(fetchProducts, 30000);
        return () => clearInterval(intervalId);
    }, [dispatch, isInitialLoad]);

    // Reset form
    const resetForm = () => {
        setCurrentProduct({
            name: "",
            description: "",
            price: 0,
            stock: 0,
            category: "laptops",
            imageUrl: ""
        });
        setIsEditMode(false);
    };

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCurrentProduct(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock'
                ? Number(value)
                : value
        }));
    };

    // Handle select change
    const handleSelectChange = (value: string) => {
        setCurrentProduct(prev => ({
            ...prev,
            category: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (isEditMode && currentProduct.id) {
                await dispatch(updateProduct(currentProduct as ProductData)).unwrap();
                toast.success("Product updated successfully");
            } else {
                await dispatch(createProduct(currentProduct)).unwrap();
                toast.success("Product created successfully");
            }
            setIsAddModalOpen(false);
            resetForm();
        } catch (error) {
            console.error("Error saving product:", error);
            toast.error("Failed to save product. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle edit product
    const handleEditProduct = (product: ProductData) => {
        setCurrentProduct({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: product.category,
            imageUrl: product.imageUrl || ""
        });
        setIsEditMode(true);
        setIsAddModalOpen(true);
    };

    // Handle delete product
    const handleDeleteProduct = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await dispatch(deleteProduct(id)).unwrap();
                toast.success("Product deleted successfully");
            } catch (error) {
                console.error("Error deleting product:", error);
                toast.error("Failed to delete product. Please try again.");
            }
        }
    };

    // Filtered products are calculated using useMemo above

    // Show loading state
    if (isInitialLoad) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                    <p className="text-slate-300">Loading products...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center p-6 bg-slate-800/80 rounded-lg">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Products</h2>
                    <p className="text-slate-300 mb-4">We couldn't load the products. {error}</p>
                    <Button
                        onClick={() => {
                            setIsInitialLoad(true);
                            dispatch(getAllProducts())
                                .unwrap()
                                .catch(() => {})
                                .finally(() => setIsInitialLoad(false));
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    // Get unique categories for filter - safely handle when products is undefined
    const categories = ["all"];
    if (products && Array.isArray(products)) {
        const validCategories = products
            .map(p => p?.category)
            .filter((category): category is string => Boolean(category));
        categories.push(...new Set(validCategories));
    }

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
                                    placeholder="Search products..."
                                    className="pl-10 bg-slate-700/50 border-slate-600 focus:border-cyan-500 transition-colors"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="w-[180px] bg-slate-700/50 border-slate-600 text-white">
                                    <SelectValue placeholder="Filter by category" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-700">
                                    {categories.map(category => (
                                        <SelectItem key={category} value={category}>
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
                            <Dialog open={isAddModalOpen} onOpenChange={(open) => {
                                if (!open) {
                                    resetForm();
                                }
                                setIsAddModalOpen(open);
                            }}>
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
                    {/* Status indicators removed */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Main Products Table */}
                        <div className="lg:col-span-3">
                            <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50">
                                <CardHeader className="border-b border-slate-700/50">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-white">Products</CardTitle>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-cyan-400 hover:text-cyan-300"
                                            onClick={() => {
                                                resetForm();
                                                setIsAddModalOpen(true);
                                            }}
                                        >
                                            <Plus className="w-4 h-4 mr-1" /> Add Product
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        {console.log('📊 Rendering table with products:', {
                                            loading,
                                            products,
                                            filteredProducts,
                                            productsLength: products?.length,
                                            filteredLength: filteredProducts?.length
                                        })}
                                        <table className="w-full">
                                            <thead>
                                            <tr className="border-b border-slate-700/50">
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">PRODUCT</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">DESCRIPTION</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">PRICE</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">STOCK</th>
                                                <th className="text-left p-4 font-medium text-slate-400 text-sm">CATEGORY</th>
                                                <th className="text-right p-4 font-medium text-slate-400 text-sm">ACTIONS</th>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            {loading === 'pending' ? (
                                                <tr>
                                                    <td colSpan={6} className="p-8 text-center">
                                                        <div className="flex justify-center">
                                                            <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : filteredProducts.length === 0 ? (
                                                <tr>
                                                    <td colSpan={6} className="p-12 text-center">
                                                        <div className="flex flex-col items-center gap-4">
                                                            <Package className="w-12 h-12 text-slate-600" />
                                                            <p className="text-slate-400">No products found</p>
                                                            <Button
                                                                variant="outline"
                                                                className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/10"
                                                                onClick={() => {
                                                                    resetForm();
                                                                    setIsAddModalOpen(true);
                                                                }}
                                                            >
                                                                <Plus className="w-4 h-4 mr-2" /> Add Your First Product
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredProducts.map((product) => (
                                                    <tr key={product.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition-colors">
                                                        <td className="p-4">
                                                            <div className="flex items-center gap-3">
                                                                {product.imageUrl && (
                                                                    <img
                                                                        src={product.imageUrl}
                                                                        alt={product.name}
                                                                        className="w-10 h-10 rounded-md object-cover"
                                                                    />
                                                                )}
                                                                <p className="font-medium text-white">{product.name}</p>
                                                            </div>
                                                        </td>
                                                        <td className="p-4 max-w-[400px]">
                                                            <p className="text-sm text-slate-300 line-clamp-3">
                                                                {product.description || 'No description available'}
                                                            </p>
                                                        </td>
                                                        <td className="p-4">
                                                            <span className="font-medium">LKR {product.price.toFixed(2)}</span>
                                                        </td>
                                                        <td className="p-4">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                product.stock > 10 ? 'bg-green-900/30 text-green-400' :
                                                                    product.stock > 0 ? 'bg-yellow-900/30 text-yellow-400' :
                                                                        'bg-red-900/30 text-red-400'
                                                            }`}>
                                                                {product.stock} in stock
                                                            </span>
                                                        </td>
                                                        <td className="p-4">
                                                            <span className="px-2 py-1 bg-slate-700/50 text-cyan-400 text-xs rounded-md">
                                                                {product.category}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-right">
                                                            <div className="flex justify-end gap-2">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="text-cyan-400 hover:bg-cyan-900/20"
                                                                    onClick={() => handleEditProduct(product)}
                                                                >
                                                                    <Edit className="w-4 h-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="text-red-400 hover:bg-red-900/20"
                                                                    onClick={() => product.id && handleDeleteProduct(product.id)}
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
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
            <Dialog open={isAddModalOpen} onOpenChange={(open) => {
                if (!open) {
                    resetForm();
                }
                setIsAddModalOpen(open);
            }}>
                <DialogContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700/50 max-w-2xl">
                    <form onSubmit={handleSubmit}>
                        <DialogHeader className="border-b border-slate-700/50 pb-4">
                            <div className="flex items-center justify-between">
                                <DialogTitle className="text-xl font-bold text-white">
                                    {isEditMode ? 'Edit Product' : 'Add New Product'}
                                </DialogTitle>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        resetForm();
                                        setIsAddModalOpen(false);
                                    }}
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
                                            Product Name *
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={currentProduct.name}
                                            onChange={handleInputChange}
                                            className="bg-slate-700/50 border-slate-600 focus:border-cyan-500 mt-2 text-white placeholder:text-slate-400"
                                            placeholder="Enter product name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="category" className="text-slate-300 font-medium">
                                            Category
                                        </Label>
                                        <Select
                                            value={currentProduct.category}
                                            onValueChange={handleSelectChange}
                                        >
                                            <SelectTrigger className="bg-slate-700/50 border-slate-600 focus:border-cyan-500 mt-2 text-white">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-800 border-slate-700">
                                                <SelectItem value="laptops">Laptops</SelectItem>
                                                <SelectItem value="desktops">Desktops</SelectItem>
                                                <SelectItem value="monitors">Monitors</SelectItem>
                                                <SelectItem value="accessories">Accessories</SelectItem>
                                                <SelectItem value="components">Components</SelectItem>
                                                <SelectItem value="peripherals">Peripherals</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="price" className="text-slate-300 font-medium">
                                            Price (LKR)
                                        </Label>
                                        <Input
                                            id="price"
                                            name="price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={currentProduct.price || ''}
                                            onChange={handleInputChange}
                                            className="bg-slate-700/50 border-slate-600 focus:border-cyan-500 mt-2 text-white placeholder:text-slate-400"
                                            placeholder="0.00"
                                            required
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
                                            name="stock"
                                            type="number"
                                            min="0"
                                            value={currentProduct.stock || ''}
                                            onChange={handleInputChange}
                                            className="bg-slate-700/50 border-slate-600 focus:border-cyan-500 mt-2 text-white placeholder:text-slate-400"
                                            placeholder="0"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="imageUrl" className="text-slate-300 font-medium">
                                            Image URL (Optional)
                                        </Label>
                                        <Input
                                            id="imageUrl"
                                            name="imageUrl"
                                            type="url"
                                            value={currentProduct.imageUrl || ''}
                                            onChange={handleInputChange}
                                            className="bg-slate-700/50 border-slate-600 focus:border-cyan-500 mt-2 text-white placeholder:text-slate-400"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        {currentProduct.imageUrl && (
                                            <div className="mt-2">
                                                <p className="text-xs text-slate-400 mb-1">Image Preview:</p>
                                                <img
                                                    src={currentProduct.imageUrl}
                                                    alt="Preview"
                                                    className="h-20 w-20 object-cover rounded-md border border-slate-600"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <Label htmlFor="description" className="text-slate-300 font-medium">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            value={currentProduct.description || ''}
                                            onChange={handleInputChange}
                                            className="bg-slate-700/50 border-slate-600 focus:border-cyan-500 mt-2 text-white placeholder:text-slate-400 min-h-[100px]"
                                            placeholder="Enter product description"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    resetForm();
                                    setIsAddModalOpen(false);
                                }}
                                className="border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white bg-transparent"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-red-500 hover:bg-red-600 text-white"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        {isEditMode ? 'Updating...' : 'Saving...'}
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        {isEditMode ? 'Update Product' : 'Save Product'}
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}