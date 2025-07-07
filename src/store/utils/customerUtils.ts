import store from '@/store/store';
import { 
  handleActions, 
  setData, 
  onFetching, 
  setRankInfo,
  setRankInfoLoading,
  resetRankInfo 
} from '@/store/reducers/CustomerReducer';

// Type definitions for better type safety
type CustomerState = {
  data?: {Id: string; Rank: number} & Record<string, unknown>;
  myAddress?: Array<{Id: string; IsDefault?: boolean} & Record<string, unknown>>;
  onLoading: boolean;
  type?: string;
  rankInfo?: {
    totalReward: number;
    totalScore: number;
    achievedRank: any | null;
    RanksData: Array<unknown> | null;
  } | null;
  rankInfoLoading: boolean;
};

/**
 * Utility functions để sử dụng Customer Redux actions bên ngoài components
 * Sử dụng store.dispatch trực tiếp thay vì React hooks
 */
export const customerUtils = {
  /**
   * Set customer data
   */
  setCustomerData: (data: CustomerState['data']) => {
    store.dispatch(setData({stateName: 'data', data}));
  },

  /**
   * Set customer addresses
   */
  setCustomerAddresses: (addresses: CustomerState['myAddress']) => {
    store.dispatch(setData({stateName: 'myAddress', data: addresses}));
  },

  /**
   * Set loading state
   */
  setLoading: (loading: boolean) => {
    store.dispatch(setData({stateName: 'onLoading', data: loading}));
  },

  /**
   * Set rank info
   */
  setRankInfo: (rankInfo: CustomerState['rankInfo']) => {
    store.dispatch(setRankInfo(rankInfo));
  },

  /**
   * Set rank info loading state
   */
  setRankInfoLoading: () => {
    store.dispatch(setRankInfoLoading());
  },

  /**
   * Reset rank info
   */
  resetRankInfo: () => {
    store.dispatch(resetRankInfo());
  },

  /**
   * Handle complex actions using the handleActions reducer
   */
  handleAction: (type: string, data?: unknown, rankInfo?: unknown) => {
    store.dispatch(handleActions({type, data, rankInfo}));
  },

  /**
   * Specific action handlers
   */
  actions: {
    // Set customer information
    setCustomerInfo: (data: CustomerState['data']) => {
      store.dispatch(handleActions({type: 'SETINFOR', data}));
    },

    // Set rank information
    setRankInfo: (rankInfo: CustomerState['rankInfo']) => {
      store.dispatch(handleActions({type: 'SETRANKINFO', rankInfo}));
    },

    // Get customer addresses
    getMyAddress: (addresses: CustomerState['myAddress']) => {
      store.dispatch(handleActions({type: 'GETMYADDRESS', data: addresses}));
    },

    // Add new address
    addAddress: (address: {Id: string; IsDefault?: boolean} & Record<string, unknown>) => {
      store.dispatch(handleActions({type: 'ADDADDRESS', data: address}));
    },

    // Delete address
    deleteAddress: (addressId: string) => {
      store.dispatch(handleActions({type: 'DELETEADDRESS', data: addressId}));
    },

    // Update customer data
    updateCustomer: (data: CustomerState['data']) => {
      store.dispatch(handleActions({type: 'UPDATE', data}));
    },

    // Logout customer
    logout: () => {
      store.dispatch(handleActions({type: 'LOGOUT'}));
    },
  },

  /**
   * Get current customer state
   */
  getCurrentState: (): CustomerState => {
    return store.getState().customer;
  },

  /**
   * Get specific state property
   */
  getStateProperty: <K extends keyof CustomerState>(key: K): CustomerState[K] => {
    return store.getState().customer[key];
  },

  /**
   * Check if customer is logged in
   */
  isLoggedIn: (): boolean => {
    const customerData = store.getState().customer.data;
    return customerData !== undefined && customerData !== null;
  },

  /**
   * Get customer ID
   */
  getCustomerId: (): string | undefined => {
    return store.getState().customer.data?.Id;
  },

  /**
   * Get default address
   */
  getDefaultAddress: () => {
    const addresses = store.getState().customer.myAddress;
    return addresses?.find(addr => addr.IsDefault);
  },
};

export default customerUtils;
