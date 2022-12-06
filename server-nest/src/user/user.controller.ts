import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly appService: AppService,
  ) {}

  @Get()
  login() {
    // console.log(this.appService.getHello());
    // return this.userService.login();
  }
}
