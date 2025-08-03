// Define base state interfaces to avoid circular dependencies
export interface BaseEntity {
    _id?: string;
    id?: string;
}

export interface Product extends BaseEntity {
    name: string;
    price: number;
    description: string;
    category: string;
    stock: number;
    imageUrl: string;
    image?: string;
}

export interface CartItem extends BaseEntity {
    name: string;
    price: number;
    quantity: number;
    image?: string;
    description?: string;
}

export interface User extends BaseEntity {
    username: string;
    email: string;
    role: 'user' | 'admin';
    status?: 'active' | 'inactive';
}

// Define state interfaces
export interface ProductState {
    products: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalAmount: number;
}

export interface UserState {
    users: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    isLoggedIn: boolean;
}

// Define the root state
export interface RootState {
    products: ProductState;
    cart: CartState;
    users: UserState;
}

// This will be properly typed in store.ts
export type AppDispatch = any;
