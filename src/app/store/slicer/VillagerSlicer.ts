import { createSlice } from "@reduxjs/toolkit";
import { Villagers } from "../../model/Villagers";

export const villagerSlicer = createSlice({
    name: "VillagerSlicer",
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
        set: (state, action) => {
            let payload = (action.payload as Villagers);
            state.idle = payload.idle;
            state.alloc = payload.alloc;
        }
    }
})

export const { set } = villagerSlicer.actions;
export default villagerSlicer.reducer;