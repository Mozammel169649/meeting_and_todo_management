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

const tableName = 'assets';
const modelName = 'AssetsModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare branch_id: number;
    declare asset_category_id: number;
    declare asset_type_id: number;
    declare purchase_date: string;
    declare purchase_cost: number;
    declare current_value: number;
    declare waranty_date: string;
    declare attachments: string;

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
            asset_category_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: false,
            },
            asset_type_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: false,
            },
            purchase_date: {
                type: new DataTypes.DATE(),
                allowNull: false,
            },
            purchase_cost: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: false,
            },
            current_value: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: false,
            },
            waranty_date: {
                type: new DataTypes.DATE(),
                allowNull: false,
            },
            attachments: {
                type: new DataTypes.STRING(),
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
