import bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';
import { createUserSchema, loginSchema } from '../schemas/auth.schemas';
import { AuthRepository } from '../repository/auth.repository';

export class AuthController {
  constructor() {
    throw new Error(`class ${this.constructor.name}`);
  }

  static async createUser(request: FastifyRequest, reply: FastifyReply) {
    const userData = createUserSchema.parse(request.body);

    await AuthRepository.createUser(userData);

    reply.statusCode = 204;
  }

  static async login(request: FastifyRequest, reply: FastifyReply) {
    const loginData = loginSchema.parse(request.body);

    const _userData = await AuthRepository.login(loginData);

    const _result = await bcrypt.compare(
      loginData.password,
      _userData.password,
    );

    if (!_result) {
      reply.statusCode = 401;
      return;
    }

    const token = await reply.jwtSign(
      {
        user: {
          email: _userData.email,
          name: _userData.name,
          userID: _userData.userID,
        },
      },
      {
        expiresIn: '1d',
      },
    );

    return { token };
  }

  static async verifyToken(request: FastifyRequest, reply: FastifyReply) {
    return request
      .jwtVerify()
      .then(() => ({ isValid: true }))
      .catch(() => ({ isValid: false }));
  }
}
