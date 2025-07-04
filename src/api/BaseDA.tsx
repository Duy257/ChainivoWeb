import axiosInstance from "./axiosInstance";
import ConfigAPI from "@/config/ConfigAPI";

export class BaseDA {
  static createUrlPayment = async (body?: any) => {
    const response = await axiosInstance.post(
      "https://redis.ktxgroup.com.vn/api/vnpay/create_payment_url",
      body
    );
    if (response.status === 200) {
      return response.data;
    }
  };

  static post = async (
    url: string,
    options?: { headers?: { [k: string]: any }; body?: any }
  ) => {
    try {
      const relativeUrl = url.replace(ConfigAPI.url, "");
      const response = await axiosInstance.post(relativeUrl, options?.body, {
        headers: options?.headers,
      });

      console.info(
        `POST REQUEST:\n- URL: ${url}  \n- HEADER: ${JSON.stringify(
          options?.headers
        )} \n- BODY: ${JSON.stringify(options?.body)}`
      );

      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Failed to POST data:", error);
      return null;
    }
  };

  static postFile = async (
    url: string,
    options?: { headers?: { [k: string]: any }; body?: FormData }
  ) => {
    try {
      const relativeUrl = url.replace(ConfigAPI.url, "");
      const headers = {
        ...options?.headers,
        "Content-Type": "multipart/form-data",
      };
      const response = await axiosInstance.post(relativeUrl, options?.body, {
        headers,
      });
      if (response.status === 200) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Failed to POST file:", error);
      return null;
    }
  };

  static get = async (
    url: string,
    options?: { headers?: { [k: string]: any } }
  ) => {
    try {
      const relativeUrl = url.replace(ConfigAPI.url, "");
      const response = await axiosInstance.get(relativeUrl, {
        headers: options?.headers,
      });
      console.info(
        `GET REQUEST:\n- URL: ${url} \n- HEADER: ${JSON.stringify(
          options?.headers
        )}`
      );
      if (response.status === 200) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Failed to GET data:", error);
      return null;
    }
  };

  static uploadFiles = async (
    listFile: Array<{ uri: string; type: string; name: string }>
  ) => {
    try {
      const formData = new FormData();
      listFile.forEach((file) => {
        formData.append("files", file.uri as any, file.name);
      });

      const response = await this.postFile(ConfigAPI.url + "file/uploadfiles", {
        body: formData,
      });

      if (response && response.code === 200 && response?.data?.length > 0) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("File upload failed:", error);
      return null;
    }
  };

  static getFilesInfor = async (ids: Array<string>) => {
    const response = await this.post(ConfigAPI.url + "file/getFilesInfor", {
      body: { ids: ids },
    });
    return response;
  };
}
