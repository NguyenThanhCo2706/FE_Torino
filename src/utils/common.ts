import { Order } from "../types"

export const initOrder = () => {
  const order: Order = {
    dateOfReceive: new Date(),
    customerId: 0,
    discount: 0,
    note: "",
    isPaid: false,
    orderDetails: [],
    detailAddress: "",
    provinceId: "",
    districtId: "",
    communeId: ""
  }

  localStorage.setItem("order", JSON.stringify(order));
}