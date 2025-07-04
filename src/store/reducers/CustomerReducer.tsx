import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CustomerStatus,
  MissionType,
  StorageContanst,
  TransactionStatus,
  TransactionType,
} from "@/config/Contanst";
import { AchievedRank } from "@/types/RankTypes";

interface CustomerState {
  data?: any;
  myAddress?: Array<any>;
  onLoading: boolean;
  type?: string;
  rankInfo?: {
    totalReward: number;
    totalScore: number;
    achievedRank: AchievedRank | null;
    RanksData: Array<any> | null;
  } | null;
  rankInfoLoading: boolean;
}

const initialState: CustomerState = {
  data: undefined,
  myAddress: [],
  onLoading: false,
  rankInfo: null,
  rankInfoLoading: false,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    handleActions: (state, action: PayloadAction<any>) => {
      switch (action.payload.type) {
        case "GETINFOR":
          state.data = action.payload.data;
          state.rankInfo = action.payload.rankInfo;
          break;
        case "GETMYADDRESS":
          state.myAddress = action.payload.data;
          break;
        case "ADDADDRESS":
          if (
            state.myAddress &&
            state.myAddress.length > 0 &&
            state.myAddress.find((el) => el.Id === action.payload.data.Id)
          ) {
            state.myAddress = state.myAddress.map((el) => {
              if (el.Id === action.payload.data.Id) {
                return action.payload.data;
              }
              if (action.payload.data.IsDefault) {
                return { ...el, IsDefault: false };
              }
              return el;
            });
          } else {
            const newAddress = { ...action.payload.data };
            if (state.myAddress && state.myAddress.length === 0) {
              newAddress.IsDefault = true;
            }
            state.myAddress = [newAddress, ...(state.myAddress || [])];
          }
          break;
        case "DELETEADDRESS":
          if (state.myAddress) {
            const deletedAddress = state.myAddress.find(
              (el) => el.Id === action.payload.data
            );
            state.myAddress = state.myAddress.filter(
              (el) => el.Id !== action.payload.data
            );
            if (deletedAddress?.IsDefault && state.myAddress.length > 0) {
              state.myAddress[0].IsDefault = true;
            }
          }
          break;
        case "UPDATE":
          state.data = action.payload.data;
          break;
        case "LOGOUT":
          state.data = undefined;
          state.myAddress = [];
          state.rankInfo = null;
          break;
        default:
          break;
      }
      state.onLoading = false;
    },
    onFetching: (state) => {
      state.onLoading = true;
    },
    setRankInfo: (state, action) => {
      state.rankInfo = action.payload;
      state.rankInfoLoading = false;
    },
    setRankInfoLoading: (state) => {
      state.rankInfoLoading = true;
    },
    resetRankInfo: (state) => {
      state.rankInfo = null;
      state.rankInfoLoading = false;
    },
  },
});

export const {
  handleActions,
  onFetching,
  setRankInfo,
  setRankInfoLoading,
  resetRankInfo,
} = customerSlice.actions;

export default customerSlice.reducer;
