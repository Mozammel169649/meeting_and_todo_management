'use strict';
import { FastifyInstance } from 'fastify';
import controller from './controller';
import authenticate from './services/authenticate';

module.exports = async function (fastify: FastifyInstance) {
    let prefix: string = '/auth';
    const controllerInstance = controller(fastify);

    fastify
        .post(`${prefix}/login`, controllerInstance.login)
        .get(
            `${prefix}/info`,
            { preHandler: authenticate },
            controllerInstance.auth_user,
        )
        .post(`${prefix}/register`, controllerInstance.register)
        .post(`${prefix}/forget`, controllerInstance.forget);
};
