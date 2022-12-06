import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommonModule } from './common/common.module';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {
  constructor() {}
}
