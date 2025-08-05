import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '@/slices/store';

// This hook provides type safety when using useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
