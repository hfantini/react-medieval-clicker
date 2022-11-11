import { configureStore } from '@reduxjs/toolkit'
import ResourcesSlicer from './state/resources/ResourcesSlicer';

export const store = configureStore({
  reducer: {
    resources: ResourcesSlicer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;