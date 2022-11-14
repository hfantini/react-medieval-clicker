import { configureStore } from '@reduxjs/toolkit'
import ResourceSlicer from './slicer/ResourceSlicer';
import UserActionSlicer from './slicer/UserActionSlicer';
import VillagerSlicer from './slicer/VillagerSlicer';
import WagonSlicer from './slicer/WagonSlicer';

export const store = configureStore({
  reducer: {
    userAction: UserActionSlicer,
    resource: ResourceSlicer,
    villager: VillagerSlicer,
    wagon: WagonSlicer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
export default store;