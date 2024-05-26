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
            asset_category_id,
            asset_type_id,
            purchase_date,
            purchase_cost,
            current_value,
            waranty_date,
            attachments,
        ) {
            data.push({
                branch_id,
                asset_category_id,
                asset_type_id,
                purchase_date,
                purchase_cost,
                current_value,
                waranty_date,
                attachments,
                status: 'active',
                created_at: '2024-02-14',
                updated_at: '2024-02-14',
            });
        }
        set_data(1, 1, 1, '2024-02-14', 123, 100, '2024-02-14', 'file2.pdf');
        set_data(2, 2, 2, '2024-02-14', 123, 100, '2024-02-14', 'file2.pdf');
        set_data(3, 3, 3, '2024-02-14', 123, 100, '2024-02-14', 'file2.pdf');

        await queryInterface.bulkDelete('assets', null, {});
        await queryInterface.bulkInsert('assets', data, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         
         npx sequelize-cli db:seed:all --config src/configs/db.json --seeders-path src/modules/user_management/user_students/models/seeders
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('assets', null, {});
    },
};
