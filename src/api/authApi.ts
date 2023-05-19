import axiosClient from "./axiosClient"

const alias = "auth";

const authApi = {
  async login(username: string, password: string) {
    const url = `/${alias}/login`;
    const data = JSON.stringify({
      "username": username,
      "password": password
    });
    const result = await axiosClient.post(url, data);
    return result.data;
  },

  async logout() {
    const url = "user/logout/";
    await axiosClient.get(url, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
  }
}

export default authApi;
