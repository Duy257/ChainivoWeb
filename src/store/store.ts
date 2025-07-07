import {configureStore} from '@reduxjs/toolkit';
import CounterSlice from './reducers/CounterSlice';
import customerReducer from './reducers/CustomerReducer';
import ShopReduccer from './reducers/ShopReducer';

export const makeStore = () => {
  return configureStore({
    reducer: {
      customer: customerReducer,
      counter: CounterSlice,
      shop: ShopReduccer,
    },
  });
};

// Create a store instance for use in non-React contexts
export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

// Export store as default for backward compatibility
export default store;
