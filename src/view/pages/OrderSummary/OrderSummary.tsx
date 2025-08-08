import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { selectCartItems, selectTotalPrice } from '@/features/cart/cartSlice';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

export default function OrderSummary() {
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Example extra details (could be dynamic in real app)
  const orderDate = new Date().toLocaleString();
  const orderId = Math.floor(Math.random() * 900000 + 100000);
  const shipping = 0; // Free shipping
  const paymentMethod = 'Cash on Delivery';
  const address = user?.address || '123 Main Street, Colombo, Sri Lanka';

  const handleConfirm = () => {
    setTimeout(() => {
      navigate('/order-success');
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
        className="bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full p-10 border border-gray-700 relative overflow-hidden"
      >
        {/* Animated header */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: 'spring' }}
          className="text-4xl font-extrabold mb-2 text-center text-white tracking-tight drop-shadow-lg"
        >Order Summary</motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 text-center text-lg text-gray-300 font-medium"
        >Customer: <span className="font-semibold text-red-400">{user?.name || user?.username || 'Guest'}</span></motion.p>

        {/* Animated order details */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-gray-800 rounded-xl px-6 py-3 text-gray-300 shadow-md"
          >
            <span className="block text-xs uppercase tracking-wider text-gray-400">Order ID</span>
            <span className="font-bold text-lg text-red-400">#{orderId}</span>
          </motion.div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-gray-800 rounded-xl px-6 py-3 text-gray-300 shadow-md"
          >
            <span className="block text-xs uppercase tracking-wider text-gray-400">Order Date</span>
            <span className="font-semibold text-base">{orderDate}</span>
          </motion.div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="bg-gray-800 rounded-xl px-6 py-3 text-gray-300 shadow-md"
          >
            <span className="block text-xs uppercase tracking-wider text-gray-400">Payment</span>
            <span className="font-semibold text-base">{paymentMethod}</span>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 bg-gray-800 rounded-xl px-6 py-4 text-gray-300 shadow-md text-center"
        >
          <span className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Shipping Address</span>
          <span className="font-semibold text-base">{address}</span>
        </motion.div>

        {/* Animated cart items */}
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.10 }
            }
          }}
          className="mb-8 divide-y divide-gray-800"
        >
          {cartItems.map((item, idx) => (
            <motion.li
              key={item.id}
              variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }}
              className="py-4 flex justify-between items-center text-lg text-gray-200"
            >
              <span className="font-medium text-gray-100">{item.name} <span className="text-gray-400">x {item.quantity}</span></span>
              <span className="font-semibold text-red-400">${(item.price * item.quantity).toFixed(2)}</span>
            </motion.li>
          ))}
        </motion.ul>
        {/* Animated subtotal and confirm button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: 'spring' }}
          className="flex justify-between items-center font-bold text-2xl mb-6 px-2"
        >
          <span className="text-gray-300">Subtotal:</span>
          <span className="text-red-400">${totalPrice.toFixed(2)}</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-between items-center font-semibold text-lg mb-10 px-2"
        >
          <span className="text-gray-400">Shipping:</span>
          <span className="text-gray-200">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: 'spring', bounce: 0.4 }}
        >
          <Button
            onClick={handleConfirm}
            className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white py-4 rounded-xl font-bold text-xl shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Confirm Order
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 0.7 }}
          className="absolute -bottom-10 -right-10 w-60 h-60 bg-red-600 rounded-full blur-3xl opacity-20 pointer-events-none"
        />
        {/* Animated Background Orbs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.18, scale: 1.1, x: [0, 40, -40, 0], y: [0, -30, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-red-500 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.12, scale: 1.2, x: [0, -30, 30, 0], y: [0, 30, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
          className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-red-700 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.10, scale: 1.15, x: [0, 20, -20, 0], y: [0, 20, -20, 0] }}
          transition={{ duration: 17, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-red-400 rounded-full blur-3xl pointer-events-none"
        />
      </motion.div>
    </div>
  );
}
