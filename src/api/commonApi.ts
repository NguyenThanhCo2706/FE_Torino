import { AddressOption } from "../types";
import axiosClient from "./axiosClient"

const commonApi = {
  async payment(data: any) {
    const url = `/master/payment`;
    const result = await axiosClient.post(url, data);
    return result;
  },

  async getProvinces() {
    const url = "general/address/provinces";
    const result: AddressOption[] = await axiosClient.get(url);
    return result;
  },

  async getDistricts(provinceId: string) {
    const url = `general/address/districts/${provinceId}`;
    const result: AddressOption[] = await axiosClient.get(url);
    return result;
  },

  async getCommunes(districtId: string) {
    const url = `general/address/communes/${districtId}`;
    const result: AddressOption[] = await axiosClient.get(url);
    return result;
  },

  async uploadS3(data: any) {
    const url = "master/s3";
    const result: any = await axiosClient.post(url, data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
    return result;
  }
}

export default commonApi;
