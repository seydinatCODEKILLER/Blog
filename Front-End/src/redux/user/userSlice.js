import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SignInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    SignInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    SignInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateProfilePicture: (state, action) => {
      if (state.currentUser) {
        state.currentUser.profilPicture = action.payload;
      }
    },
  },
});

export const {
  SignInFailure,
  SignInStart,
  SignInSuccess,
  updateProfilePicture,
} = userSlice.actions;
export default userSlice.reducer;
