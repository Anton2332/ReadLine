import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseAuthService } from '@services/base-auth.service';
import { IUserResponse } from '../../auth/types/auth.type';

/**
 * @param  {SSEAuthGuard} This guard checks user token and verify him
 */

@Injectable()
export class SSEAuthGuard implements CanActivate {
  constructor(private readonly baseAuthService: BaseAuthService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const accessToken = request?.query?.token ?? null;

    if (!accessToken) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    try {
      const user = this.baseAuthService.verifyToken<IUserResponse>(accessToken);

      if (!user) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      request.user = user;
    } catch (e) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
