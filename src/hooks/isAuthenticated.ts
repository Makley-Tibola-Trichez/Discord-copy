import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { fastify } from '../lib/fastify';

export function isAuthenticated(
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
) {
  try {
    const _authorization = request.headers.authorization ?? '';

    fastify.jwt.verify(_authorization.split('Bearer ')[1]);
  } catch (error) {
    reply.statusCode = 401;
    reply.send();
  }
  done();
}
