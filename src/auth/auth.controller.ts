import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/signin-auth.dto';
import { Public } from 'src/shared/decorators/public/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Public()
  @Post('login')
  signIn(@Body() signInDto: signInDto) {
    console.log(signInDto);
    const { email, password } = signInDto;
    return this.authService.signIn(email, password);
  }
}
