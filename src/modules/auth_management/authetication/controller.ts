'use strict';
import { FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import { responseObject } from '../../common_types/object';
import login from './services/login';
import register from './services/register';
import forget from './services/forget';
import auth_user from './services/auth_user';

export default function (fastify: FastifyInstance) {
    return {
        login: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await login(fastify, req);
            res.code(200).send(data);
        },

        auth_user: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await auth_user(fastify, req);
            res.code(200).send(data);
        },

        register: async function (req: FastifyRequest, res: FastifyReply) {
            let data = await register(fastify, req);
            res.code(data.status).send(data);
        },

        forget: async function (req: FastifyRequest, res: FastifyReply) {
            let data: responseObject = await forget(fastify, req);
            res.code(data.status).send(data);
        },
    };
}
