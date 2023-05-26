import { Order } from "../types"

export const initOrder = () => {
  const order: Order = {
    dateOfReceive: new Date(),
    customerId: 0,
    discount: 0,
    totalPrice: 0,
    note: "",
    isPaid: 0,
    orderDetails: []
  }

  localStorage.setItem("order", JSON.stringify(order));
}