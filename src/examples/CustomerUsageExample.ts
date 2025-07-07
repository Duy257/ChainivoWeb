/**
 * Ví dụ về cách sử dụng Customer Redux actions bên ngoài React components
 */

import { customerUtils } from '@/store/utils/customerUtils';
import store from '@/store/store';

// ===== CÁCH 1: Sử dụng customerUtils (Khuyến nghị) =====

export class CustomerService {
  // Đăng nhập customer
  static async loginCustomer(customerData: any) {
    try {
      // Set loading state
      customerUtils.setLoading(true);
      
      // Gọi API đăng nhập
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(customerData),
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Set customer data vào store
        customerUtils.setCustomerData(data);
        
        // Hoặc sử dụng action cụ thể
        customerUtils.actions.setCustomerInfo(data);
        
        return { success: true, data };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error };
    } finally {
      // Tắt loading
      customerUtils.setLoading(false);
    }
  }

  // Cập nhật thông tin customer
  static updateCustomerInfo(newData: any) {
    customerUtils.actions.updateCustomer(newData);
  }

  // Thêm địa chỉ mới
  static addNewAddress(address: any) {
    customerUtils.actions.addAddress(address);
  }

  // Xóa địa chỉ
  static removeAddress(addressId: string) {
    customerUtils.actions.deleteAddress(addressId);
  }

  // Đăng xuất
  static logout() {
    customerUtils.actions.logout();
  }

  // Lấy thông tin customer hiện tại
  static getCurrentCustomer() {
    return customerUtils.getCurrentState();
  }

  // Kiểm tra trạng thái đăng nhập
  static isUserLoggedIn() {
    return customerUtils.isLoggedIn();
  }

  // Lấy địa chỉ mặc định
  static getDefaultAddress() {
    return customerUtils.getDefaultAddress();
  }
}

// ===== CÁCH 2: Sử dụng store.dispatch trực tiếp =====

import { setData, handleActions } from '@/store/reducers/CustomerReducer';

export class DirectStoreService {
  // Sử dụng store.dispatch trực tiếp
  static setCustomerData(data: any) {
    store.dispatch(setData({ stateName: 'data', data }));
  }

  static setLoading(loading: boolean) {
    store.dispatch(setData({ stateName: 'onLoading', data: loading }));
  }

  static handleComplexAction(type: string, data?: any) {
    store.dispatch(handleActions({ type, data }));
  }

  // Lấy state hiện tại
  static getCurrentState() {
    return store.getState().customer;
  }
}

// ===== CÁCH 3: Sử dụng trong async functions =====

export async function fetchAndUpdateCustomerData(customerId: string) {
  try {
    // Bật loading
    customerUtils.setLoading(true);
    
    // Gọi API
    const response = await fetch(`/api/customers/${customerId}`);
    const customerData = await response.json();
    
    // Cập nhật store
    customerUtils.setCustomerData(customerData);
    
    // Lấy thông tin rank
    const rankResponse = await fetch(`/api/customers/${customerId}/rank`);
    const rankData = await rankResponse.json();
    
    // Cập nhật rank info
    customerUtils.setRankInfo(rankData);
    
  } catch (error) {
    console.error('Failed to fetch customer data:', error);
  } finally {
    // Tắt loading
    customerUtils.setLoading(false);
  }
}

// ===== CÁCH 4: Sử dụng trong utility functions =====

export const customerHelpers = {
  // Reset toàn bộ customer data
  resetAllCustomerData: () => {
    customerUtils.actions.logout();
    customerUtils.resetRankInfo();
  },

  // Cập nhật địa chỉ mặc định
  setDefaultAddress: (addressId: string) => {
    const currentState = customerUtils.getCurrentState();
    const addresses = currentState.myAddress || [];
    
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      IsDefault: addr.Id === addressId
    }));
    
    customerUtils.setCustomerAddresses(updatedAddresses);
  },

  // Kiểm tra và cập nhật rank
  checkAndUpdateRank: async (customerId: string) => {
    customerUtils.setRankInfoLoading();
    
    try {
      const rankData = await fetch(`/api/rank/${customerId}`).then(r => r.json());
      customerUtils.setRankInfo(rankData);
    } catch (error) {
      console.error('Failed to update rank:', error);
      customerUtils.resetRankInfo();
    }
  }
};

// ===== CÁCH SỬ DỤNG TRONG CÁC FILE KHÁC =====

/*
// Trong file API service
import { customerUtils } from '@/store/utils/customerUtils';

export async function apiCall() {
  customerUtils.setLoading(true);
  // ... API logic
  customerUtils.setCustomerData(responseData);
  customerUtils.setLoading(false);
}

// Trong file business logic
import { CustomerService } from './CustomerUsageExample';

export function handleLogin(credentials) {
  return CustomerService.loginCustomer(credentials);
}

// Trong file utility
import { customerHelpers } from './CustomerUsageExample';

export function resetApp() {
  customerHelpers.resetAllCustomerData();
}
*/
