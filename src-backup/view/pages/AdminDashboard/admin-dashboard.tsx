"use client"

import { useState, useEffect } from "react" 
import { motion, AnimatePresence } from "framer-motion"
import { 
  FiHome, FiUsers, FiShoppingCart, FiDollarSign, FiPackage, 
  FiTrendingUp, FiTrendingDown, FiEye, FiEdit2, FiPlus, 
  FiFilter, FiDownload, FiMenu, FiX, FiSearch, 
  FiBell, FiUser, FiChevronDown, FiChevronUp, FiSettings, 
  FiHelpCircle, FiLogOut, FiPieChart, FiActivity, FiCalendar,
  FiMail, FiMessageSquare, FiBarChart2, FiMoreHorizontal,
  FiSun, FiMoon, FiRefreshCw
} from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@/contexts/ThemeContext"

// Types
type StatCardProps = {
  title: string
  value: string | number
  change: number
  icon: React.ReactNode
  color: string
}

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [timeRange, setTimeRange] = useState('week')
  const [stats, setStats] = useState([
    { id: 1, title: 'Total Revenue', value: '$24,780', change: 12.5, icon: <FiDollarSign className="w-6 h-6" />, color: 'bg-blue-100 text-blue-600' },
    { id: 2, title: 'Total Orders', value: '1,245', change: 8.2, icon: <FiShoppingCart className="w-6 h-6" />, color: 'bg-green-100 text-green-600' },
    { id: 3, title: 'Total Customers', value: '845', change: -2.1, icon: <FiUsers className="w-6 h-6" />, color: 'bg-purple-100 text-purple-600' },
    { id: 4, title: 'Total Products', value: '1,289', change: 5.3, icon: <FiPackage className="w-6 h-6" />, color: 'bg-yellow-100 text-yellow-600' },
  ])

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen)
  const navigate = useNavigate()
  const { theme, toggleTheme, isDark } = useTheme()
  
  // Add theme class to body
  useEffect(() => {
    document.body.className = isDark ? 'dark' : 'light'
  }, [isDark])

  // Load data on component mount
  useEffect(() => {
    // Any initialization code can go here
  }, [])

  const handleLogout = () => {
    // Handle logout
    navigate('/login')
  }

  const StatCard = ({ title, value, change, icon, color }: StatCardProps) => {
    // Define colors based on the card type
    let cardClass = 'bg-blue-100 text-blue-600';
    let iconBgClass = 'bg-blue-100';
    let iconTextClass = 'text-blue-600';
    
    if (color.includes('green')) {
      cardClass = 'bg-green-100 text-green-600';
      iconBgClass = 'bg-green-100';
      iconTextClass = 'text-green-600';
    } else if (color.includes('purple')) {
      cardClass = 'bg-purple-100 text-purple-600';
      iconBgClass = 'bg-purple-100';
      iconTextClass = 'text-purple-600';
    } else if (color.includes('yellow')) {
      cardClass = 'bg-yellow-100 text-yellow-600';
      iconBgClass = 'bg-yellow-100';
      iconTextClass = 'text-yellow-600';
    }
    
    return (
      <motion.div 
        className={`p-6 rounded-xl shadow-sm transition-colors duration-300 ${
          isDark 
            ? 'bg-gray-800 border border-gray-700' 
            : `${cardClass} bg-opacity-20`
        }`}
        whileHover={{ 
          y: -5, 
          boxShadow: isDark 
            ? '0 10px 25px -5px rgba(0, 0, 0, 0.2)' 
            : '0 10px 25px -5px rgba(0, 0, 0, 0.1)' 
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className={`text-sm font-medium ${
              isDark ? 'text-gray-300' : 'text-gray-500'
            }`}>
              {title}
            </p>
            <h3 className={`text-2xl font-bold mt-1 ${
              isDark ? 'text-white' : ''
            }`}>
              {value}
            </h3>
            <div className={`flex items-center mt-2 text-sm ${
              change >= 0 
                ? isDark ? 'text-green-400' : 'text-green-600' 
                : isDark ? 'text-red-400' : 'text-red-600'
            }`}>
              {change >= 0 
                ? <FiTrendingUp className="mr-1" /> 
                : <FiTrendingDown className="mr-1" />
              }
              <span>{Math.abs(change)}% from last {timeRange}</span>
            </div>
          </div>
          <div className={`p-3 rounded-lg ${
            isDark 
              ? `${iconTextClass} bg-opacity-10`
              : `${iconBgClass} ${iconTextClass} bg-opacity-30`
          }`}>
            {icon}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`flex h-screen transition-colors duration-300 ${
      isDark ? 'bg-black text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Add dark mode styles to the body */}
      <style jsx global>{`
        body {
          background-color: ${isDark ? '#000' : '#f9fafb'};
        }
      `}</style>
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 lg:hidden"
            onClick={toggleMobileSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-50 w-64 shadow-lg transform ${
          isDark ? 'bg-gray-900 border-r border-gray-800' : 'bg-white'
        } ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-all duration-300 ease-in-out`}
        initial={{ x: -256 }}
        animate={{ x: mobileSidebarOpen ? 0 : (sidebarOpen ? 0 : -256) }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between p-4">
            <h1 className={`text-xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>NS Computers</h1>
            <button 
              onClick={toggleSidebar}
              className={`p-1 rounded-lg lg:hidden ${
                isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
          
          <nav className="flex-1 mt-6 space-y-1">
            {[
              { name: 'Dashboard', icon: <FiHome />, active: activeTab === 'dashboard', link: '/admin-dashboard' },
              { name: 'Users', icon: <FiUsers />, active: activeTab === 'users', link: '/admin/users' },
              { name: 'Products', icon: <FiPackage />, active: activeTab === 'products', link: '/admin/products' },
              { name: 'Orders', icon: <FiShoppingCart />, active: activeTab === 'orders', link: '/admin/orders' },
              { name: 'Analytics', icon: <FiBarChart2 />, active: activeTab === 'analytics', link: '/admin/analytics' },
            ].map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (item.link) {
                    navigate(item.link);
                    setActiveTab(item.name.toLowerCase());
                  }
                }}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  item.active
                    ? isDark 
                      ? 'bg-red-900/30 text-red-400' 
                      : 'bg-red-50 text-red-600'
                    : isDark 
                      ? 'text-gray-300 hover:bg-gray-700/50' 
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </motion.button>
            ))}
          </nav>
          
          <div className="p-4 mt-auto">
            <div className={`p-3 rounded-lg ${
              isDark ? 'bg-gray-900/50 border border-gray-800' : 'bg-white shadow'
            }`}>
              <p className={`text-sm font-medium ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>Need help?</p>
              <p className={`text-xs mt-1 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>Our support team is here to help you</p>
              <button className={`mt-2 w-full py-2 text-sm font-medium text-white ${
                isDark ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700'
              } rounded-lg transition-colors`}>
                Contact Support
              </button>
            </div>
            
            {/* Theme Toggle */}
            <div className={`mt-4 flex items-center justify-between p-3 rounded-lg ${
              isDark ? 'bg-gray-900/50 border border-gray-800' : 'bg-gray-100'
            }`}>
              <span className={`text-sm font-medium ${
                isDark ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </span>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isDark ? 'bg-red-700' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    isDark ? 'translate-x-6' : 'translate-x-1'
                  }`}
                >
                  {isDark ? (
                    <FiMoon className="h-4 w-4 text-red-500 m-0.5" />
                  ) : (
                    <FiSun className="h-4 w-4 text-yellow-500 m-0.5" />
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:pl-64">
        {/* Top navigation */}
        <header className={`shadow-sm z-10 ${
          isDark ? 'bg-gray-800 border-b border-gray-700' : 'bg-white border-b border-gray-200'
        }`}>
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4 flex-1">
              <button 
                onClick={toggleMobileSidebar}
                className={`p-2 rounded-lg lg:hidden ${
                  isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <FiMenu className="w-6 h-6" />
              </button>
              
              <div className="relative flex-1 max-w-xl">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiSearch className={`w-5 h-5 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
                <input
                  type="text"
                  className={`w-full py-2 pl-10 pr-4 text-sm rounded-lg focus:ring-2 focus:outline-none transition-colors ${
                    isDark 
                      ? 'bg-gray-700 text-white placeholder-gray-400 focus:bg-gray-600 focus:ring-red-500' 
                      : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:bg-white focus:ring-red-500'
                  }`}
                  placeholder="Search..."
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className={`p-2 rounded-full ${
                isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'
              }`}>
                <FiBell className="w-5 h-5" />
              </button>
              
              <div className="hidden md:block h-8 w-px bg-gray-200 dark:bg-gray-700" />
              
              <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-gray-700' : 'bg-gray-200'
                } text-white`}>
                  <FiUser className="w-4 h-4" />
                </div>
                <span className={`hidden md:inline-block text-sm font-medium ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}>Admin</span>
                <FiChevronDown className={`hidden md:block w-4 h-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </button>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className={`flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 transition-colors duration-300 ${
          isDark ? 'bg-black' : 'bg-gray-50'
        }`}>
          <div className="flex flex-col space-y-6">
            {/* Page header */}
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Dashboard</h2>
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>Welcome back, Admin</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                  isDark 
                    ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                    : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                }`}>
                  <FiDownload className="mr-2 w-4 h-4" />
                  Export
                </button>
                <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  <FiPlus className="mr-2 w-4 h-4" />
                  Add New
                </button>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <StatCard key={stat.id} {...stat} />
              ))}
            </div>
            
            {/* Recent Activity and Quick Stats */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Recent Orders */}
              <div className={`p-6 rounded-xl shadow-sm ${
                isDark ? 'bg-gray-900/50 border border-gray-800' : 'bg-white'
              } lg:col-span-2`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-lg font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    Recent Orders
                  </h3>
                  <button className={`text-sm ${
                    isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                  }`}>
                    View All
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>Order ID</th>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>Customer</th>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>Status</th>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>Total</th>
                        <th className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${
                      isDark ? 'divide-gray-800' : 'divide-gray-200'
                    }`}>
                      {[
                        { id: 1, customer: 'John Doe', status: 'Completed', total: '$120.00' },
                        { id: 2, customer: 'Jane Smith', status: 'Processing', total: '$85.50' },
                        { id: 3, customer: 'Robert Johnson', status: 'Pending', total: '$220.00' },
                        { id: 4, customer: 'Emily Davis', status: 'Completed', total: '$175.25' },
                        { id: 5, customer: 'Michael Wilson', status: 'Failed', total: '$65.99' },
                      ].map((order) => (
                        <tr key={order.id} className={isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            #{order.id}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                            isDark ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            {order.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === 'Completed' 
                                ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                                : order.status === 'Processing'
                                  ? isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                                  : order.status === 'Pending'
                                    ? isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
                                    : isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {order.total}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className={`${
                              isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'
                            } mr-3`}>
                              <FiEye className="w-4 h-4" />
                            </button>
                            <button className={`${
                              isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
                            }`}>
                              <FiMoreHorizontal className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className={`p-6 rounded-xl shadow-sm ${
                isDark ? 'bg-gray-900/50 border border-gray-800' : 'bg-white'
              }`}>
                <h3 className={`text-lg font-semibold mb-6 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>Quick Stats</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Total Sales
                    </span>
                    <span className={`text-sm font-medium ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      $45,231
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Total Orders
                    </span>
                    <span className={`text-sm font-medium ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      3,456
                    </span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button className={`w-full px-4 py-2 text-sm font-medium text-white rounded-lg ${
                    isDark ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700'
                  } transition-colors`}>
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
