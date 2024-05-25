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
        function set_data(branch_id, asset_audit_id, asset_id, feedback) {
            data.push({
                branch_id,
                asset_audit_id,
                asset_id,
                feedback,
                status: 'active',
                created_at: '2024-02-14',
                updated_at: '2024-02-14',
            });
        }
        set_data(1, 1, 1, 'lost');
        set_data(2, 2, 2, 'lost');
        set_data(3, 3, 3, 'lost');

        await queryInterface.bulkDelete('asset_audits_items', null, {});
        await queryInterface.bulkInsert('asset_audits_items', data, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         
         npx sequelize-cli db:seed:all --config src/configs/db.json --seeders-path src/modules/user_management/user_students/models/seeders
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('asset_audits_items', null, {});
    },
};
