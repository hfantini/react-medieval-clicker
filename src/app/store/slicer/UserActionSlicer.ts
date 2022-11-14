import { createSlice } from "@reduxjs/toolkit";
import { UserAction } from "../../enum/UserAction";
import { UserActionPayload } from "../payload/UserActionPayload";

export const userActionSlicer = createSlice({
    name: "UserActionSlicer",
    initialState: 
    {
        action:UserAction.NONE,
        value: 0
    },
    reducers: 
    {
        userAction(state, action) 
        {
            console.log(action);
            let payload = (action.payload as UserActionPayload);
            state.action = payload.action;
            state.value = payload.value
        }
    }
})

export const {userAction} = userActionSlicer.actions;
export default userActionSlicer.reducer;