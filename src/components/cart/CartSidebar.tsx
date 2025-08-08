import { X, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { selectCartItems, selectTotalPrice, updateQuantity, removeItem } from "@/features/cart/cartSlice";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type CartSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
      navigate('/order-summary');
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out translate-x-0 border-l border-gray-700">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5 text-red-400" />
            <h2 className="text-xl font-bold text-white">Your Cart</h2>
            {cartItems.length > 0 && (
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto h-12 w-12 text-gray-600 mb-4" />
              <p className="text-gray-400 mb-6">Your cart is empty</p>
              <Button 
                onClick={onClose}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="group relative p-3 rounded-lg bg-gray-800 hover:bg-gray-750 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className="relative flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded border border-gray-700"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white truncate">{item.name}</h3>
                      <p className="text-sm text-red-400">${item.price.toFixed(2)}</p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center mt-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(item.id, Math.max(1, item.quantity - 1));
                          }}
                          className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        
                        <span className="mx-2 w-6 text-center text-white">
                          {item.quantity}
                        </span>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(item.id, item.quantity + 1);
                          }}
                          className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      
                      <p className="mt-1 text-sm font-medium text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    
                    {/* Remove Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveItem(item.id);
                      }}
                      className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                      aria-label="Remove item"
                      title="Remove from cart"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-800 bg-gray-800">
            <div className="flex justify-between text-lg font-semibold mb-4">
              <span className="text-gray-300">Total:</span>
              <span className="text-white">${totalPrice.toFixed(2)}</span>
            </div>
            <Button
              onClick={handleCheckout}
              disabled={cartItems.length === 0 || loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </Button>
            <button 
              onClick={onClose}
              className="w-full mt-2 text-center text-sm text-gray-400 hover:text-white transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
