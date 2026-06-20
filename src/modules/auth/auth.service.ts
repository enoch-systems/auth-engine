import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(data: { email: string; password: string }) {
    const { email, password } = data;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
      },
    });

    return {
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}