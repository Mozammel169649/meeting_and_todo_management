'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        let data = [];
        function set_data(
            branch_id,
            branch_teacher_id,
            branch_staff_id,
            lone_type_id,
            need_date,
            application_date,
            will_pay_date,
            given_date,
            application_status,
            reason,
            attachments,
            requst_amount,
            pay_amount,
        ) {
            data.push({
                branch_id,
                branch_teacher_id,
                branch_staff_id,
                lone_type_id,
                need_date,
                application_date,
                will_pay_date,
                given_date,
                application_status,
                reason,
                attachments,
                requst_amount,
                pay_amount,
                status: 'active',
                created_at: '2024-02-14',
                updated_at: '2024-02-14',
            });
        }
        set_data(
            1,
            1,
            1,
            1,
            '2024-02-14',
            '2024-02-14',
            '2024-02-14',
            '2024-02-14',
            'completed',
            'i want to invest my business',
            'file2.pdf',
            10000,
            10000,
        );
        set_data(
            2,
            2,
            2,
            2,
            '2024-02-14',
            '2024-02-14',
            '2024-02-14',
            '2024-02-14',
            'completed',
            'i want to invest my business',
            'file2.pdf',
            10000,
            10000,
        );
        set_data(
            3,
            3,
            3,
            3,
            '2024-02-14',
            '2024-02-14',
            '2024-02-14',
            '2024-02-14',
            'completed',
            'i want to invest my business',
            'file2.pdf',
            10000,
            10000,
        );

        await queryInterface.bulkDelete('lone_application', null, {});
        await queryInterface.bulkInsert('lone_application', data, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         
         npx sequelize-cli db:seed:all --config src/configs/db.json --seeders-path src/modules/user_management/user_students/models/seeders
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('lone_application', null, {});
    },
};
