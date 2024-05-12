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
    await body('branch_id')
        .not()
        .isEmpty()
        .withMessage('the branch_id field is required')
        .run(req);

    await body('task_id')
        .not()
        .isEmpty()
        .withMessage('the task_id field is required')
        .run(req);
        
    await body('variants_id')
        .not()
        .isEmpty()
        .withMessage('the variants_id field is required')
        .run(req);
   

    let result = await validationResult(req);

    return result;
}

async function store(
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
    let data = new models.TasksVariantsTasksModel();

    let inputs: InferCreationAttributes<typeof data> = {
        branch_id: body.branch_id,
        task_id: body.task_id,
        variants_id: body.variants_id
    };

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        (await data.update(inputs)).save();
        return response(200, 'data created', data);
    } catch (error) {
        return response(500, 'data creation error', { error });
    }
}

export default store;
