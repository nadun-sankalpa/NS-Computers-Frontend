"use client"

import { useState, useEffect } from "react"
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store'
import { selectAllUsersData } from '@/slices/selectors/userSelectors'
import { toast } from 'sonner'
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
    Loader2,
    Edit,
    Trash2,
    Check,
    X as XIcon,
    MoreHorizontal,
    RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Import Redux actions
import { fetchUsers, createUser, updateUser, deleteUser } from "@/slices/userSlice"

// User type for form state
type UserFormData = {
    _id?: string | number;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: "admin" | "customer";
    password?: string;
    confirmPassword?: string;
}

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
    const dispatch = useDispatch()
    const { users, isLoading, error } = useAppSelector(selectAllUsersData)

    // Form state
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedRole, setSelectedRole] = useState("all")
    const [currentUser, setCurrentUser] = useState<UserFormData | null>(null)
    const [formData, setFormData] = useState<UserFormData>({
        name: "",
        email: "",
        phone: "",
        address: "",
        role: "customer",
        password: Math.random().toString(36).slice(-8), // Auto-generate a default password
        confirmPassword: ""
    })
    const [formErrors, setFormErrors] = useState<Partial<UserFormData>>({})

    // Fetch users on component mount and log the users data
    useEffect(() => {
        console.log('AdminUsersPage: Fetching users...');
        dispatch(fetchUsers())
            .then((result) => {
                console.log('AdminUsersPage: Fetched users:', result.payload);
            })
            .catch((error) => {
                console.error('AdminUsersPage: Error fetching users:', error);
            });
    }, [dispatch])

    // Handle API errors
    useEffect(() => {
        if (error) {
            toast.error(`Error: ${error}`)
        }
    }, [error])

    // Filter users based on search and role
    const filteredUsers = users.filter((user: any) => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesRole = selectedRole === "all" || user.role === selectedRole
        return matchesSearch && matchesRole
    })

    // Handle form input changes
    const handleInputChange = (field: keyof UserFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
        // Clear error when user types
        if (formErrors[field as keyof typeof formErrors]) {
            setFormErrors(prev => ({
                ...prev,
                [field]: undefined
            }))
        }
    }

    // Validate form
    const validateForm = (): boolean => {
        console.log('Validating form with data:', formData);
        const errors: Partial<UserFormData> = {}
        
        // Validate name
        if (!formData.name?.trim()) {
            errors.name = "Name is required"
            console.log('Name validation failed: Name is required')
        }
        
        // Validate email
        if (!formData.email?.trim()) {
            errors.email = "Email is required"
            console.log('Email validation failed: Email is required')
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid"
            console.log('Email validation failed: Invalid email format')
        }
        
        // Validate phone
        if (!formData.phone?.trim()) {
            errors.phone = "Phone is required"
            console.log('Phone validation failed: Phone is required')
        }
        
        // Validate address
        if (!formData.address?.trim()) {
            errors.address = "Address is required"
            console.log('Address validation failed: Address is required')
        }
        
        // Only validate password for new users
        if (!currentUser?._id) {
            if (!formData.password) {
                errors.password = "Password is required"
                console.log('Password validation failed: Password is required')
            } else if (formData.password.length < 6) {
                errors.password = "Password must be at least 6 characters"
                console.log('Password validation failed: Too short')
            }
        }
        
        console.log('Validation errors:', errors);
        setFormErrors(errors)
        const isValid = Object.keys(errors).length === 0
        console.log('Form is valid:', isValid)
        return isValid
    }

    // Reset form
    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
            role: "customer",
            password: ""
        })
        setFormErrors({})
        setCurrentUser(null)
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted with data:', formData)
        
        if (!validateForm()) {
            console.log('Form validation failed')
            return
        }
        
        try {
            // Create a clean user data object without undefined or empty password for updates
            const userData = { ...formData }
            
            // For new users, ensure password is provided
            if (!currentUser?._id && !userData.password) {
                throw new Error("Password is required")
            }
            
            // Remove password field if it's empty (for updates)
            if (currentUser?._id && !userData.password) {
                delete userData.password
            }
            
            console.log('Sending user data to server:', userData)
            
            if (currentUser?._id) {
                // Update existing user
                const result = await dispatch(updateUser({ 
                    id: currentUser._id, 
                    updatedUserData: userData 
                })).unwrap()
                
                console.log('User update result:', result)
                toast.success("User updated successfully")
                
                // Close modal and reset form
                setIsEditModalOpen(false)
            } else {
                // Create new user
                const result = await dispatch(createUser(userData)).unwrap()
                console.log('User creation result:', result)
                toast.success("User created successfully")
                
                // Close modal and reset form
                setIsAddModalOpen(false)
            }
            
            // Reset form and refresh users list
            resetForm()
            await dispatch(fetchUsers())
            
        } catch (error: any) {
            console.error('Error in form submission:', error)
            const errorMessage = error?.message || error?.toString() || 'An unknown error occurred'
            console.log('Error details:', { error })
            toast.error(`Error: ${errorMessage}`)
        }
    }

    // Handle edit user
    const handleEditUser = (user: any) => {
        console.log('Editing user:', user)
        setCurrentUser(user)
        setFormData({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
            password: "" // Don't pre-fill password for security
        })
        setIsEditModalOpen(true)
    }
    
    // Test function to directly call the delete API
    const testDeleteUser = async (userId: string | number) => {
        try {
            console.log('=== Testing direct delete API call ===');
            console.log('User ID to delete:', userId);
            
            const url = `http://localhost:3000/api/users/${userId}`;
            console.log('Calling URL:', url);
            
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            
            console.log('Response status:', response.status);
            
            try {
                const data = await response.json();
                console.log('Response data:', data);
            } catch (e) {
                console.log('No JSON response, response text:', await response.text());
            }
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
        } catch (error) {
            console.error('Error in testDeleteUser:', error);
            throw error;
        }
    };
    
    // Handle delete button click
    const handleDeleteClick = (userId: string | number) => {
        console.log('Delete button clicked for user ID:', userId);
        console.log('Current users list:', users);
        
        const userToDelete = users.find((user: any) => user._id === userId);
        console.log('Found user to delete:', userToDelete);
        
        if (userToDelete) {
            console.log('Setting current user and opening delete modal');
            setCurrentUser(userToDelete);
            
            // Test the direct API call
            testDeleteUser(userId).catch(console.error);
            
            // Open the modal
            setIsDeleteModalOpen(true);
        } else {
            console.error('User not found with ID:', userId);
        }
    }

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

                    <div className="mt-8">
                        <Card className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 overflow-hidden">
                            <CardHeader className="border-b border-slate-700/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Users</h3>
                                        <p className="text-sm text-slate-400">Manage your users and their permissions</p>
                                    </div>
                                    <Button 
                                        onClick={() => setIsAddModalOpen(true)}
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add User
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-slate-700/50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">User</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Email</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Role</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Password</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/50">
                                            {users && users.length > 0 ? (
                                                users.map((user) => (
                                                    <tr key={user?._id || Math.random()} className="hover:bg-slate-800/50 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 h-10 w-10">
                                                                    <Avatar>
                                                                        <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                                                                        <AvatarFallback>
                                                                            {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                </div>
                                                                <div className="ml-4">
                                                                    <div className="text-sm font-medium text-white">{user?.name || 'No Name'}</div>
                                                                    <div className="text-sm text-slate-400">{user?.phone || 'No phone'}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-slate-300">{user?.email || 'No email'}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                user?.role === 'admin' 
                                                                    ? 'bg-purple-900/50 text-purple-300' 
                                                                    : 'bg-blue-900/50 text-blue-300'
                                                            }`}>
                                                                {user?.role || 'customer'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="text-sm text-slate-300 font-mono">
                                                                {user?.password ? '••••••••' : 'Not set'}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <div className="flex justify-end space-x-2">
                                                                <Button 
                                                                    variant="ghost" 
                                                                    size="sm" 
                                                                    className="text-slate-400 hover:text-white hover:bg-slate-700/50"
                                                                    onClick={() => user && handleEditUser(user)}
                                                                >
                                                                    <Edit className="w-4 h-4" />
                                                                </Button>
                                                                <Button 
                                                                    variant="ghost" 
                                                                    size="sm" 
                                                                    className="text-slate-400 hover:text-red-400 hover:bg-red-900/20"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        if (user) {
                                                                            console.log('Delete button clicked for user:', user);
                                                                            setCurrentUser(user);
                                                                            setIsDeleteModalOpen(true);
                                                                        }
                                                                    }}
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="px-6 py-4 text-center text-slate-400">
                                                        No users found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteModalOpen} onOpenChange={(open) => {
                console.log('Delete modal open state changed to:', open);
                setIsDeleteModalOpen(open);
                if (!open) setCurrentUser(null);
            }}>
                <DialogContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700/50 max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-white mb-2">
                            Delete User {currentUser?.name ? `(${currentUser.name})` : ''}
                        </DialogTitle>
                        <DialogDescription className="text-slate-300">
                            {currentUser?._id 
                                ? `Are you sure you want to delete ${currentUser.name || 'this user'}? This action cannot be undone.`
                                : 'No user selected for deletion.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            variant="outline"
                            onClick={() => {
                                console.log('Cancel button clicked');
                                setIsDeleteModalOpen(false);
                                setCurrentUser(null);
                            }}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log('Delete button clicked, currentUser:', currentUser);
                                if (currentUser?._id) {
                                    handleDeleteClick(currentUser._id);
                                } else {
                                    console.error('No user ID available for deletion');
                                    toast.error('No user selected for deletion');
                                }
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white"
                            disabled={!currentUser?._id}
                        >
                            {currentUser?._id ? 'Delete User' : 'No User Selected'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit User Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={(open) => {
                console.log('Edit modal open state changed to:', open);
                setIsEditModalOpen(open);
                if (!open) setCurrentUser(null);
            }}>
                <DialogContent className="bg-slate-800/95 backdrop-blur-xl border-slate-700/50 max-w-2xl shadow-2xl shadow-red-500/10">
                    <DialogHeader className="border-b border-slate-700/50 pb-4">
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-xl font-bold text-white">
                                {currentUser?._id ? 'Edit User' : 'Add New User'}
                            </DialogTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                    setCurrentUser(null);
                                }}
                                className="text-slate-400 hover:text-white hover:bg-red-500/10"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="py-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="edit-name" className="text-slate-300 font-medium">
                                        Full Name
                                    </Label>
                                    <Input
                                        id="edit-name"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/20 mt-2 text-white placeholder:text-slate-400 transition-all duration-300"
                                        placeholder="Enter full name"
                                    />
                                    {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="edit-email" className="text-slate-300 font-medium">
                                        Email Address
                                    </Label>
                                    <Input
                                        id="edit-email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/20 mt-2 text-white placeholder:text-slate-400 transition-all duration-300"
                                        placeholder="Enter email address"
                                    />
                                    {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="edit-password" className="text-slate-300 font-medium">
                                        New Password {!currentUser?._id && "*"}
                                    </Label>
                                    <Input
                                        id="edit-password"
                                        type="password"
                                        value={formData.password || ''}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/20 mt-2 text-white placeholder:text-slate-400 transition-all duration-300"
                                        placeholder="Leave blank to keep current password"
                                        required={!currentUser?._id}
                                    />
                                    {formErrors.password && <p className="text-red-400 text-xs mt-1">{formErrors.password}</p>}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="edit-phone" className="text-slate-300 font-medium">
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="edit-phone"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/20 mt-2 text-white placeholder:text-slate-400 transition-all duration-300"
                                        placeholder="Enter phone number"
                                    />
                                    {formErrors.phone && <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="edit-role" className="text-slate-300 font-medium">
                                        Role
                                    </Label>
                                    <Select
                                        value={formData.role}
                                        onValueChange={(value: "admin" | "customer") => handleInputChange('role', value)}
                                    >
                                        <SelectTrigger className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/20 mt-2 text-white">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700">
                                            <SelectItem value="admin" className="hover:bg-slate-700">Admin</SelectItem>
                                            <SelectItem value="customer" className="hover:bg-slate-700">Customer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="edit-address" className="text-slate-300 font-medium">
                                        Address
                                    </Label>
                                    <Textarea
                                        id="edit-address"
                                        value={formData.address}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/20 mt-2 text-white placeholder:text-slate-400 transition-all duration-300 min-h-[100px]"
                                        placeholder="Enter full address"
                                    />
                                    {formErrors.address && <p className="text-red-400 text-xs mt-1">{formErrors.address}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end space-x-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setIsEditModalOpen(false);
                                    setCurrentUser(null);
                                }}
                                className="border-slate-600 text-slate-300 hover:bg-slate-700/50"
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                className="bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
                            >
                                {currentUser?._id ? 'Update User' : 'Create User'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

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
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/20 mt-2 text-white placeholder:text-slate-400 transition-all duration-300"
                                        placeholder="Enter full name"
                                    />
                                    {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="email" className="text-slate-300 font-medium">
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/20 mt-2 text-white placeholder:text-slate-400 transition-all duration-300"
                                        placeholder="Enter email address"
                                    />
                                    {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="password" className="text-slate-300 font-medium">
                                        Password {!currentUser?._id && "*"}
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={formData.password || ''}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/20 mt-2 text-white placeholder:text-slate-400 transition-all duration-300"
                                        placeholder="Enter password"
                                        required={!currentUser?._id}
                                    />
                                    {formErrors.password && <p className="text-red-400 text-xs mt-1">{formErrors.password}</p>}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="phone" className="text-slate-300 font-medium">
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/20 mt-2 text-white placeholder:text-slate-400 transition-all duration-300"
                                        placeholder="Enter phone number"
                                    />
                                    {formErrors.phone && <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="role" className="text-slate-300 font-medium">
                                        User Role
                                    </Label>
                                    <Select 
                                        value={formData.role} 
                                        onValueChange={(value: 'admin' | 'customer') => handleInputChange('role', value)}
                                    >
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
                                        value={formData.address}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        className="bg-slate-700/50 border-slate-600 focus:border-red-500 focus:shadow-lg focus:shadow-red-500/20 mt-2 text-white placeholder:text-slate-400 min-h-[80px] transition-all duration-300"
                                        placeholder="Enter full address"
                                    />
                                    {formErrors.address && <p className="text-red-400 text-xs mt-1">{formErrors.address}</p>}
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
                        <Button 
                            className="bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save User
                                </>
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}