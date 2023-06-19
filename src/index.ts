import Fastify from 'fastify';
import { z } from 'zod';

import bcrypt from 'bcrypt';
import { prisma } from './lib/prisma';

const fastify = Fastify({
  logger: true,
});

fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' });
});

fastify.post('/sign-up', async (request, reply) => {
  const _parsedBody = await z
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
});

fastify.post('/sign-in', async (request, reply) => {
  const _parsedBody = z
    .object({
      email: z.string().email(),
      password: z.string().min(8),
    })
    .parse(request.body);

  await prisma.$connect();

  const _userDB = await prisma.users.findFirstOrThrow({
    where: {
      email: _parsedBody.email,
    },
  });
  await prisma.$disconnect();

  const _result = await bcrypt.compare(_parsedBody.password, _userDB.password);

  if (!_result) {
    reply.statusCode = 401;
    return;
  }

  reply.statusCode = 204;
});

fastify.post('/auth', (request, reply) => {});

fastify.listen({ port: 8080 }, (err, address) => {
  if (err) throw err;
});
