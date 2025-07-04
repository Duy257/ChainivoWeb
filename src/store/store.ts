import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "./reducers/CounterSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counterSlice: CounterSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
