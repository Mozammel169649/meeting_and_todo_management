import db from '../models/db';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { body, validationResult } from 'express-validator';
import {
    anyObject,
    responseObject,
    Request,
} from '../../../common_types/object';
import response from '../helpers/response';
import { InferCreationAttributes } from 'sequelize';

async function validate(req: Request) {
    await body('id')
        .not()
        .isEmpty()
        .withMessage('the id field is required')
        .run(req);

    await body('branch_id')
        .not()
        .isEmpty()
        .withMessage('the name field is required')
        .run(req);

    await body('title')
        .not()
        .isEmpty()
        .withMessage('the preferred name field is required')
        .run(req);

    await body('description')
        .not()
        .isEmpty()
        .withMessage('the preferred name field is required')
        .run(req);

    await body('date')
        .not()
        .isEmpty()
        .withMessage('the preferred name field is required')
        .run(req);


    let result = await validationResult(req);

    return result;
}

async function update(
    fastify_instance: FastifyInstance,
    req: FastifyRequest,
): Promise<responseObject> {
    /** validation */
    let validate_result = await validate(req as Request);
    if (!validate_result.isEmpty()) {
        return response(422, 'validation error', validate_result.array());
    }

    /** initializations */
    let models = await db();
    let body = req.body as anyObject;
    let model = new models.MeetingsModel();

    let inputs: InferCreationAttributes<typeof model> = {
        branch_id: body.branch_id,
        title: body.title,
        description: body.description,
        date: body.date
    };

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        let data = await models.MeetingsModel.findByPk(body.id);
        if (data) {
            data.update(inputs);
            await data.save();
            return response(200, 'data updated', data);
        } else {
            return response(500, 'data update failed', {
                error: 'data not found by given query',
            });
        }
    } catch (error) {
        return response(500, 'data creation error', { error });
    }
}

export default update;
