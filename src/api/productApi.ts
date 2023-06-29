import axiosClient from "./axiosClient"

const alias = "products";

const productApi = {
  async getMany(categoryId: number, CurrentPage: number, PageSize: number) {
    const url = `/public/products/products`;
    const result = await axiosClient.get(url, {
      params: {
        categoryId: categoryId,
        CurrentPage: CurrentPage,
        PageSize: PageSize
      }
    });
    return result;
  },

  async getOne(productId: number) {
    const url = `/public/products/products/${productId}`;
    const result = await axiosClient.get(url, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    return result;
  },

  async getAll(CurrentPage: number, PageSize: number) {
    const url = `public/products/products-best-seller`;
    const result = await axiosClient.get(url, {
      params: {
        CurrentPage: CurrentPage,
        PageSize: PageSize
      }
    });
    return result;
  },

}

export default productApi;
