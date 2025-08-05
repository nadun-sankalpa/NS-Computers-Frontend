import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Select the orders slice from the root state
const selectOrdersState = (state: RootState) => state.orders;

// Memoized selector for orders data
export const selectOrders = createSelector(
  [selectOrdersState],
  (ordersState) => ordersState.orders || []
);

// Memoized selector for loading state
export const selectOrdersLoading = createSelector(
  [selectOrdersState],
  (ordersState) => ordersState.isLoading
);

// Memoized selector for error state
export const selectOrdersError = createSelector(
  [selectOrdersState],
  (ordersState) => ordersState.error
);

// Combined selector for all orders state
export const selectAllOrdersData = createSelector(
  [selectOrders, selectOrdersLoading, selectOrdersError],
  (orders, isLoading, error) => ({
    orders,
    isLoading,
    error
  })
);
