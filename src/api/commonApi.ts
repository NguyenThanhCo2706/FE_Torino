import axiosClient from "./axiosClient"

const commonApi = {
  async payment(data: any) {
    const url = `/master/payment`;
    const result = await axiosClient.post(url, data);
    return result;
  },
}

export default commonApi;
