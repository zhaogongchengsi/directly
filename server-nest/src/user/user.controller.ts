import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller("/user")
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get()
  login() {
    return this.appService.login();
  }
}
