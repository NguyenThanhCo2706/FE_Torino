import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const REDUCER_NAME = "category";

export type CategoryState = {
  categories: any;
};

const initialState: CategoryState = {
  categories: []
};

export const categorySlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<any>) {
      state.categories = action.payload
    },
  },
});


export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;
