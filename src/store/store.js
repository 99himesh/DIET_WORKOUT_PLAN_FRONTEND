import { configureStore } from '@reduxjs/toolkit';
import dietWorkoutReducer from "../feature/dietWorkoutSlice"
export const store = configureStore({
  reducer: {
    diet:dietWorkoutReducer
   
  },
})