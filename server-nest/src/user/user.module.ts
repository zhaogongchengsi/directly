import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, AppService],
})
export class UserModule {}
