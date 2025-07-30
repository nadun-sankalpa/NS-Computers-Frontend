import { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItemFromCart, updateQuantity, selectCartItems, selectCartTotalAmount } from '@/slices/cartSlice';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const itemCount = items.reduce((total, item) => total + (item.quantity || 0), 0);

  console.log('Cart items:', items);

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeItemFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-black shadow-2xl border-l border-gray-800/80 backdrop-blur-sm overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-transparent via-black/90 to-transparent opacity-90"></div>
        <div className="flex h-full flex-col">
          <div className="relative flex items-center justify-between p-6 border-b border-gray-800 bg-black/80 overflow-hidden">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">YOUR CART</h2>
              <div className="absolute -bottom-1 left-0 h-0.5 w-12 bg-gradient-to-r from-red-500 to-transparent rounded-full"></div>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="relative z-10 p-2 text-gray-400 hover:text-red-400 transition-all duration-300"
            >
              <X className="h-5 w-5" />
            </motion.button>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPgo8cmVjdCB3aWR0aD0iNiIgaGVpZ2h0PSI2IiBmaWxsPSIjMDAwMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMNiA2Wk02IDBMMCA2WiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiMxMTEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center p-6">
                <ShoppingCart className="mb-4 h-16 w-16 text-red-200" />
                <h3 className="mb-2 text-xl font-medium text-gray-800">YOUR CART IS EMPTY</h3>
                <p className="mb-6 text-gray-500">Looks like you haven't added any items yet</p>
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="relative overflow-hidden px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow-lg hover:shadow-red-500/20 transition-all duration-300 w-full"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <span>Continue Shopping</span>
                    <svg className="w-4 h-4 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                </motion.button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="group relative flex items-center space-x-4 p-4 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl hover:border-red-500/50 transition-all duration-300 overflow-hidden">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 border-gray-800 group-hover:border-red-500/50 transition-all duration-300">
                      <img
                        src={item.image || '/images/network.jpg'}
                        alt={item.name || 'Product'}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/network.jpg';
                        }}
                      />
                    </div>
                    <div className="relative flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors truncate">{item.name}</h3>
                      <p className="text-sm font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                        LKR {typeof item.price === 'number' ? item.price.toLocaleString() : item.price}
                      </p>
                      <div className="mt-3 flex items-center space-x-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => { e.stopPropagation(); handleUpdateQuantity(item.id, item.quantity - 1); }}
                          className="p-1.5 text-gray-400 hover:text-white hover:bg-red-500/80 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-red-500/20"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </motion.button>
                        <span className="w-8 text-center text-sm font-medium text-gray-200">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => { e.stopPropagation(); handleUpdateQuantity(item.id, item.quantity + 1); }}
                          className="p-1.5 text-gray-400 hover:text-white hover:bg-red-500/80 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-red-500/20"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => { e.stopPropagation(); handleRemoveFromCart(item.id); }}
                          className="ml-auto p-1.5 text-gray-500 hover:text-red-400 hover:bg-gray-700/50 rounded-full transition-all duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative border-t border-gray-700/50 p-6 bg-gradient-to-b from-gray-900/80 to-gray-900/90 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI6IiBoZWlnaHQ9IjYiPgo8cmVjdCB3aWR0aD0iNiIgaGVpZ2h0PSI2IiBmaWxsPSIjMDAwMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMNiA2Wk02IDBMMCA2WiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiMxMTEiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>
              <div className="relative z-10 mb-6 flex items-center justify-between">
                <span className="text-gray-300 font-medium">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                    LKR {typeof totalAmount === 'number' ? totalAmount.toLocaleString() : '0'}
                  </span>
                </div>
              </div>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="relative w-full overflow-hidden bg-gradient-to-r from-red-500 to-red-600 py-3.5 px-6 rounded-lg text-sm font-medium text-white shadow-xl hover:shadow-red-500/20 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span className="mr-2">PROCEED TO CHECKOUT</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
