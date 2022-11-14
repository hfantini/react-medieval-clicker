import { createSlice } from "@reduxjs/toolkit";
import { ids } from "webpack";
import { ResourceType } from "../../enum/ResourceType";
import { Resources } from "../../model/Resources";
import { Villagers } from "../../model/Villagers";
import { VillagerWorkRestPayload } from "../payload/VillagerWorkRestPayload";

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
        set: (state, action) =>
        {
            let payload = (action.payload as Villagers);
            state.idle = payload.idle;
            state.alloc = payload.alloc;
        }
    }
})

export const {set} = villagerSlicer.actions;
export default villagerSlicer.reducer;