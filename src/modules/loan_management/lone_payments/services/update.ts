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

    await body('lone_id')
        .not()
        .isEmpty()
        .withMessage('the lone_id field is required')
        .run(req);

    await body('date')
        .not()
        .isEmpty()
        .withMessage('the date field is required')
        .run(req);

    await body('amount')
        .not()
        .isEmpty()
        .withMessage('the amount field is required')
        .run(req);

    await body('next_payment_date')
        .not()
        .isEmpty()
        .withMessage('the next_payment_date field is required')
        .run(req);
        
    await body('rest_amount')
        .not()
        .isEmpty()
        .withMessage('the rest_amount field is required')
        .run(req);

    await body('paid_amount')
        .not()
        .isEmpty()
        .withMessage('the paid_amount field is required')
        .run(req);
        
    await body('received_by')
        .not()
        .isEmpty()
        .withMessage('the received_by field is required')
        .run(req);

    await body('account_log_id')
        .not()
        .isEmpty()
        .withMessage('the account_log_id field is required')
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
    let model = new models.LonePaymentsModel();

    let inputs: InferCreationAttributes<typeof model> = {
        branch_id: body.branch_id,
        lone_id: body.lone_id,
        date: body.date,
        amount: body.amount,

        next_payment_date: body.next_payment_date,
        rest_amount: body.rest_amount,
        paid_amount: body.paid_amount,
        received_by: body.received_by,
        account_log_id: body.account_log_id,
    };

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        let data = await models.LonePaymentsModel.findByPk(body.id);
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
