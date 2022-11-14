import { createSlice } from "@reduxjs/toolkit";
import { ResourceType } from "../../enum/ResourceType";
import { Resources } from "../../model/Resources";
import { ResourceIncrementPayload } from "../payload/ResourceIncrementPayload";

export const resourceSlicer = createSlice({
    name: "ResourceSlicer",
    initialState: {
        food: 0,
        wood: 0,
        gold: 0,
        stone: 0
    },
    reducers: 
    {
        set: (state, action) =>
        {
            let payload = (action.payload as Resources);
            state.food = payload.food;
            state.wood = payload.wood;
            state.gold = payload.gold;
            state.stone = payload.stone;
        }
    }
})

export const {set} = resourceSlicer.actions;
export default resourceSlicer.reducer;