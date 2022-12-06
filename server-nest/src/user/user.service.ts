import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async login() {
    return await this.prisma.user.findMany();
  }
}
