import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./fetchers/userSlice";
import ammoSlice from "./fetchers/ammoSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    ammo: ammoSlice,
    attack: ammoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;


