import {BaseDA} from '@/api/BaseDA';
import ConfigAPI from '@/config/ConfigAPI';
import { saveDataToLocalStorage } from '@/utils/LocalStorage';

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
    if (res.code === 200) {
      saveDataToLocalStorage('accessToken', `${res.data.accessToken}`);
      saveDataToLocalStorage('refreshToken', `${res.data.refreshToken}`);
      saveDataToLocalStorage(
        'timeRefresh',
        `${(Date.now() / 1000 + 9 * 60).toString()}`,
      );
    }
    return res;
  };
}

export default AuthAction;
