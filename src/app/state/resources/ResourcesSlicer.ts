import { createSlice } from "@reduxjs/toolkit";
import { ResourceType } from "../../enum/ResourceType";
import { Resources } from "../../model/Resources";
import { IncrementResourcesPayload } from "./IncrementResourcesPayload";

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
        increment: (state, action) => 
        {
            let payload = (action.payload as IncrementResourcesPayload);

            switch(payload.resource)
            {
                case ResourceType.FOOD:
                    state.food += payload.value;
                    break;

                case ResourceType.WOOD:
                    state.wood += payload.value;
                    break;
                
                case ResourceType.GOLD:
                    state.gold += payload.value;
                    break;
                
                case ResourceType.STONE:
                    state.stone += payload.value;
                    break;                            
            }
        },
        set: (state, action) =>
        {
            let payload = (action.payload as Resources);
            state.food = payload.food;
        }
    }
})

export const {increment, set} = resourcesSlicer.actions;
export default resourcesSlicer.reducer;