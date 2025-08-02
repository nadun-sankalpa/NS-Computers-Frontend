import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCartTotalQuantity } from '@/slices/cartSlice';

export function CartButton({ onClick }: { onClick: () => void }) {
  const itemCount = useSelector(selectCartTotalQuantity);

  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-400 hover:text-white focus:outline-none"
      aria-label="Cart"
    >
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </button>
  );
}
