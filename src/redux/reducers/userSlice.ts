import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InfoUser } from "../../types";

const REDUCER_NAME = "user";

export type UserState = {
  user: InfoUser | null;
};

const initialState: UserState = {
  user: null
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
