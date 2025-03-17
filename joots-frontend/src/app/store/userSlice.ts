import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type de l'utilisateur
interface UserState {
  id: string | null;
  username: string;
  email: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: UserState = {
  id: null,
  username: "Invité",
  email: null,
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    updateTokens: (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.id = null;
      state.username = "Invité";
      state.email = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

// Actions Redux
export const { setUser, updateTokens, logout } = userSlice.actions;

// Reducer Redux
export default userSlice.reducer;
