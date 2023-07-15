import Fastify, { FastifyInstance } from 'fastify';
import fastifyJWT from '@fastify/jwt';
import { isAuthenticated } from '../hooks/isAuthenticated';
import dotenv from 'dotenv';
import fastifyCors from '@fastify/cors';

dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyJWT, {
  secret: process.env.SECRET_KEY,
});
fastify.register(fastifyCors);

const _privateFastifyRoutes = (
  callback: (fastifyPrivate: FastifyInstance) => void,
) => {
  return fastify.register((fastifyPrivate, opts, done) => {
    fastifyPrivate.addHook('preHandler', isAuthenticated);
    callback(fastifyPrivate);
    done();
  });
};

const _publicFastifyRoutes = (
  callback: (fastifyPublic: FastifyInstance) => void,
) => {
  fastify.register((fastifyPublic, opts, done) => {
    callback(fastifyPublic);
    done();
  });
};

export const route = {
  private: _privateFastifyRoutes,
  public: _publicFastifyRoutes,
};

export { fastify };
