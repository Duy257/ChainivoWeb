import axios from "axios";
import {
  getDataToLocalStorage,
  removeDataToLocalStorage,
  saveDataToLocalStorage,
} from "@/utils/LocalStorage";
import ConfigAPI from "@/config/ConfigAPI";
import { useNavigation } from "@/hooks/Navigate";

const getHeaders = async () => {
  let timeRefresh: any = getDataToLocalStorage("timeRefresh");
  let accessToken: any = getDataToLocalStorage("accessToken");
  let refreshToken: any = getDataToLocalStorage("refreshToken");

  if (typeof timeRefresh === "string") {
    timeRefresh = parseInt(timeRefresh, 10);
  }
  const now = Date.now() / 1000;
  if (timeRefresh && timeRefresh > 0 && timeRefresh <= now) {
    var body = {
      refreshToken: refreshToken,
    };
    const res = await fetch(ConfigAPI.url + "data/refreshToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.status === 200 || res.status === 201) {
      const jsonData = await res.json();
      if (jsonData.code === 200) {
        await saveDataToLocalStorage("accessToken", `${jsonData.accessToken}`);
        await saveDataToLocalStorage(
          "timeRefresh",
          `${(Date.now() / 1000 + 9 * 60).toString()}`
        );
        return {
          refreshToken: refreshToken,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        };
      }
    } else {
      removeDataToLocalStorage("timeRefresh");
      removeDataToLocalStorage("accessToken");
      removeDataToLocalStorage("refreshToken");
      useNavigation().navigate("/login", true);
    }
  } else if (accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
  }
  return { "Content-Type": "application/json" };
};

export class BaseDA {
  static createUrlPayment = async (body?: any) => {
    let _headers: { [k: string]: any } = {};
    _headers = await getHeaders();
    const response = await axios.post(
      "https://redis.ktxgroup.com.vn/api/vnpay/create_payment_url",
      body,
      {
        headers: _headers,
      }
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
      let _headers: { [k: string]: any } = {};
      if (options?.headers) {
        _headers = { ...(await getHeaders()), ...options.headers };
      }
      const response = await axios.post(url, options?.body, {
        headers: _headers,
      });
      console.info(
        `POST REQUEST:\n- URL: ${url}  \n- HEADER: ${JSON.stringify(
          options?.headers
        )} \n- BODY: ${JSON.stringify(options?.body)}`
      );
      // console.info(`POST RESPONSE:\n- URL: ${url} \n- CODE: ${response.status} \n - BODY: ${response.status === 200 ? JSON.stringify(response.data) : ''}`);
      if (response.status === 200) {
        const jsonData = response.data;
        return jsonData;
      } else if (response.status === 204) {
        return {
          message: "ok",
          data: options?.body,
        };
      } else if (response.status === 401) {
        useNavigation().navigate("/login", true);
      } else {
        const txt = response.statusText;
        console.error("Failed to POST data:", txt);
        return null;
      }
    } catch (error) {
      useNavigation().navigate("/login", true);
      console.error("Failed to POST data:", error);
      return null;
    }
  };

  static postFile = async (
    url: string,
    options?: { headers?: { [k: string]: any }; body?: FormData }
  ) => {
    try {
      if (options?.headers) {
        options.headers["Content-Type"] = "multipart/form-data";
      }
      console.info("POSTFILE:\n- URL: ", url);
      console.info("\n- HEADER: ", options?.headers);
      const response = await axios.post(url, options?.body, {
        headers: options?.headers ?? { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        return response.data;
      } else if (response.status === 204) {
        return {
          message: "ok",
          data: options?.body,
        };
      } else if (response.status === 401) {
        useNavigation().navigate("/login", true);
      } else {
        console.error("Failed to POST data:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Failed to POST data:", error);
      return null;
    }
  };

  static get = async (
    url: string,
    options?: { headers?: { [k: string]: any } }
  ) => {
    try {
      let _headers: { [k: string]: any } = {};
      if (options?.headers) {
        _headers = { ...(await getHeaders()), ...options.headers };
      }
      const response = await axios.get(url, { headers: _headers });
      console.info(
        `GET REQUEST:\n- URL: ${url} \n- HEADER: ${JSON.stringify(
          options?.headers
        )}`
      );

      console.info(
        `GET RESPONSE:\n- URL: ${url} \n- CODE: ${response.status} \n - BODY: ${
          response.status === 200 ? JSON.stringify(response.data) : ""
        }`
      );
      if (response.status === 200) {
        const jsonData = response.data;
        return jsonData;
      } else if (response.status === 401) {
        useNavigation().navigate("/login", true);
      } else {
        const txt = response.statusText;
        console.error("Failed to POST data:", txt);
        return null;
      }
    } catch (error) {
      useNavigation().navigate("/login", true);
      console.error("catch error to POST data:", error);
      return null;
    }
  };

  static uploadFiles = async (
    listFile: Array<{ uri: string; type: string; name: string }>
  ) => {
    listFile = [...listFile];
    // const headersObj: any = await getHeaders()
    const headersObj: any = { pid: ConfigAPI.pid };
    const formData = new FormData();
    listFile.forEach((e) => {
      formData.append("files", e.uri);
    });

    const response = await BaseDA.postFile(ConfigAPI.url + "file/uploadfiles", {
      headers: headersObj,
      body: formData,
    });
    if (response.code === 200 && response?.data?.length > 0) {
      return response.data;
    } else {
      useNavigation().navigate("/login", true);
    }
    return null;
  };

  static getFilesInfor = async (ids: Array<string>) => {
    // const headersObj: any = await getHeaders()
    const headersObj: any = {};
    const response = await BaseDA.post(ConfigAPI.url + "file/getFilesInfor", {
      headers: headersObj,
      body: { ids: ids },
    });
    return response;
  };
}
