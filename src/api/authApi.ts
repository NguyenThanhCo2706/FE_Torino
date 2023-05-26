import { ChangePassword, InfoUser, UpdateProfile } from "../types";
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

  async profile() {
    const url = `/${alias}/profile`;
    const result: InfoUser = await axiosClient.get(url);
    return result;
  },

  async updateProfile(data: UpdateProfile) {
    const url = `/${alias}/profile`;
    const result = await axiosClient.put(url, data);
    return result;
  },

  async changePassword(data: ChangePassword) {
    const url = `/${alias}/profile/change-password`;
    const result = await axiosClient.put(url, data);
    return result;
  }
}

export default authApi;
