import axiosClient from "./axiosClient"

const alias = "products";

const productApi = {
  async getMany(categoryId: number, CurrentPage: number, PageSize: number) {
    const url = `/public/products/products`;
    const result = await axiosClient.get(url, {
      params: {
        categoryId: categoryId !== 0 ? categoryId : undefined,
        CurrentPage: CurrentPage,
        PageSize: PageSize
      }
    });
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
