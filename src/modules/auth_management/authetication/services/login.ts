import { FindAndCountOptions, Model } from 'sequelize';
import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import response from '../helpers/response';
var bcrypt = require('bcrypt');

import {
    anyObject,
    responseObject,
    Request,
} from '../../../common_types/object';
import { env } from 'process';

async function login(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    let models = await db();
    let body: anyObject = req.body as anyObject;

    try {
        let data: anyObject | null = {};
        let token: anyObject = {};
        if (body) {
            data = await models.User.findOne({
                where: {
                    email: body.email,
                },
            });

            if (data) {
                let check_pass = await bcrypt.compare(
                    body.password,
                    data.password,
                );

                if (check_pass) {
                    let jwt = require('jsonwebtoken');
                    const secretKey = env.JTI;
                    let secret = Math.random().toString(36).substring(2, 10);
                    token = await jwt.sign(
                        { id: data.id, token: secret },
                        secretKey,
                    );

                    data.token = secret;
                    await data.save();
                }
            }
        }
        return response(200, 'data fetched', { token });
    } catch (error) {
        return response(500, 'data fetching failed', { error });
    }
}

export default login;
