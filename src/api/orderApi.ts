import { Order } from "../types";
import axiosClient from "./axiosClient"


const orderApi = {
  async create(order: Order) {
    const url = "orders/preOrders/user";
    const result = await axiosClient.post(url, order);
    return result;
  },
}

export default orderApi;
