import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  login() {
    return { ok: 'isOk', token: '12312312adhasiud' };
  }
}
