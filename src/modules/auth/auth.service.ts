import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  register(data: any) {
    return {
      message: 'Register endpoint working',
      data,
    };
  }
}