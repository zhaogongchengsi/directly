import { Controller, Get, Post, Req } from '@nestjs/common';
import { ResponseFormat } from 'src/common/response';
import { UserService } from './user.service';
import captcha from 'svg-captcha';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly response: ResponseFormat,
  ) {}

  @Post('login')
  async login() {
    return this.response.success(await this.userService.login());
  }

  @Post('register')
  register() {
    return this.response.error(200, '注册失败', new Error('注册失败'));
  }

  @Get('/pictureVerCode')
  pictureVerificationCode(@Req() request: Request) {}
}
