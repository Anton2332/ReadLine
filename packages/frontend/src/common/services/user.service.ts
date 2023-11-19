import { IGetMe } from '@/common/types/auth.type';
import { STORAGE_KEYS } from '@/common/consts/app-keys.const';
import { EnhancedWithAuthHttpService } from '@/common/services/http-auth.service';
import { axiosInstance } from '@/common/services/axios';
import { HttpService } from '@/common/services/http.service';

class UserService extends EnhancedWithAuthHttpService {
  constructor() {
    super(new HttpService(axiosInstance));
  }

  async me() {
    const response = await this.get<IGetMe>('auth/me');
    if (response?.accessToken) {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
    }
    return response;
  }
}

export const userService = new UserService();
