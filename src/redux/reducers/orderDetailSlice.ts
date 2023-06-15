import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { OrderDetail } from "../../types";

const REDUCER_NAME = "orderDetail";

export type CategoryState = {
  orderDetails: OrderDetail[];
};

const initialState = {
  orderDetails: [] as OrderDetail[],
};

export const orderDetailSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setOrderDetails(state, action: PayloadAction<OrderDetail[]>) {
      state.orderDetails = action.payload;
      localStorage.setItem('orderDetails', JSON.stringify(state.orderDetails))
    },
    addOrderDetail(state, action: PayloadAction<OrderDetail>) {
      const index = state.orderDetails.findIndex((detail: any) => detail.productId === action.payload.productId);
      if (index !== -1) {
        state.orderDetails[index].quantity += 1;
      }
      else {
        state.orderDetails.push(action.payload);
      }
      localStorage.setItem('orderDetails', JSON.stringify(state.orderDetails))
    },
    changeQuantityOrderDetail(state, action: PayloadAction<any>) {
      const index = state.orderDetails.findIndex((detail: any) => detail.productId === action.payload.productId);
      state.orderDetails[index].quantity += action.payload.value;
      localStorage.setItem('orderDetails', JSON.stringify(state.orderDetails))
    },
  },
});

export const orderDetailActions = orderDetailSlice.actions;

export default orderDetailSlice.reducer;
