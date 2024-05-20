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
        .withMessage('the branch_id field is required')
        .run(req);

    await body('branch_teacher_id')
        .not()
        .isEmpty()
        .withMessage('the branch_teacher_id field is required')
        .run(req);

    await body('branch_staff_id')
        .not()
        .isEmpty()
        .withMessage('the branch_staff_id field is required')
        .run(req);

    await body('lone_type_id')
        .not()
        .isEmpty()
        .withMessage('the lone_type_id field is required')
        .run(req);

    await body('need_date')
        .not()
        .isEmpty()
        .withMessage('the need_date field is required')
        .run(req);

    await body('application_date')
        .not()
        .isEmpty()
        .withMessage('the application_date field is required')
        .run(req);

    await body('will_pay_date')
        .not()
        .isEmpty()
        .withMessage('the will_pay_date field is required')
        .run(req);

    await body('given_date')
        .not()
        .isEmpty()
        .withMessage('the given_date field is required')
        .run(req);

    await body('application_status')
        .not()
        .isEmpty()
        .withMessage('the application_status field is required')
        .run(req);

    await body('reason')
        .not()
        .isEmpty()
        .withMessage('the reason field is required')
        .run(req);

    await body('attachments')
        .not()
        .isEmpty()
        .withMessage('the attachments field is required')
        .run(req);

    await body('requst_amount')
        .not()
        .isEmpty()
        .withMessage('the requst_amount field is required')
        .run(req);

    await body('pay_amount')
        .not()
        .isEmpty()
        .withMessage('the pay_amount field is required')
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
    let model = new models.LoneApplicationModel();

    let inputs: InferCreationAttributes<typeof model> = {
        branch_id: body.branch_id,
        branch_teacher_id: body.branch_teacher_id,
        branch_staff_id: body.branch_staff_id,
        lone_type_id: body.lone_type_id,
        need_date: body.need_date,
        application_date: body.application_date,
        will_pay_date: body.will_pay_date,
        given_date: body.given_date,
        application_status: body.application_status,
        reason: body.reason,
        attachments: body.attachments,
        requst_amount: body.requst_amount,
        pay_amount: body.pay_amount,
    };

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        let data = await models.LoneApplicationModel.findByPk(body.id);
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
