"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../../store/store';
import { fetchUsers, addUser, updateUser, deleteUser, selectAllUsers, getUserStatus } from '../../../slices/userSlice';
import type { User } from '../../../slices/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Search, Plus, Edit, Trash2, User as UserIcon, Shield, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function AdminUsersPage() {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector(selectAllUsers);
    const status = useSelector(getUserStatus);
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    
    // Form state
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: 'user',
        password: '',
        confirmPassword: ''
    });

    // Fetch users on component mount
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers());
        }
    }, [dispatch, status]);

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submit (add user)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        
        const { confirmPassword, ...userData } = formData;
        
        try {
            await dispatch(addUser(userData)).unwrap();
            setFormData({
                username: '',
                email: '',
                role: 'user',
                password: '',
                confirmPassword: ''
            });
            setIsAddModalOpen(false);
        } catch (error) {
            console.error('Failed to add user:', error);
        }
    };
    
    // Handle edit user
    const handleEdit = (user: User) => {
        setCurrentUser(user);
        setFormData({
            username: user.username,
            email: user.email,
            role: user.role,
            password: '',
            confirmPassword: ''
        });
        setIsEditModalOpen(true);
    };
    
    // Handle update user
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password && formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        
        const userData = { ...formData };
        if (!userData.password) {
            delete userData.password;
            delete userData.confirmPassword;
        }
        
        try {
            if (currentUser?._id) {
                await dispatch(updateUser({ id: currentUser._id, userData })).unwrap();
                setIsEditModalOpen(false);
                setCurrentUser(null);
                setFormData({
                    username: '',
                    email: '',
                    role: 'user',
                    password: '',
                    confirmPassword: ''
                });
            }
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };
    
    // Handle delete user
    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await dispatch(deleteUser(id)).unwrap();
            } catch (error) {
                console.error('Failed to delete user:', error);
            }
        }
    };
    
    // Filter users based on search term
    const filteredUsers = users.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get user role count
    const userCount = users.length;
    const adminCount = users.filter(user => user.role === 'admin').length;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-500">Manage user accounts and permissions</p>
            </header>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-2 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{userCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Admins</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{adminCount}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search users..."
                        className="w-full pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </div>

            {/* User Table */}
            <div className="bg-white rounded-lg border border-gray-200">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">USER</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">EMAIL</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">ROLE</th>
                            <th className="px-6 py-4 text-right text-sm font-medium text-gray-900">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-100 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                            <User className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{user.username}</p>
                                            <p className="text-xs text-gray-400">@{user.username.toLowerCase()}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        user.role === 'admin' 
                                            ? 'bg-blue-500/20 text-blue-400' 
                                            : 'bg-green-500/20 text-green-400'
                                    }`}>
                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button 
                                        onClick={() => handleEdit(user)}
                                        className="text-blue-400 hover:text-blue-300 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => user._id && handleDelete(user._id)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add User Modal */}
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select 
                                name="role" 
                                value={formData.role} 
                                onValueChange={(value) => setFormData({...formData, role: value as 'admin' | 'user'})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user">Customer</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                            <Button 
                                type="button" 
                                variant="outline"
                                onClick={() => setIsAddModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-red-500 hover:bg-red-600">
                                Add User
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            
            {/* Edit User Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[425px] bg-slate-800 border-slate-700">
                    <DialogHeader>
                        <DialogTitle className="text-white">Edit User</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdate}>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-username" className="text-slate-300">
                                    Username
                                </Label>
                                <Input
                                    id="edit-username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder="Enter username"
                                    className="bg-slate-700 border-slate-600 text-white"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-email" className="text-slate-300">
                                    Email
                                </Label>
                                <Input
                                    id="edit-email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter email"
                                    className="bg-slate-700 border-slate-600 text-white"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-role" className="text-slate-300">
                                    Role
                                </Label>
                                <Select 
                                    name="role" 
                                    value={formData.role} 
                                    onValueChange={(value) => setFormData({...formData, role: value})}
                                >
                                    <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-white">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700">
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="user">User</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-password" className="text-slate-300">
                                    New Password (leave blank to keep current)
                                </Label>
                                <Input
                                    id="edit-password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter new password"
                                    className="bg-slate-700 border-slate-600 text-white"
                                />
                            </div>
                            {formData.password && (
                                <div className="space-y-2">
                                    <Label htmlFor="edit-confirmPassword" className="text-slate-300">
                                        Confirm New Password
                                    </Label>
                                    <Input
                                        id="edit-confirmPassword"
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder="Confirm new password"
                                        className="bg-slate-700 border-slate-600 text-white"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end gap-3">
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
                            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                                Update User
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
