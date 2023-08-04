import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "types/user";
import jwt_decode from "jwt-decode";

type AuthState = {
  user: User | null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setCredential: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      if (state.token) {
        const tempPayload = jwt_decode<User>(state.token);
        if (tempPayload.id !== state.user?.id) return;
        localStorage.setItem("authToken", state.token);
        localStorage.setItem("userId", state.user?.id.toString());
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("authToken");
    },
  },
});

export const { setCredential, logout } = authSlice.actions;
export default authSlice.reducer;
