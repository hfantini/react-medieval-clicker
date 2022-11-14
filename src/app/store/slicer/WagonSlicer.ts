import { createSlice } from "@reduxjs/toolkit";
import { Wagons } from "../../model/Wagons";

export const wagonSlicer = createSlice({
    name: "WagonSlicer",
    initialState: {
        idle: 0,
        alloc:
        {
            food: 0,
            wood: 0,
            gold: 0,
            stone: 0
        }
    },
    reducers: 
    {
        set: (state, action) =>
        {
            let payload = (action.payload as Wagons);
            state.idle = payload.idle;
            state.alloc = payload.alloc;
        }
    }
})

export const {set} = wagonSlicer.actions;
export default wagonSlicer.reducer;