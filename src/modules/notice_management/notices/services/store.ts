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

    await body('notice_category_id')
        .not()
        .isEmpty()
        .withMessage('the notice_category_id field is required')
        .run(req);

    await body('title')
        .not()
        .isEmpty()
        .withMessage('the title field is required')
        .run(req);

    await body('description')
        .not()
        .isEmpty()
        .withMessage('the description field is required')
        .run(req);

    await body('attachment')
        .not()
        .isEmpty()
        .withMessage('the attachment field is required')
        .run(req);

    await body('image')
        .not()
        .isEmpty()
        .withMessage('the image field is required')
        .run(req);

    await body('notice_for')
        .not()
        .isEmpty()
        .withMessage('the notice_for field is required')
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
    let data = new models.NoticesModel();

    let inputs: InferCreationAttributes<typeof data> = {
        branch_id: body.branch_id,
        notice_category_id: body.notice_category_id,
        title: body.title,
        description: body.description,
        attachment: body.attachment,
        image: body.image,
        notice_for: body.notice_for,
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
