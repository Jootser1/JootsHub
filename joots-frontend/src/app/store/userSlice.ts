import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Type de l'utilisateur
interface UserState {
  id: string | null;
  username: string;
  email: string | null;
  accessToken: string | null;
}

const initialState: UserState = {
  id: null,
  username: "Invité",
  email: null,
  accessToken: null,
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
    },
    logout: (state) => {
      state.id = null;
      state.username = "Invité";
      state.email = null;
      state.accessToken = null;
    },
  },
});

// Actions Redux
export const { setUser, logout } = userSlice.actions;

// Reducer Redux
export default userSlice.reducer;
