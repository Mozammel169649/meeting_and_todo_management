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

    await body('category_id')
        .not()
        .isEmpty()
        .withMessage('the category_id field is required')
        .run(req);

    await body('notice_id')
        .not()
        .isEmpty()
        .withMessage('the notice_id field is required')
        .run(req);
    await body('teacher_id')
        .not()
        .isEmpty()
        .withMessage('the teacher_id field is required')
        .run(req);
    await body('staff_id')
        .not()
        .isEmpty()
        .withMessage('the staff_id field is required')
        .run(req);
    await body('student_id')
        .not()
        .isEmpty()
        .withMessage('the student_id field is required')
        .run(req);
    await body('parent_id')
        .not()
        .isEmpty()
        .withMessage('the parent_id field is required')
        .run(req);
    await body('admin_id')
        .not()
        .isEmpty()
        .withMessage('the admin_id field is required')
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
    let model = new models.NoticeSeenByUsersModel();

    let inputs: InferCreationAttributes<typeof model> = {
        branch_id: body.branch_id,
        category_id: body.category_id,
        notice_id: body.notice_id,
        admin_id: body.admin_id,
        teacher_id: body.teacher_id,
        student_id: body.student_id,
        staff_id: body.staff_id,
        parent_id: body.parent_id,
    };

    /** print request data into console */
    // console.clear();
    // (fastify_instance as any).print(inputs);

    /** store data into database */
    try {
        let data = await models.NoticeSeenByUsersModel.findByPk(body.id);
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
