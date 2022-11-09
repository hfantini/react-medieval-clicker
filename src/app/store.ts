import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './view/templates/game/GameSlicer';

export default configureStore({
  reducer: {
    game: gameReducer
  },
})