import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store'; // Assuming you have a store.ts file

// Define the UserData interface
interface UserData {
    _id: string | number;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: "admin" | "customer";
    password?: string;  // Added optional password field
    createdAt: string;
    updatedAt: string;
}

// Define the state for the user slice
interface UserState {
    users: UserData[];
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: null,
};

// --- Async Thunks for API Calls ---

// Thunk to get all users
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            console.log('Fetching users from API...');
            const response = await fetch('http://localhost:3000/api/users/get-all-users');
            if (!response.ok) {
                const errorData = await response.text();
                console.error('Failed to fetch users. Status:', response.status, 'Response:', errorData);
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            console.log('Fetched users data:', data);
            return data.data; // Assuming the API response has a 'data' field with the users array
        } catch (error: any) {
            console.error('Error in fetchUsers:', error);
            return rejectWithValue(error.message || 'An error occurred while fetching users');
        }
    }
);

// Thunk to create a new user
export const createUser = createAsyncThunk(
    'users/createUser',
    async (newUserData: Omit<UserData, "_id" | "createdAt" | "updatedAt">, { rejectWithValue }) => {
        try {
            console.log('Creating user with data:', newUserData);
            
            const response = await fetch('http://localhost:3000/api/users/save-user', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newUserData),
            });
            
            const responseData = await response.json();
            console.log('API Response:', responseData);
            
            if (!response.ok) {
                const errorMsg = responseData.message || 'Failed to create user';
                console.error('Error creating user:', errorMsg);
                return rejectWithValue(errorMsg);
            }
            
            return responseData.data; // Return the created user data
        } catch (error: any) {
            console.error('Error in createUser:', error);
            return rejectWithValue(error.message || 'An unexpected error occurred');
        }
    }
);

// Thunk to update an existing user
export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({ id, updatedUserData }: { id: string | number; updatedUserData: Partial<UserData> }, { rejectWithValue }) => {
        try {
            // Ensure ID is a string (some backends are picky about this)
            const stringId = String(id).trim();
            console.log('Updating user with ID:', stringId, 'Type:', typeof stringId, 'Data:', updatedUserData);
            
            const response = await fetch(`http://localhost:3000/api/users/update-user/${stringId}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(updatedUserData),
            });
            
            const responseData = await response.json();
            console.log('Update user response:', responseData);
            
            if (!response.ok) {
                const errorMsg = responseData.message || 'Failed to update user';
                console.error('Error updating user:', errorMsg);
                throw new Error(errorMsg);
            }
            
            return responseData.data; // Return the updated user data
        } catch (error: any) {
            console.error('Error in updateUser thunk:', error);
            return rejectWithValue(error.message || 'An error occurred while updating the user');
        }
    }
);

// Thunk to delete a user
export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (id: string | number, { rejectWithValue }) => {
        console.log('=== deleteUser thunk started ===');
        console.log('Deleting user with ID:', id);
        
        // Validate ID
        if (!id) {
            const errorMsg = 'No user ID provided for deletion';
            console.error(errorMsg);
            return rejectWithValue(errorMsg);
        }
        
        let response;
        try {
            // Ensure ID is a string (some backends are picky about this)
            const stringId = String(id).trim();
            
            // Add timestamp to prevent caching
            const url = new URL(`http://localhost:3000/api/users/${stringId}`);
            url.searchParams.append('_t', Date.now().toString());
            
            console.log('Making DELETE request to:', url.toString());
            console.log('User ID type:', typeof stringId, 'Value:', stringId);
            
            response = await fetch(url.toString(), {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                },
                credentials: 'include',
                mode: 'cors',
                cache: 'no-store' as RequestCache
            });
            
            console.log('Response status:', response.status);
            console.log('Response status text:', response.statusText);
            
            // Try to read the response as text first to avoid JSON parse errors
            const responseText = await response.text();
            console.log('Raw response text:', responseText);
            
            let responseData;
            if (responseText) {
                try {
                    responseData = JSON.parse(responseText);
                    console.log('Parsed response data:', responseData);
                } catch (jsonError) {
                    console.error('Error parsing JSON response:', jsonError);
                    throw new Error(`Invalid JSON response: ${responseText.substring(0, 200)}`);
                }
            }
            
            if (!response.ok) {
                const errorMsg = responseData?.message || 
                               responseData?.error || 
                               response.statusText ||
                               `Server error: ${response.status}`;
                
                console.error('Error deleting user:', {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorMsg,
                    response: responseData || {}
                });
                
                throw new Error(errorMsg);
            }
            
            console.log('Successfully deleted user with ID:', id);
            return id;
            
        } catch (error: any) {
            console.error('=== Error in deleteUser thunk ===');
            console.error('Error details:', {
                name: error.name,
                message: error.message,
                stack: error.stack,
                response: response ? {
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers ? Object.fromEntries(response.headers.entries()) : {}
                } : 'No response received'
            });
            
            // Return a more detailed error message
            const errorMessage = error.message || 'Failed to delete user';
            return rejectWithValue({
                message: errorMessage,
                status: response?.status,
                statusText: response?.statusText,
                response: error.response || {}
            });
        } finally {
            console.log('=== deleteUser thunk completed ===');
        }
    }
);


// --- User Slice ---
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetchUsers lifecycle
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<UserData[]>) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Handle createUser lifecycle
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action: PayloadAction<UserData>) => {
                state.isLoading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                console.error('Failed to create user:', action.payload);
            })
            // Handle updateUser lifecycle
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<UserData>) => {
                const index = state.users.findIndex(user => user._id === action.payload._id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            // Handle deleteUser lifecycle
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string | number>) => {
                state.isLoading = false;
                const deletedUserId = action.payload;
                const initialLength = state.users.length;
                state.users = state.users.filter(user => user._id !== deletedUserId);
                console.log(`Deleted user ${deletedUserId}. Users before: ${initialLength}, after: ${state.users.length}`);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Failed to delete user';
                console.error('Failed to delete user:', action.payload);
            });
    },
});

export default userSlice.reducer;
