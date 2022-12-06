import { Controller, Get, Post } from '@nestjs/common';
import { ResponseFormat } from 'src/common/response';
import { UserService } from './user.service';

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
    return this.response.success('register');
  }

  @Get('/captcha')
  pictureVerificationCode() {
    //! !只是模板原因 不在后端验证 验证码 所以不存储验证码信息 生产环境下 可以使用 session 或者 redis 存储
    const { img, text } = this.userService.createCaptcha();
    return this.response.success({ id: text, image: img, type: 'svg' });
  }
}
