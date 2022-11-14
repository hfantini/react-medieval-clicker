import { configureStore } from '@reduxjs/toolkit'
import ResourceSlicer from './slicer/ResourceSlicer';
import UserActionSlicer from './slicer/UserActionSlicer';
import VillagerSlicer from './slicer/VillagerSlicer';

export const store = configureStore({
  reducer: {
    userAction: UserActionSlicer,
    resource: ResourceSlicer,
    villager: VillagerSlicer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
export default store;