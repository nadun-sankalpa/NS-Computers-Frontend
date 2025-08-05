import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCartTotalQuantity } from '@/slices/cartSlice';
import { useState, useEffect } from 'react';

export function CartButton({ onClick }: { onClick: () => void }) {
  const itemCount = useSelector(selectCartTotalQuantity);
  const [isMounted, setIsMounted] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  // Set mounted state to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Only show badge after component is mounted and we have items
  useEffect(() => {
    if (isMounted && itemCount > 0) {
      setShowBadge(true);
    } else {
      setShowBadge(false);
    }
  }, [itemCount, isMounted]);

  // Don't render anything on the server or if not mounted yet
  if (!isMounted) {
    return (
      <button 
        className="relative p-2 text-gray-400 hover:text-white focus:outline-none"
        aria-label="Cart"
      >
        <ShoppingCart className="h-6 w-6" />
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-400 hover:text-white focus:outline-none transition-colors duration-200"
      aria-label="Cart"
    >
      <ShoppingCart className="h-6 w-6" />
      {showBadge && (
        <motion.span 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white"
        >
          {itemCount > 9 ? '9+' : itemCount}
        </motion.span>
      )}
    </button>
  );
}
