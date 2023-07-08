import { PrismaConnectDisconnect } from '../decorators/prismaConnectDisconnect';
import { prisma } from '../lib/prisma';
import { CreateUserSchema, LoginSchema } from '../schemas/auth.schemas';
import bcrypt from 'bcrypt';

export class AuthRepository {
  @PrismaConnectDisconnect
  static async createUser(userData: CreateUserSchema) {
    const _salt = await bcrypt.genSalt();
    const _hashedPassword = await bcrypt.hash(userData.password, _salt);

    await prisma.user.create({
      data: { ...userData, password: _hashedPassword, salt: _salt },
    });
  }

  @PrismaConnectDisconnect
  static async login(loginData: LoginSchema) {
    const _userDB = await prisma.user.findFirstOrThrow({
      select: {
        salt: false,
        password: true,
        email: true,
        name: true,
        userID: true,
        username: true,
      },
      where: {
        email: loginData.email,
      },
    });

    return _userDB;
  }
}
