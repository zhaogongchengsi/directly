import { Controller, Get, Post, Req, Body } from '@nestjs/common';
import { ResponseFormat } from 'src/common/response';
import { UserService } from './user.service';

import { Request } from 'express';

const CAPTCHA_S_ID = 'captcha';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly response: ResponseFormat,
  ) {}

  @Post('login')
  async login(@Body() parms: { id: string }, @Req() request: Request) {
    const res = request.session[CAPTCHA_S_ID];
    return this.response.success(await this.userService.login());
  }

  @Post('register')
  register(@Req() request: Request) {
    return this.response.success(request.session[CAPTCHA_S_ID]);
  }

  @Get('/captcha')
  pictureVerificationCode(@Req() request: Request) {
    const { id, img } = this.userService.createCaptcha();
    request.session[CAPTCHA_S_ID] = { [id]: id };
    return this.response.success({ id, image: img, type: 'svg' });
  }
}
