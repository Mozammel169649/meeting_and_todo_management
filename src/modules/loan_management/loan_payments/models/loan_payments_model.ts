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

const tableName = 'lone_payments';
const modelName = 'LonePaymentsModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare branch_id: number;
    declare lone_id: number;
    declare date: string;
    declare amount: number;
    declare next_payment_date: string;
    declare rest_amount: Number;
    declare paid_amount: Number;
    declare received_by: string;
    declare account_log_id: Number;
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
            lone_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: false,
            },
            date: {
                type: new DataTypes.DATE(),
                allowNull: true,
            },
            amount: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            next_payment_date: {
                type: new DataTypes.DATE(),
                allowNull: true,
            },
            rest_amount: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            paid_amount: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            received_by: {
                type: new DataTypes.STRING(100),
                allowNull: true,
            },
            account_log_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            status: {
                type: new DataTypes.ENUM('active', 'deactive'),
                defaultValue: 'active',
            },

            creator: {
                type: new DataTypes.TINYINT(),
                allowNull: true,
                defaultValue: null,
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
