import { ShoppingCart } from 'lucide-react';
import { useAppSelector } from '@/app/hooks';
import { selectTotalQuantity } from './cartSlice';

interface CartButtonProps {
  onClick: () => void;
}

export default function CartButton({ onClick }: CartButtonProps) {
  const totalItems = useAppSelector(selectTotalQuantity);

  return (
    <button
      type="button"
      className="group -m-2 flex items-center p-2"
      onClick={onClick}
    >
      <ShoppingCart
        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        aria-hidden="true"
      />
      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
        {totalItems}
      </span>
      <span className="sr-only">items in cart, view cart</span>
    </button>
  );
}
