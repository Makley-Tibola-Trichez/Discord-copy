import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import { fastify } from '../lib/fastify';

export class AuthController {
  constructor() {
    throw new Error(`class ${this.constructor.name}`);
  }

  static async register(request: FastifyRequest, reply: FastifyReply) {
    const _parsedBody = z
      .object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(8),
      })
      .parse(request.body);

    const _salt = await bcrypt.genSalt();
    const _hashedPassword = await bcrypt.hash(_parsedBody.password, _salt);

    await prisma.$connect();

    await prisma.users.create({
      data: { ..._parsedBody, password: _hashedPassword, salt: _salt },
    });

    await prisma.$disconnect();

    reply.statusCode = 204;
  }

  static async login(request: FastifyRequest, reply: FastifyReply) {
    const _parsedBody = z
      .object({
        email: z.string().email(),
        password: z.string(),
      })
      .parse(request.body);

    await prisma.$connect();

    const _userDB = await prisma.users.findFirstOrThrow({
      where: {
        email: _parsedBody.email,
      },
    });
    await prisma.$disconnect();

    const _result = await bcrypt.compare(
      _parsedBody.password,
      _userDB.password,
    );

    if (!_result) {
      reply.statusCode = 401;
      return;
    }

    const token = fastify.jwt.sign(
      {
        user: {
          email: _userDB.email,
          name: _userDB.name,
          userID: _userDB.userID,
        },
      },
      {
        expiresIn: '180000',
      },
    );

    reply.send({ token });
  }

  static async verifyToken(request: FastifyRequest, reply: FastifyReply) {
    const { token } = z
      .object({ token: z.string().min(10, 'Token inválido') })
      .parse(request.body);

    try {
      fastify.jwt.verify(token);
      return { isValid: true };
    } catch (error) {
      return { isValid: false };
    }
  }
}
