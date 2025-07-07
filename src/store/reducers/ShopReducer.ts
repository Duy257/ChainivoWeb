import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';

// Define shop data interface
interface ShopData {
  id?: string;
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  // Add more shop properties as needed
}

interface ShopState {
  data: ShopData | null;
  onLoading: boolean;
}

const initialState: ShopState = {
  data: null,
  onLoading: false,
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setData: (
      state,
      action: PayloadAction<{
        stateName: keyof ShopState;
        data: any;
      }>,
    ) => {
      const {stateName, data} = action.payload;
      (state as any)[stateName] = data;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.onLoading = action.payload;
    },
    updateShopField: <K extends keyof ShopData>(
      state: ShopState,
      action: PayloadAction<{
        field: K;
        value: ShopData[K];
      }>,
    ) => {
      if (state.data) {
        state.data[action.payload.field] = action.payload.value;
      }
    },
    clearShopData: state => {
      state.data = null;
      state.onLoading = false;
    },
  },
});

export const {setData, setLoading, updateShopField, clearShopData} =
  shopSlice.actions;
export default shopSlice.reducer;

// Custom hook for shop operations
export const useShopHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const shopState = useSelector((state: RootState) => state.shop);

  const actions = {
    // Set complete shop data
    setShopData: (data: ShopData | null) => {
      dispatch(setData({stateName: 'data', data}));
    },

    // Set loading state
    setLoading: (loading: boolean) => {
      dispatch(setLoading(loading));
    },

    // Update specific shop field
    updateField: <K extends keyof ShopData>(field: K, value: ShopData[K]) => {
      dispatch(updateShopField({field, value}));
    },

    // Clear all shop data
    clearData: () => {
      dispatch(clearShopData());
    },
  };

  return {
    // State
    data: shopState.data,
    isLoading: shopState.onLoading,

    // Actions
    ...actions,
  };
};
