import { configureStore } from "@reduxjs/toolkit";
import passwordReducer from '../feature/password/passwordSlice.js'

const store = configureStore({
   reducer: {
    passwords: passwordReducer
   }
})


export default store