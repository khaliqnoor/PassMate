import { createSlice } from "@reduxjs/toolkit";

const passwordSlice = createSlice({
  name: "passwords",
  initialState: {
    passwords: []  
  },
  reducers: {
    addPassword: (state, action) => {
      state.passwords.push(action.payload); 
    },
    updatePassword: (state, action) => {
      const index = state.passwords.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.passwords[index] = action.payload; 
      }
    },
    dltPassword: (state, action) => {
      state.passwords = state.passwords.filter(p => p.id !== action.payload);
    }
  }
});

export const { addPassword, updatePassword, dltPassword } = passwordSlice.actions;
export default passwordSlice.reducer;
