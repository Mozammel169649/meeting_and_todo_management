'use strict';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
// const fs = require('node:fs');
module.exports = async function (fastify: FastifyInstance) {
    fastify
        .get('/', async (req: FastifyRequest, reply: FastifyReply) => {
            return reply.view('index.ejs', { text: 'Hello EJS!' });
        })
        .get('/login', async (req: FastifyRequest, reply: FastifyReply) => {
            return reply.view('login.ejs');
        })
        .get('/about', async function (request, reply) {
            return (reply as any).cookie('baz', 'baz').view('about.ejs', {
                data: 'about page',
            });
        })
        .post('/c', async function (req: FastifyRequest) {
            const { body, validationResult } = require('express-validator');
            console.log('request', req.body);

            return { a: 'sdf' };
            // await body('title')
            //     .not()
            //     .isEmpty()
            //     .withMessage('the title field is required')
            //     .run(req);

            // let result = validationResult(req);

            // let bodys: {
            //     'image[]': {
            //         data: string;
            //         name: string;
            //         ext: string;
            //     }[];
            // } = (req as any).body;

            // if (bodys['image[]'].length) {
            //     // console.log(bodys['image[]'][0]);
            //     fastify.upload(
            //         bodys['image[]'][0],
            //         'uploads/users/' + bodys['image[]'][0].name,
            //     );
            // }

            // return { d: 'uploads/', errors: result.array() };
        });
};
