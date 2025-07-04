import { Dispatch } from "@reduxjs/toolkit";
import { BaseDA } from "@/api/BaseDA";
import ConfigAPI from "@/config/ConfigAPI";
import { DataController } from "@/api/BaseController";
import {
  saveDataToLocalStorage,
  removeDataToLocalStorage,
  clearDataToLocalStorage,
} from "@/utils/LocalStorage";
import { AppDispatch, RootState } from "@/store/store";
import { handleActions, onFetching } from "@/store/reducers/CustomerReducer";
import {
  CustomerStatus,
  StorageContanst,
  TransactionStatus,
  TransactionType,
} from "@/config/Contanst";

// Placeholders for missing dependencies
const showSnackbar = (options: { message: string; status: string }) => {
  console.log(`Snackbar: ${options.message} (${options.status})`);
  // In a real app, you'd use a toast/snackbar library like react-toastify
  // Example: toast(options.message, { type: options.status });
};
const randomGID = () => new Date().getTime().toString();
const navigateTo = (path: string) => {
  // This should be properly implemented with Next.js router
  console.log(`Navigating to ${path}`);
  if (typeof window !== "undefined") {
    window.location.href = path;
  }
};
const ComponentStatus = {
  SUCCSESS: "success",
  WARNING: "warning",
};
// End Placeholders

// This needs to be initialized and exported from your store configuration
// For now, we'll use a placeholder.
let store: { getState: () => RootState; dispatch: AppDispatch };
export const setStore = (s: any) => {
  store = s;
};

export class CustomerActions {
  static login = async (body: {
    type: "phone" | "apple" | "google" | "microsoft" | "account";
    token?: string;
    deviceToken?: string;
    ggClientId?: string;
    phone?: string;
    password?: string;
    email?: string;
  }) => {
    const res = await BaseDA.post(ConfigAPI.url + "data/login", {
      headers: { module: "Customer", pid: ConfigAPI.pid },
      body: body,
    });
    if (res.code === 200) {
      saveDataToLocalStorage("accessToken", `${res.data.accessToken}`);
      saveDataToLocalStorage("refreshToken", `${res.data.refreshToken}`);
      saveDataToLocalStorage(
        "timeRefresh",
        `${(Date.now() / 1000 + 9 * 60).toString()}`
      );
    }
    return res;
  };

  static lockAccount = async (phone: string) => {
    const controller = new DataController("Customer");
    const res = (await controller.getListSimple({
      page: 1,
      size: 1,
      query: `@Mobile:{${phone}}`,
    })) as any;
    if (res.data.length) {
      await controller.edit([
        { ...res.data[0], Status: CustomerStatus.locked },
      ]);
      return {
        code: 200,
        message:
          "Tài khoản đã bị khóa, vui lòng liên hệ với quản trị viên để được hỗ trợ.",
      };
    } else return { code: 400, message: "Tài khoản không tồn tại" };
  };

  static getInfor =
    (toLogin?: boolean) =>
    async (dispatch: Dispatch, getState: () => RootState) => {
      dispatch(onFetching());
      const controller = new DataController("Customer");
      const res = await BaseDA.get(ConfigAPI.url + "data/getInfo", {
        headers: { module: "Customer", pid: ConfigAPI.pid },
      });
      if (res.code === 200) {
        await saveDataToLocalStorage(StorageContanst.CustomerId, res.data.Id);

        // This part needs to be adapted based on web FCM implementation
        // const deviceToken = await getFcmToken();
        // if (deviceToken) { ... }

        // Rank calculation logic
        var rankInfo = getState().customer.rankInfo ?? {
          totalReward: 0,
          totalScore: 0,
          achievedRank: null,
          RanksData: [],
        };

        // Simplified rank calculation, more complex logic can be added back if needed
        const [totalRewardRes, resSum] = await Promise.all([
          new DataController("HistoryReward").group({
            reducers:
              "LOAD * GROUPBY 1 @CustomerId REDUCE SUM 1 @Value AS TotalReward",
            searchRaw: `@CustomerId: {${res.data.Id}} @Status: [${TransactionStatus.success}]`,
          }),
          new DataController("HistoryReward").group({
            reducers:
              "LOAD * GROUPBY 1 @CustomerId REDUCE SUM 1 @Value AS TotalReward",
            searchRaw: `@CustomerId: {${res.data.Id}} (@Type: [${TransactionType.hoahong}] | @Type: [${TransactionType.mission}]) @Status: [${TransactionStatus.success}]`,
          }),
        ]);

        if (totalRewardRes.code === 200 && totalRewardRes.data.length > 0) {
          rankInfo.totalReward = totalRewardRes.data[0].TotalReward || 0;
        }

        let totalScore = 0;
        if (resSum.code === 200 && resSum.data.length > 0) {
          totalScore = resSum.data[0].TotalReward || 0;
        }

        const RankController = new DataController("ConfigRank");
        const resRank = await RankController.getAll();
        if (resRank.code === 200 && resRank.data.length > 0) {
          const ranksData = resRank.data;
          const sortedRanks = [...ranksData].sort(
            (a: any, b: any) => parseFloat(a.Score) - parseFloat(b.Score)
          );
          rankInfo.RanksData = sortedRanks;
          for (const rank of sortedRanks) {
            if (totalScore >= parseFloat(rank.Score)) {
              rankInfo.achievedRank = rank;
            }
          }
        }

        dispatch(
          handleActions({
            type: "GETINFOR",
            data: res.data,
            rankInfo: rankInfo,
          })
        );
      }
    };

  static checkPassword = async (phone: string, password?: string) => {
    const res = await BaseDA.post(ConfigAPI.url + "data/checkPassword", {
      headers: { module: "Customer", pid: ConfigAPI.pid },
      body: {
        ...(phone.includes("@") ? { email: phone } : { phone: phone }),
        password: password,
      },
    });
    return res;
  };

  static hashPassword = async (password?: string) => {
    const res = await BaseDA.get(
      ConfigAPI.url + `data/bcrypt?password=${password}`,
      {
        headers: { module: "Customer", pid: ConfigAPI.pid },
      }
    );
    return res;
  };

  static logout =
    () => async (dispatch: Dispatch, getState: () => RootState) => {
      const user = getState().customer.data;
      if (!user) {
        navigateTo("/login");
        dispatch(handleActions({ type: "LOGOUT" }));
        return;
      }

      // AuthSocketService.disconnectSocket(); // De-comment if you have socket service

      await removeDataToLocalStorage("accessToken");
      await removeDataToLocalStorage("refreshToken");
      await removeDataToLocalStorage("timeRefresh");
      await removeDataToLocalStorage(StorageContanst.CartItems);
      await removeDataToLocalStorage(StorageContanst.CustomerId);
      await removeDataToLocalStorage(StorageContanst.ShopId);

      navigateTo("/login");
      dispatch(handleActions({ type: "LOGOUT" }));
    };

  static edit = (user: any) => async (dispatch: Dispatch) => {
    dispatch(onFetching());
    const controller = new DataController("Customer");
    const res = await controller.edit([user]);
    if (res.code === 200) {
      showSnackbar({
        message: "Cập nhật thông tin tài khoản thành công",
        status: ComponentStatus.SUCCSESS,
      });
      dispatch(
        handleActions({
          type: "UPDATE",
          data: user,
        })
      );
    }
    return res;
  };

  static getAddresses = (cusId: any) => async (dispatch: Dispatch) => {
    if (!cusId) return;
    dispatch(onFetching());
    const controller = new DataController("Address");
    const res = await controller.getListSimple({
      page: 1,
      size: 10,
      query: `@CustomerId: {${cusId}}`,
    });
    if (res.code === 200) {
      dispatch(
        handleActions({
          type: "GETMYADDRESS",
          data: res.data,
        })
      );
    }
    return res;
  };

  static editAddress =
    (address: any, isAdd?: boolean) => async (dispatch: Dispatch) => {
      dispatch(onFetching());
      const controller = new DataController("Address");
      if (address?.IsDefault) {
        const resCheck = await controller.getListSimple({
          page: 1,
          size: 1,
          query: `@CustomerId: {${address.CustomerId}} @IsDefault: {true}`,
        });
        if (resCheck.code === 200 && resCheck.data.length > 0) {
          await controller.edit([{ ...resCheck.data[0], IsDefault: false }]);
        }
      }
      const res = isAdd
        ? await controller.add([address])
        : await controller.edit([address]);
      if (res.code === 200) {
        showSnackbar({
          message: "Thao tác thành công",
          status: ComponentStatus.SUCCSESS,
        });
        const newAddress = isAdd ? { ...address, Id: res.data[0].Id } : address;
        dispatch(
          handleActions({
            type: "ADDADDRESS",
            data: newAddress,
          })
        );
      }
      return res;
    };

  static deleteAddress = (addressId: any) => async (dispatch: Dispatch) => {
    const controller = new DataController("Address");
    const res = await controller.delete([addressId]);
    if (res.code === 200) {
      showSnackbar({
        message: "Thao tác thành công",
        status: ComponentStatus.SUCCSESS,
      });
      dispatch(
        handleActions({
          type: "DELETEADDRESS",
          data: addressId,
        })
      );
    }
    return res;
  };

  static deleteAccount = (userId: string) => async (dispatch: Dispatch) => {
    dispatch(onFetching());
    const controller = new DataController("Customer");
    const res = await controller.delete([userId]);
    if (res.code === 200) {
      clearDataToLocalStorage();
      showSnackbar({
        message:
          "Tài khoản đã bị xóa khỏi hệ thống, vui lòng đăng nhập lại để sử dụng",
        status: ComponentStatus.WARNING,
      });
      navigateTo("/login");
    }
  };

  static updateRank =
    (rank: number, gameId: string) => async (dispatch: Dispatch) => {
      const controller = new DataController("Customer");
      const customer = store.getState().customer;
      const res = await controller.edit([
        { ...customer?.data, Rank: (customer?.data?.Rank ?? 0) + rank },
      ]);
      if (res.code === 200) {
        // lưu vào bảng HistoryGame
        const historyController = new DataController("HistoryScore");
        const data = {
          Id: randomGID(),
          CustomerId: customer?.data.Id,
          GameId: gameId,
          Score: rank,
          Name: customer?.data?.Name,
          DateCreated: new Date().getTime(),
        };
        await historyController.add([data]);
        dispatch(
          handleActions({
            type: "UPDATE",
            data: {
              ...customer.data,
              Rank: (customer?.data?.Rank ?? 0) + rank,
            },
          })
        );
      }
    };
  static setUp2FA = async (id: string) => {
    const res = await BaseDA.post(ConfigAPI.url + "2fa/setup", {
      headers: { module: "Customer", pid: ConfigAPI.pid },
      body: { Id: id },
    });
    return res;
  };
  static verify2FA = async (id: string, token: string) => {
    const res = await BaseDA.post(ConfigAPI.url + "2fa/verify", {
      headers: { module: "Customer", pid: ConfigAPI.pid },
      body: { Id: id, token: token },
    });
    return res;
  };
  static disable2FA = async (id: string) => {
    const res = await BaseDA.post(ConfigAPI.url + "2fa/disable", {
      headers: { module: "Customer", pid: ConfigAPI.pid },
      body: { Id: id },
    });
    return res;
  };
  static verify2Action = async (id: string, token: string) => {
    const res = await BaseDA.post(ConfigAPI.url + "2fa/protected-action", {
      headers: { module: "Customer", pid: ConfigAPI.pid },
      body: { Id: id, token: token },
    });
    return res;
  };
  static createWallet = async (user: string) => {
    const res = await BaseDA.post(ConfigAPI.urlBlockchain + "auth/login", {
      headers: { module: "Customer", pid: ConfigAPI.pid },
      body: {
        username: ConfigAPI.username_blc,
        password: ConfigAPI.password_blc,
      },
    });
    if (res) {
      // create wallet
      const resCreate = await BaseDA.post(
        ConfigAPI.urlBlockchain + "wallet/create",
        {
          headers: { Authorization: `Bearer ${res.token}` },
          body: {
            name: `Chainivo Wallet ${user}`,
            description: "Wallet for Chainivo",
          },
        }
      );
      return resCreate;
    } else {
      return res;
    }
  };
  //checkEmail exist
  static checkEmail = async (email: string) => {
    const controller = new DataController("Customer");
    const res = await controller.getListSimple({
      page: 1,
      size: 1,
      query: `@Email:("${email}") @Id: {${store.getState().customer.data?.Id}}`,
    });
    return res;
  };
  //sendMail
  static sendMail = async (email: string) => {
    const res = await BaseDA.post(ConfigAPI.url + "2fa/send-mail", {
      headers: { module: "Customer", pid: ConfigAPI.pid },
      body: { email: email },
    });
    return res;
  };
  //verifyMail
  static verifyMail = async (email: string, token: string) => {
    const res = await BaseDA.post(ConfigAPI.url + "2fa/verify-otp", {
      headers: { module: "Customer", pid: ConfigAPI.pid },
      body: {
        email: email,
        otp: token,
        customerId: store.getState().customer.data?.Id,
      },
    });
    return res;
  };
  static updateDeviceToken = async (deviceToken: string) => {
    const controller = new DataController("Customer");
    const res = await controller.edit([
      {
        Id: store.getState().customer.data?.Id,
        DeviceToken: deviceToken,
      },
    ]);
    return res;
  };
}
