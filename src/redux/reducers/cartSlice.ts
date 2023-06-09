import { createSlice } from "@reduxjs/toolkit";

const REDUCER_NAME = "cart";

export type CounterState = {
  counter: number;
};

const initialState: CounterState = { counter: 0 };

export const counterSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    increase(state) {
      state.counter = state.counter + 1;
    },
    decrease(state) {
      state.counter = state.counter - 1;
    },
  },
});

// export const selectCounter = () => (state: any) => state.counter;

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
