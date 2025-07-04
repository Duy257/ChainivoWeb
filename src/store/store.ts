import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "./reducers/CounterSlice";
import customerReducer from "./reducers/CustomerReducer";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: CounterSlice,
      customer: customerReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
