import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const REDUCER_NAME = "user";

export type UserState = {
  user: any;
};

const initialState: UserState = {
  user: {}
};

export const userSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<any>) {
      state.user = action.payload
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
