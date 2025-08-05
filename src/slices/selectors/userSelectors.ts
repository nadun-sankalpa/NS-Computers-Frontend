import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Select the users slice from the root state
export const selectUsersState = (state: RootState) => state.users;

// Memoized selector for users data
export const selectUsers = createSelector(
  [selectUsersState],
  (usersState) => usersState.users
);

// Memoized selector for loading state
export const selectUsersLoading = createSelector(
  [selectUsersState],
  (usersState) => usersState.isLoading
);

// Memoized selector for error state
export const selectUsersError = createSelector(
  [selectUsersState],
  (usersState) => usersState.error
);

// Combined selector for all users state
export const selectAllUsersData = createSelector(
  [selectUsers, selectUsersLoading, selectUsersError],
  (users, isLoading, error) => ({
    users,
    isLoading,
    error
  })
);
