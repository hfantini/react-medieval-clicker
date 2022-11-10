import { configureStore } from '@reduxjs/toolkit'
import resourcesSlicer from './state/ResourcesSlicer';

export const store = configureStore({
  reducer: {
    resources: resourcesSlicer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;