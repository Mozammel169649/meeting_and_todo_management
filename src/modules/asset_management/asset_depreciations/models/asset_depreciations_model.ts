import {
    // Association,
    DataTypes,
    // HasManyAddAssociationMixin,
    // HasManyCountAssociationsMixin,
    // HasManyCreateAssociationMixin,
    // HasManyGetAssociationsMixin,
    // HasManyHasAssociationMixin,
    // HasManySetAssociationsMixin,
    // HasManyAddAssociationsMixin,
    // HasManyHasAssociationsMixin,
    // HasManyRemoveAssociationMixin,
    // HasManyRemoveAssociationsMixin,
    Model,
    // ModelDefined,
    // Optional,
    Sequelize,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
    DefaultSetOptions,
    // NonAttribute,
    // ForeignKey,
} from 'sequelize';

const tableName = 'asset_depreciations';
const modelName = 'AssetDepreciationsModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive';
type depreciation_interval = 'yearly' | 'monthly' | '2 year';
type depreciation_unit = 'tk' | '%' | 'year';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare branch_id: number;
    declare asset_id: number;
    declare useful_life_months: string;
    declare current_value: number;
    declare last_depreciation_date: string;
    declare after_depreciation_value: number;
    declare depreciation_interval: depreciation_interval;
    declare depreciation_amount: number;
    declare depreciation_unit: depreciation_unit;
    declare approximate_lasting_duration: string;

    declare status?: status;
    declare creator?: number;
    declare created_at?: CreationOptional<Date>;
    declare updated_at?: CreationOptional<Date>;
}

function init(sequelize: Sequelize) {
    DataModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            branch_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: false,
            },
            asset_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: false,
            },
            useful_life_months: {
                type: new DataTypes.STRING(40),
                allowNull: false,
            },
            current_value: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: false,
            },
            last_depreciation_date: {
                type: new DataTypes.DATE(),
                allowNull: false,
            },
            after_depreciation_value: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: false,
            },
            depreciation_interval: {
                type: new DataTypes.ENUM('yearly', 'monthly', '2 year'),
                allowNull: false,
                defaultValue: 'yearly',
            },
            depreciation_amount: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: false,
            },
            depreciation_unit: {
                type: new DataTypes.ENUM('tk', '%', 'year'),
                allowNull: false,
                defaultValue: 'tk',
            },
            approximate_lasting_duration: {
                type: new DataTypes.DATE(),
                allowNull: false,
            },
            creator: {
                type: new DataTypes.TINYINT(),
                allowNull: true,
                defaultValue: null,
            },
            status: {
                type: new DataTypes.ENUM('active', 'deactive'),
                defaultValue: 'active',
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            tableName: tableName,
            modelName: modelName,
            sequelize, // passing the `sequelize` instance is required
            underscored: true,
        },
    );

    return DataModel;
}

export { init, DataModel };
