import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import * as captcha from 'svg-captcha';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async login() {
    return await this.prisma.user.findMany();
  }

  createCaptcha(size: number = 4) {
    const picture = captcha.create({
      size,
      ignoreChars: 'oi1i', // 忽略相似的字符
      noise: 3, // 干扰线
      color: true, // 启用颜色
    });

    return {
      text: picture.text,
      img: picture.data,
    };
  }
}
