import Fastify from 'fastify';
import fastifyJWT from '@fastify/jwt';

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyJWT, {
  secret: process.env.SECRET_KEY,
});

export { fastify };
