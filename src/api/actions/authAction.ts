import {BaseDA} from '@/api/BaseDA';
import ConfigAPI from '@/config/ConfigAPI';
import {useNavigation} from '@/hooks/Navigate';

class AuthAction {
  static login = async (body: {
    type: 'phone' | 'apple' | 'google' | 'microsoft' | 'account';
    token?: string;
    deviceToken?: string;
    ggClientId?: string;
    phone?: string;
    password?: string;
    email?: string;
  }) => {
    const res = await BaseDA.post(ConfigAPI.url + 'data/login', {
      headers: {module: 'Customer', pid: ConfigAPI.pid},
      body: body,
    });

    return res;
  };

  static logout = async () => {
    try {
      // Clear local storage tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('timeRefresh');

      // Redirect to login page
      useNavigation().navigateTo('/login', true);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
}

export default AuthAction;
