import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    try {
      const user = await this.usersService.findOneByEmail(email);
      if (user.password !== password) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, email: email };
      return {
        access_token: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_SECRET,
        }),
      };
    } catch (error) {
      throw error;
    }
  }
}
