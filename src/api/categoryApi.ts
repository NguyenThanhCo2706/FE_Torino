import axiosClient from "./axiosClient"

const alias = "products/categories";

const categoryApi = {
  async getMany() {
    const url = "public/products/categories";
    const result = await axiosClient.get(url);
    return result;
  },
}

export default categoryApi;
