import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { fastify } from '../lib/fastify';

export async function isAuthenticated(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify();
  } catch (error) {
    reply.statusCode = 401;
    reply.send();
  }
}
