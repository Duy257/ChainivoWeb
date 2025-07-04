import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const CounterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.value += action.payload || 1;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.value -= action.payload || 1;
    },
    resetState: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, resetState } = CounterSlice.actions;
export default CounterSlice.reducer;
