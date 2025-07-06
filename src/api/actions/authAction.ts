import {BaseDA} from '@/api/BaseDA';

class AuthAction {
  static login = async (email: string, password: string) => {
    const response = await BaseDA.post('/auth/login', {
      body: {
        email,
        password,
      },
    });
    return response;
  };
}

export default AuthAction;
