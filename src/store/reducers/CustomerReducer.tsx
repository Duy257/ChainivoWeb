import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AchievedRank} from '@/types/RankTypes';

interface CustomerState {
  data?: {Id: string; Rank: number} & Record<string, unknown>;
  myAddress?: Array<
    {Id: string; IsDefault?: boolean} & Record<string, unknown>
  >;
  onLoading: boolean;
  type?: string;
  rankInfo?: {
    totalReward: number;
    totalScore: number;
    achievedRank: AchievedRank | null;
    RanksData: Array<unknown> | null;
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
  name: 'customer',
  initialState,
  reducers: {
    handleActions: (
      state,
      action: PayloadAction<{
        type: string;
        data?: unknown;
        rankInfo?: unknown;
      }>,
    ) => {
      switch (action.payload.type) {
        case 'GETINFOR':
          state.data = action.payload.data as CustomerState['data'];
          state.rankInfo = action.payload.rankInfo as CustomerState['rankInfo'];
          break;
        case 'GETMYADDRESS':
          state.myAddress = action.payload.data as CustomerState['myAddress'];
          break;
        case 'ADDADDRESS':
          {
            const newAddress = action.payload.data as {
              Id: string;
              IsDefault?: boolean;
            };
            if (
              state.myAddress &&
              state.myAddress.length > 0 &&
              state.myAddress.find(el => el.Id === newAddress.Id)
            ) {
              state.myAddress = state.myAddress.map(el => {
                if (el.Id === newAddress.Id) {
                  return newAddress;
                }
                if (newAddress.IsDefault) {
                  return {...el, IsDefault: false};
                }
                return el;
              });
            } else {
              if (state.myAddress && state.myAddress.length === 0) {
                newAddress.IsDefault = true;
              }
              state.myAddress = [newAddress, ...(state.myAddress || [])];
            }
          }
          break;
        case 'DELETEADDRESS':
          if (state.myAddress) {
            const deletedAddressId = action.payload.data as string;
            const deletedAddress = state.myAddress.find(
              el => el.Id === deletedAddressId,
            );
            state.myAddress = state.myAddress.filter(
              el => el.Id !== deletedAddressId,
            );
            if (deletedAddress?.IsDefault && state.myAddress.length > 0) {
              state.myAddress[0].IsDefault = true;
            }
          }
          break;
        case 'UPDATE':
          state.data = action.payload.data as CustomerState['data'];
          break;
        case 'LOGOUT':
          state.data = undefined;
          state.myAddress = [];
          state.rankInfo = null;
          break;
        default:
          break;
      }
      state.onLoading = false;
    },
    onFetching: state => {
      state.onLoading = true;
    },
    setRankInfo: (state, action: PayloadAction<CustomerState['rankInfo']>) => {
      state.rankInfo = action.payload;
      state.rankInfoLoading = false;
    },
    setRankInfoLoading: state => {
      state.rankInfoLoading = true;
    },
    resetRankInfo: state => {
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
