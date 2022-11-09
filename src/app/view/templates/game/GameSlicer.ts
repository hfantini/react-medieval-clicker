import { createSlice } from "@reduxjs/toolkit";
import GameService from "../../../service/GameService";

let initialStateOfGame = new GameService().newGame();
export const gameSlicer = createSlice({
    name: "GameSlicer",
    initialState: {
        ...initialStateOfGame
    },
    reducers: {
        increment: (state) => {
            state.resources.food += 1;
        }
    }
})

export const {increment} = gameSlicer.actions;
export default gameSlicer.reducer;