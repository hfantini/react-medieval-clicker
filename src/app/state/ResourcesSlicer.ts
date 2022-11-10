import { createSlice } from "@reduxjs/toolkit";

export const resourcesSlicer = createSlice({
    name: "GameSlicer",
    initialState: {
        food: 0,
        wood: 0,
        gold: 0,
        stone: 0
    },
    reducers: 
    {
        increment: (state) => 
        {
            state.food += 1;
        },
        set: (state, action) =>
        {
            state = action.payload;
        }
    }
})

export const {increment, set} = resourcesSlicer.actions;
export default resourcesSlicer.reducer;