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
        function set_data(branch_id, title, description, date) {
            data.push({
                branch_id,
                title,
                description,
                date,
                status: 'active',
                created_at: '2024-02-14',
                updated_at: '2024-02-14',
            });
        }
        set_data(1, 1, 'mozammel hossain', '2024-02-14');
        set_data(2, 2, 'al-amin hossain', '2024-02-14');
        set_data(3, 3, 'maruf hossain', '2024-02-14');

        await queryInterface.bulkDelete('asset_audits', null, {});
        await queryInterface.bulkInsert('asset_audits', data, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         
         npx sequelize-cli db:seed:all --config src/configs/db.json --seeders-path src/modules/user_management/user_students/models/seeders
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('asset_audits', null, {});
    },
};
