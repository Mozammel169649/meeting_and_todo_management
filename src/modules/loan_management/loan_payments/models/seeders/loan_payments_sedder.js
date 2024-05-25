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
            lone_id,
            date,
            amount,
            next_payment_date,
            rest_amount,
            paid_amount,
            received_by,
            account_log_id,
        ) {
            data.push({
                branch_id,
                lone_id,
                date,
                amount,
                next_payment_date,
                rest_amount,
                paid_amount,
                received_by,
                account_log_id,
                status: 'active',
                created_at: '2024-02-14',
                updated_at: '2024-02-14',
            });
        }
        set_data(
            1,
            1,
            '2024-02-14',
            12000,
            '2024-02-14',
            12000,
            12000,
            'mozammel hossain',
            1,
        );
        set_data(
            2,
            2,
            '2024-02-14',
            12000,
            '2024-02-14',
            12000,
            12000,
            'mozammel hossain',
            2,
        );
        set_data(
            3,
            3,
            '2024-02-14',
            12000,
            '2024-02-14',
            12000,
            12000,
            'mozammel hossain',
            3,
        );

        await queryInterface.bulkDelete('lone_payments', null, {});
        await queryInterface.bulkInsert('lone_payments', data, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         
         npx sequelize-cli db:seed:all --config src/configs/db.json --seeders-path src/modules/user_management/user_students/models/seeders
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('lone_payments', null, {});
    },
};
