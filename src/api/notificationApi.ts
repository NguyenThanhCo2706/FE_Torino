import axiosClient from "./axiosClient"

const notificationApi = {
  async count() {
    const url = "notifications/notifications/count";
    const result = await axiosClient.get(url);
    return result;
  },
  async getMany(status = "", currentPage = 1, pageSize = 5) {
    const url = "notifications/notifications";
    const result = await axiosClient.get(url, {
      params: {
        currentPage: currentPage,
        pageSize: pageSize,
        status: status
      }
    });
    return result;
  },
  async read(id: number) {
    const url = `notifications/notifications/${id}/read`;
    const result = await axiosClient.put(url);
    return result;
  },
}

export default notificationApi;
