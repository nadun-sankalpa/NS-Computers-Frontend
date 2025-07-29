"use client"

import { useState, useEffect, useRef } from "react"
import {
    Search,
    Grid3X3,
    List,
    Star,
    Heart,
    ShoppingCart,
    Eye,
    Zap,
    Shield,
    Truck,
    Plus,
    Minus,
    X,
    Check,
    Cpu,
    HardDrive,
    MemoryStick,
    Monitor,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import ParticleBackground from "../../pages/home/particle-background"

interface ProductData {
    id: string
    name: string
    price: number
    originalPrice?: number
    currency: string
    image: string
    category: string
    brand: string
    rating: number
    reviews: number
    inStock: boolean
    isNew?: boolean
    isFeatured?: boolean
    discount?: number
    specs: {
        processor?: string
        ram?: string
        storage?: string
        graphics?: string
        display?: string
        battery?: string
    }
    features: string[]
    description: string
}

interface CartItem {
    product: ProductData
    quantity: number
}

interface ModifyCartProps {
    data: { product: ProductData }
    quantity: number
    onUpdateQuantity: (productId: string, quantity: number) => void
    onRemove: (productId: string) => void
}

function ModifyCart({ data, quantity, onUpdateQuantity, onRemove }: ModifyCartProps) {
    const [isAnimating, setIsAnimating] = useState(false)

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity <= 0) {
            onRemove(data.product.id)
            return
        }

        setIsAnimating(true)
        onUpdateQuantity(data.product.id, newQuantity)
        setTimeout(() => setIsAnimating(false), 300)
    }

    return (
        <div className="flex items-center space-x-2 bg-red-600 rounded-full px-3 py-1">
            <Button
                size="sm"
                variant="ghost"
                className="w-6 h-6 p-0 text-white hover:bg-red-700 rounded-full"
                onClick={() => handleQuantityChange(quantity - 1)}
            >
                <Minus className="w-3 h-3" />
            </Button>

            <span
                className={`text-white font-semibold min-w-[20px] text-center transition-all duration-300 ${
                    isAnimating ? "scale-125 text-yellow-300" : ""
                }`}
            >
        {quantity}
      </span>

            <Button
                size="sm"
                variant="ghost"
                className="w-6 h-6 p-0 text-white hover:bg-red-700 rounded-full"
                onClick={() => handleQuantityChange(quantity + 1)}
            >
                <Plus className="w-3 h-3" />
            </Button>

            <Button
                size="sm"
                variant="ghost"
                className="w-6 h-6 p-0 text-white hover:bg-red-700 rounded-full ml-2"
                onClick={() => onRemove(data.product.id)}
            >
                <X className="w-3 h-3" />
            </Button>
        </div>
    )
}

interface ProductProps {
    data: ProductData
    viewMode: "grid" | "list"
    cartItems: CartItem[]
    onAddToCart: (product: ProductData) => void
    onUpdateQuantity: (productId: string, quantity: number) => void
    onRemoveFromCart: (productId: string) => void
    onToggleWishlist: (productId: string) => void
    isInWishlist: boolean
}

function Product({
                     data,
                     viewMode,
                     cartItems,
                     onAddToCart,
                     onUpdateQuantity,
                     onRemoveFromCart,
                     onToggleWishlist,
                     isInWishlist,
                 }: ProductProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const [showQuickView, setShowQuickView] = useState(false)
    const [addToCartAnimation, setAddToCartAnimation] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)

    const cartItem = cartItems.find((item) => item.product.id === data.id)
    const isInCart = !!cartItem

    const handleAddToCart = () => {
        setAddToCartAnimation(true)
        onAddToCart(data)
        setTimeout(() => setAddToCartAnimation(false), 600)
    }

    const handleToggleWishlist = () => {
        onToggleWishlist(data.id)
    }

    const getSpecIcon = (specType: string) => {
        switch (specType) {
            case "processor":
                return <Cpu className="w-4 h-4" />
            case "ram":
                return <MemoryStick className="w-4 h-4" />
            case "storage":
                return <HardDrive className="w-4 h-4" />
            case "display":
                return <Monitor className="w-4 h-4" />
            default:
                return <Zap className="w-4 h-4" />
        }
    }

    if (viewMode === "list") {
        return (
            <Card
                ref={cardRef}
                className="group bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-500/20 overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                        {/* Product Image */}
                        <div className="relative w-32 h-32 flex-shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <img
                                src={data.image || "/placeholder.svg?height=128&width=128"}
                                alt={data.name}
                                className={`relative z-10 w-full h-full object-cover rounded-lg transition-all duration-500 ${
                                    isHovered ? "scale-110" : ""
                                } ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
                                onLoad={() => setIsImageLoaded(true)}
                            />

                            {/* Badges */}
                            <div className="absolute top-2 left-2 z-20 space-y-1">
                                {data.isNew && (
                                    <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
                                        NEW
                                    </div>
                                )}
                                {data.discount && (
                                    <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                        -{data.discount}%
                                    </div>
                                )}
                            </div>

                            {/* Wishlist Button */}
                            <Button
                                size="sm"
                                variant="ghost"
                                className={`absolute top-2 right-2 z-20 w-8 h-8 p-0 rounded-full transition-all duration-300 ${
                                    isInWishlist ? "bg-red-600 text-white hover:bg-red-700" : "bg-black/50 text-white hover:bg-red-600"
                                }`}
                                onClick={handleToggleWishlist}
                            >
                                <Heart className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`} />
                            </Button>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="text-red-400 text-sm font-medium">{data.brand}</span>
                                    <span className="text-gray-500">•</span>
                                    <span className="text-gray-400 text-sm">{data.category}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">{data.name}</h3>
                                <p className="text-gray-300 text-sm mt-2 line-clamp-2">{data.description}</p>
                            </div>

                            {/* Specs */}
                            <div className="grid grid-cols-2 gap-2">
                                {Object.entries(data.specs)
                                    .slice(0, 4)
                                    .map(([key, value]) => (
                                        <div key={key} className="flex items-center space-x-2 text-sm text-gray-300">
                                            {getSpecIcon(key)}
                                            <span className="capitalize">{key}:</span>
                                            <span className="text-white font-medium">{value}</span>
                                        </div>
                                    ))}
                            </div>

                            {/* Rating */}
                            <div className="flex items-center space-x-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${
                                                i < Math.floor(data.rating) ? "text-yellow-500 fill-current" : "text-gray-600"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-300 text-sm">({data.reviews} reviews)</span>
                            </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="text-right space-y-4">
                            <div>
                                <div className="text-2xl font-bold text-red-500">
                                    {data.currency} {data.price.toLocaleString()}
                                </div>
                                {data.originalPrice && (
                                    <div className="text-gray-500 line-through text-sm">
                                        {data.currency} {data.originalPrice.toLocaleString()}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                {isInCart ? (
                                    <ModifyCart
                                        data={{ product: data }}
                                        quantity={cartItem!.quantity}
                                        onUpdateQuantity={onUpdateQuantity}
                                        onRemove={onRemoveFromCart}
                                    />
                                ) : (
                                    <Button
                                        className={`w-full bg-red-600 hover:bg-red-700 text-white transform transition-all duration-300 ${
                                            addToCartAnimation ? "scale-95 bg-green-600" : "hover:scale-105"
                                        }`}
                                        onClick={handleAddToCart}
                                        disabled={!data.inStock}
                                    >
                                        {addToCartAnimation ? (
                                            <Check className="w-4 h-4 mr-2" />
                                        ) : (
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                        )}
                                        {addToCartAnimation ? "Added!" : data.inStock ? "Add to Cart" : "Out of Stock"}
                                    </Button>
                                )}

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400 bg-transparent"
                                    onClick={() => setShowQuickView(true)}
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    Quick View
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    // Grid View
    return (
        <Card
            ref={cardRef}
            className="group bg-gray-800/50 border-gray-700 hover:border-red-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-blue-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img
                        src={data.image || "/placeholder.svg?height=300&width=300"}
                        alt={data.name}
                        className={`relative z-10 w-full h-full object-cover transition-all duration-500 ${
                            isHovered ? "scale-110" : ""
                        } ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
                        onLoad={() => setIsImageLoaded(true)}
                    />

                    {/* Overlay Actions */}
                    <div
                        className={`absolute inset-0 bg-black/60 flex items-center justify-center space-x-2 transition-opacity duration-300 ${
                            isHovered ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <Button
                            size="sm"
                            className="bg-white/20 backdrop-blur-sm text-white hover:bg-red-600 border-0"
                            onClick={() => setShowQuickView(true)}
                        >
                            <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                            size="sm"
                            className={`backdrop-blur-sm border-0 transition-all duration-300 ${
                                isInWishlist ? "bg-red-600 text-white hover:bg-red-700" : "bg-white/20 text-white hover:bg-red-600"
                            }`}
                            onClick={handleToggleWishlist}
                        >
                            <Heart className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`} />
                        </Button>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 space-y-1">
                        {data.isNew && (
                            <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold animate-pulse">
                                NEW
                            </div>
                        )}
                        {data.discount && (
                            <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                -{data.discount}%
                            </div>
                        )}
                        {!data.inStock && (
                            <div className="bg-gray-600 text-white px-2 py-1 rounded-full text-xs font-semibold">OUT OF STOCK</div>
                        )}
                    </div>

                    {/* Stock Status */}
                    <div className="absolute bottom-3 right-3">
                        <div className={`w-3 h-3 rounded-full ${data.inStock ? "bg-green-500" : "bg-red-500"} animate-pulse`}></div>
                    </div>
                </div>

                {/* Product Info */}
                <CardContent className="p-4 space-y-3">
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-red-400 text-sm font-medium">{data.brand}</span>
                            <span className="text-gray-400 text-xs">{data.category}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2">
                            {data.name}
                        </h3>
                    </div>

                    {/* Key Specs */}
                    <div className="space-y-1">
                        {Object.entries(data.specs)
                            .slice(0, 2)
                            .map(([key, value]) => (
                                <div key={key} className="flex items-center space-x-2 text-xs text-gray-300">
                                    {getSpecIcon(key)}
                                    <span>{value}</span>
                                </div>
                            ))}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                        i < Math.floor(data.rating) ? "text-yellow-500 fill-current" : "text-gray-600"
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-gray-400 text-xs">({data.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="space-y-1">
                        <div className="text-xl font-bold text-red-500">
                            {data.currency} {data.price.toLocaleString()}
                        </div>
                        {data.originalPrice && (
                            <div className="text-gray-500 line-through text-sm">
                                {data.currency} {data.originalPrice.toLocaleString()}
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                        {isInCart ? (
                            <ModifyCart
                                data={{ product: data }}
                                quantity={cartItem!.quantity}
                                onUpdateQuantity={onUpdateQuantity}
                                onRemove={onRemoveFromCart}
                            />
                        ) : (
                            <Button
                                className={`w-full bg-red-600 hover:bg-red-700 text-white transform transition-all duration-300 ${
                                    addToCartAnimation ? "scale-95 bg-green-600" : "hover:scale-105"
                                }`}
                                onClick={handleAddToCart}
                                disabled={!data.inStock}
                            >
                                {addToCartAnimation ? <Check className="w-4 h-4 mr-2" /> : <ShoppingCart className="w-4 h-4 mr-2" />}
                                {addToCartAnimation ? "Added!" : data.inStock ? "Add to Cart" : "Out of Stock"}
                            </Button>
                        )}
                    </div>

                    {/* Features */}
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-400 pt-2 border-t border-gray-700">
                        <div className="flex items-center space-x-1">
                            <Shield className="w-3 h-3" />
                            <span>Warranty</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Truck className="w-3 h-3" />
                            <span>Free Delivery</span>
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}

export default function ProductsPage() {
    const [products, setProducts] = useState<ProductData[]>([])
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [wishlist, setWishlist] = useState<string[]>([])
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedBrand, setSelectedBrand] = useState("all")
    const [sortBy, setSortBy] = useState("name")
    const [priceRange, setPriceRange] = useState([0, 1000000])
    const [showFilters, setShowFilters] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Sample products data
    const sampleProducts: ProductData[] = [
        {
            id: "1",
            name: "MSI Gaming Laptop GF63 Thin",
            price: 450000,
            originalPrice: 500000,
            currency: "LKR",
            image: "/placeholder.svg?height=300&width=300&text=MSI+GF63",
            category: "Gaming Laptops",
            brand: "MSI",
            rating: 4.8,
            reviews: 124,
            inStock: true,
            isNew: true,
            discount: 10,
            specs: {
                processor: "Intel i7-11800H",
                ram: "16GB DDR4",
                storage: "512GB NVMe SSD",
                graphics: "RTX 3060 6GB",
                display: '15.6" FHD 144Hz',
                battery: "51Wh",
            },
            features: ["RGB Keyboard", "Cooler Boost 5", "Mystic Light"],
            description:
                "High-performance gaming laptop with RTX 3060 graphics and 144Hz display for smooth gaming experience.",
        },
        {
            id: "2",
            name: "ASUS ROG Strix G15",
            price: 380000,
            originalPrice: 420000,
            currency: "LKR",
            image: "/placeholder.svg?height=300&width=300&text=ASUS+ROG",
            category: "Gaming Laptops",
            brand: "ASUS",
            rating: 4.9,
            reviews: 89,
            inStock: true,
            isFeatured: true,
            discount: 9,
            specs: {
                processor: "AMD Ryzen 7 5800H",
                ram: "16GB DDR4",
                storage: "1TB NVMe SSD",
                graphics: "RTX 3050 Ti 4GB",
                display: '15.6" FHD 144Hz',
                battery: "90Wh",
            },
            features: ["Aura Sync RGB", "ROG Keystone II", "Intelligent Cooling"],
            description:
                "Powerful gaming laptop with AMD Ryzen processor and advanced cooling system for extended gaming sessions.",
        },
        {
            id: "3",
            name: "HP Pavilion Gaming 15",
            price: 280000,
            originalPrice: 320000,
            currency: "LKR",
            image: "/placeholder.svg?height=300&width=300&text=HP+Pavilion",
            category: "Gaming Laptops",
            brand: "HP",
            rating: 4.6,
            reviews: 156,
            inStock: true,
            discount: 12,
            specs: {
                processor: "Intel i5-11400H",
                ram: "8GB DDR4",
                storage: "512GB NVMe SSD",
                graphics: "GTX 1650 4GB",
                display: '15.6" FHD IPS',
                battery: "52.5Wh",
            },
            features: ["Backlit Keyboard", "B&O Audio", "Fast Charge"],
            description: "Affordable gaming laptop perfect for casual gaming and productivity tasks with solid performance.",
        },
        {
            id: "4",
            name: "Dell Inspiron 15 3000",
            price: 320000,
            currency: "LKR",
            image: "/placeholder.svg?height=300&width=300&text=Dell+Inspiron",
            category: "Ultrabooks",
            brand: "Dell",
            rating: 4.4,
            reviews: 78,
            inStock: false,
            specs: {
                processor: "Intel i5-1135G7",
                ram: "8GB DDR4",
                storage: "256GB NVMe SSD",
                graphics: "Intel Iris Xe",
                display: '15.6" FHD',
                battery: "41Wh",
            },
            features: ["Fingerprint Reader", "ExpressCharge", "ComfortView"],
            description: "Reliable ultrabook for everyday computing with Intel Iris Xe graphics and fast SSD storage.",
        },
        {
            id: "5",
            name: "Lenovo Legion 5 Pro",
            price: 420000,
            currency: "LKR",
            image: "/placeholder.svg?height=300&width=300&text=Lenovo+Legion",
            category: "Gaming Laptops",
            brand: "Lenovo",
            rating: 4.7,
            reviews: 92,
            inStock: true,
            isNew: true,
            specs: {
                processor: "AMD Ryzen 7 5800H",
                ram: "16GB DDR4",
                storage: "512GB NVMe SSD",
                graphics: "RTX 3070 8GB",
                display: '16" QHD 165Hz',
                battery: "80Wh",
            },
            features: ["Legion Coldfront 4.0", "RGB Keyboard", "Nahimic Audio"],
            description: "Premium gaming laptop with QHD display and RTX 3070 graphics for ultimate gaming performance.",
        },
        {
            id: "6",
            name: "Acer Predator Helios 300",
            price: 390000,
            currency: "LKR",
            image: "/placeholder.svg?height=300&width=300&text=Acer+Predator",
            category: "Gaming Laptops",
            brand: "Acer",
            rating: 4.5,
            reviews: 67,
            inStock: true,
            specs: {
                processor: "Intel i7-11800H",
                ram: "16GB DDR4",
                storage: "512GB NVMe SSD",
                graphics: "RTX 3060 6GB",
                display: '15.6" FHD 144Hz',
                battery: "59Wh",
            },
            features: ["PredatorSense", "4th Gen AeroBlade 3D", "DTS:X Ultra"],
            description: "Aggressive gaming laptop design with powerful cooling system and high refresh rate display.",
        },
    ]

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setProducts(sampleProducts)
            setIsLoading(false)
        }, 1500)
    }, [])

    const categories = ["all", "Gaming Laptops", "Ultrabooks", "Workstations"]
    const brands = ["all", "MSI", "ASUS", "HP", "Dell", "Lenovo", "Acer"]
    const sortOptions = [
        { value: "name", label: "Name A-Z" },
        { value: "price-low", label: "Price: Low to High" },
        { value: "price-high", label: "Price: High to Low" },
        { value: "rating", label: "Highest Rated" },
        { value: "newest", label: "Newest First" },
    ]

    const filteredProducts = products
        .filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
            const matchesBrand = selectedBrand === "all" || product.brand === selectedBrand
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

            return matchesSearch && matchesCategory && matchesBrand && matchesPrice
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "price-low":
                    return a.price - b.price
                case "price-high":
                    return b.price - a.price
                case "rating":
                    return b.rating - a.rating
                case "newest":
                    return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
                default:
                    return a.name.localeCompare(b.name)
            }
        })

    const handleAddToCart = (product: ProductData) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id)
            if (existing) {
                return prev.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
            }
            return [...prev, { product, quantity: 1 }]
        })
    }

    const handleUpdateQuantity = (productId: string, quantity: number) => {
        setCartItems((prev) => prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
    }

    const handleRemoveFromCart = (productId: string) => {
        setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
    }

    const handleToggleWishlist = (productId: string) => {
        setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black pt-32">
                <ParticleBackground />
                <div className="container mx-auto px-4 py-20">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-white text-lg">Loading Products...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white pt-32">
            <ParticleBackground />

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-6xl lg:text-8xl font-bold bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent animate-pulse mb-4">
                        OUR PRODUCTS
                    </h1>
                    <p className="text-xl text-red-400 font-semibold tracking-wider">DISCOVER PREMIUM GAMING LAPTOPS</p>
                </div>

                {/* Filters and Search */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-gray-700">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                            />
                        </div>

                        {/* Filters */}
                        <div className="flex items-center space-x-4">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-sm"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category === "all" ? "All Categories" : category}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                                className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-sm"
                            >
                                {brands.map((brand) => (
                                    <option key={brand} value={brand}>
                                        {brand === "all" ? "All Brands" : brand}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-sm"
                            >
                                {sortOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            {/* View Mode Toggle */}
                            <div className="flex items-center space-x-2 bg-gray-800 rounded-md p-1">
                                <Button
                                    size="sm"
                                    variant={viewMode === "grid" ? "default" : "ghost"}
                                    className={`p-2 ${viewMode === "grid" ? "bg-red-600" : "text-gray-400"}`}
                                    onClick={() => setViewMode("grid")}
                                >
                                    <Grid3X3 className="w-4 h-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant={viewMode === "list" ? "default" : "ghost"}
                                    className={`p-2 ${viewMode === "list" ? "bg-red-600" : "text-gray-400"}`}
                                    onClick={() => setViewMode("list")}
                                >
                                    <List className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-300">
                        Showing {filteredProducts.length} of {products.length} products
                    </p>
                    <div className="text-sm text-gray-400">
                        Cart: {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                    </div>
                </div>

                {/* Products Grid */}
                <div
                    className={`grid gap-6 ${
                        viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                    }`}
                >
                    {filteredProducts.map((product, index) => (
                        <div
                            key={product.id}
                            className="opacity-0 animate-fadeInUp"
                            style={{
                                animationDelay: `${index * 0.1}s`,
                                animationFillMode: "forwards",
                            }}
                        >
                            <Product
                                data={product}
                                viewMode={viewMode}
                                cartItems={cartItems}
                                onAddToCart={handleAddToCart}
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemoveFromCart={handleRemoveFromCart}
                                onToggleWishlist={handleToggleWishlist}
                                isInWishlist={wishlist.includes(product.id)}
                            />
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-white mb-2">No products found</h3>
                        <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
                        <Button
                            onClick={() => {
                                setSearchTerm("")
                                setSelectedCategory("all")
                                setSelectedBrand("all")
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </div>

            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
        </div>
    )
}
