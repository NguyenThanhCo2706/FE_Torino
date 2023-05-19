import axiosClient from "./axiosClient"

const alias = "products";

const productApi = {
  async getMany(categoryId: number) {
    const url = `/public/products/products?CategoryId=${categoryId}`;
    const result = await axiosClient.get(url);
    return result;
  },

  async getOne(productId: number) {
    const url = `/products/products/${productId}`;
    const result = await axiosClient.get(url, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    return result;
  }
}

export default productApi;
