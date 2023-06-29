import axiosClient from "./axiosClient"


const historyApi = {
  async getMany(status: number, CurrentPage: number, PageSize: number) {
    const url = "orders/preOrders/user";
    const result = await axiosClient.get(url, {
      params: {
        statusPreOrder: status ? status : undefined,
        CurrentPage: CurrentPage,
        PageSize: PageSize
      }
    });
    return result;
  },
}

export default historyApi;
