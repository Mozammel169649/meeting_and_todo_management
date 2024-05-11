import { FastifyReply, FastifyRequest } from 'fastify';
import { anyObject } from '../../../common_types/object';
import db from '../models/db';
import { env } from 'process';

const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
    const secretKey = env.JTI;
    const jwt = require('jsonwebtoken');
    const token = request.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        reply.code(401).send({ error: 'Unauthorized' });
        return;
    }

    try {
        const decoded = jwt.verify(token.slice(7), secretKey);
        let models = await db();
        let user = await models.User.findByPk(decoded.id);
        if (user && user.token == decoded.token) {
            (request as anyObject).user = decoded;
            return;
        } else {
            reply.code(401).send({ error: 'Unauthorized' });
            return;
        }
    } catch (error) {
        reply.code(401).send({ error: 'Unauthorized' });
        return;
    }
};

export default authenticate;
