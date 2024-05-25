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
            asset_id,
            useful_life_months,
            current_value,
            last_depreciation_date,
            after_depreciation_value,
            depreciation_interval,
            depreciation_amount,
            depreciation_unit,
            approximate_lasting_duration,
        ) {
            data.push({
                branch_id,
                asset_id,
                useful_life_months,
                current_value,
                last_depreciation_date,
                after_depreciation_value,
                depreciation_interval,
                depreciation_amount,
                depreciation_unit,
                approximate_lasting_duration,
                status: 'active',
                created_at: '2024-02-14',
                updated_at: '2024-02-14',
            });
        }
        set_data(
            1,
            1,
            '2024-02-14',
            1111,
            '2024-02-14',
            1111,
            'yearly',
            1111,
            'tk',
            '2024-02-14',
        );
        set_data(
            2,
            2,
            '2024-02-14',
            2222,
            '2024-02-14',
            2222,
            'yearly',
            2222,
            'tk',
            '2024-02-14',
        );
        set_data(
            3,
            3,
            '2024-02-24',
            3333,
            '2024-02-24',
            3333,
            'yearly',
            3333,
            'tk',
            '2024-02-24',
        );

        await queryInterface.bulkDelete('asset_depreciations', null, {});
        await queryInterface.bulkInsert('asset_depreciations', data, {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         
         npx sequelize-cli db:seed:all --config src/configs/db.json --seeders-path src/modules/user_management/user_students/models/seeders
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('asset_depreciations', null, {});
    },
};
