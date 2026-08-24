import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../axios/axios";
const initialState = {
  isLoading:false,
  error:"",
  user:{},
  dietPlan:[],
  workOutPlan:[]
};


export const dietWorkOutPlanAsync = createAsyncThunk(
  "dietWorkout/dietPlan",
  async ({data}) => {
    
    try {
      const res = await api.post("/diet-workout", data,{
        headers: {
          "Content-Type": "application/json",
        }
      });      
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);


export const dietWorkoutSlice = createSlice({
  name: "dietWorkout",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(dietWorkOutPlanAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(dietWorkOutPlanAsync.fulfilled, (state, action) => {
      state.isLoading = false;  
      state.user=action.payload.text.user; 
      state.dietPlan=action.payload.text.dietPlan; 
      state.workOutPlan=action.payload.text.workoutPlan; 
    });
    builder.addCase(dietWorkOutPlanAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

   
   
   
  },
});

export default dietWorkoutSlice.reducer;