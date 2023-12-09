import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(@Inject('AuthService') private readonly authService: AuthService) {
    super({
      clientID: '678464714175-haoj5pp20e3orr0166kalkskc5oduv88.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:4200/auth/google/callback',
      scope: ['profile', 'email']
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {
    const { id, emails, photos } = profile;

    const userInfo = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      avatar: photos[0].value
    };

    // const user = await this.authService.validateUser({ email: userInfo.email });

    done(null, userInfo);
  }
}
