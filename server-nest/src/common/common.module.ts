import { Module, Global } from '@nestjs/common';
import { ResponseFormat } from './response';
import { PrismaService } from './prisma.service';
@Global()
@Module({
  providers: [ResponseFormat, PrismaService],
  exports: [ResponseFormat, PrismaService],
})
export class CommonModule {}
