import axiosInstance from './axiosInstance';
import ConfigAPI from '@/config/ConfigAPI';

type HeaderOptions = Record<string, string>;
type BodyOptions = Record<string, unknown>;

export class BaseDA {
  static createUrlPayment = async (body?: BodyOptions) => {
    const response = await axiosInstance.post(
      'https://redis.ktxgroup.com.vn/api/vnpay/create_payment_url',
      body,
    );
    if (response.status === 200) {
      return response.data;
    }
  };

  static post = async (
    url: string,
    options?: {headers?: HeaderOptions; body?: BodyOptions},
  ) => {
    try {
      const relativeUrl = url.replace(ConfigAPI.url, '');
      const response = await axiosInstance.post(relativeUrl, options?.body, {
        headers: options?.headers,
      });

      console.info(
        `POST REQUEST:\n- URL: ${url}  \n- HEADER: ${JSON.stringify(
          options?.headers,
        )} \n- BODY: ${JSON.stringify(options?.body)}`,
      );

      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Failed to POST data:', error);
      return null;
    }
  };

  static postFile = async (
    url: string,
    options?: {headers?: HeaderOptions; body?: FormData},
  ) => {
    try {
      const relativeUrl = url.replace(ConfigAPI.url, '');
      const headers = {
        ...options?.headers,
        'Content-Type': 'multipart/form-data',
      };
      const response = await axiosInstance.post(relativeUrl, options?.body, {
        headers,
      });
      if (response.status === 200) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Failed to POST file:', error);
      return null;
    }
  };

  static get = async (url: string, options?: {headers?: HeaderOptions}) => {
    try {
      const relativeUrl = url.replace(ConfigAPI.url, '');
      const response = await axiosInstance.get(relativeUrl, {
        headers: options?.headers,
      });
      console.info(
        `GET REQUEST:\n- URL: ${url} \n- HEADER: ${JSON.stringify(
          options?.headers,
        )}`,
      );
      if (response.status === 200) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('Failed to GET data:', error);
      return null;
    }
  };

  static uploadFiles = async (
    listFile: Array<{uri: Blob; type: string; name: string}>,
  ) => {
    try {
      const formData = new FormData();
      listFile.forEach(file => {
        formData.append('files', file.uri, file.name);
      });

      const response = await this.postFile(ConfigAPI.url + 'file/uploadfiles', {
        body: formData,
      });

      if (response && response.code === 200 && response?.data?.length > 0) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('File upload failed:', error);
      return null;
    }
  };

  static getFilesInfor = async (ids: Array<string>) => {
    const response = await this.post(ConfigAPI.url + 'file/getFilesInfor', {
      body: {ids: ids},
    });
    return response;
  };

  static deleteFile = async (id: string) => {
    try {
      const response = await this.post(ConfigAPI.url + 'file/deletefiles', {
        body: {ids: [id]},
      });
      if (response && response.code === 200) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('File deletion failed:', error);
      return false;
    }
  };
}
