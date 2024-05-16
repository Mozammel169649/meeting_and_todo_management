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

enum is_complete {
    pending = 'pending',
    running = 'running',
    completed = 'completed',
}

const tableName = 'lone_application';
const modelName = 'LoneApplicationModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;
type status = 'active' | 'deactive';

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare branch_id: number;
    declare branch_teacher_id: number;
    declare branch_staff_id: number;
    declare lone_type_id: number;

    declare need_date: string;
    declare application_date: string;
    declare will_pay_date: string;
    declare given_date: string;

    declare application_status: is_complete;
    declare reason: string;
    declare attachments: string;
    declare requst_amount: Number;
    declare pay_amount: Number;

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
            branch_teacher_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: false,
            },
            branch_staff_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: false,
            },
            lone_type_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: false,
            },

            given_date: {
                type: new DataTypes.DATE(),
                allowNull: true,
            },
            application_date: {
                type: new DataTypes.DATE(),
                allowNull: true,
            },
            will_pay_date: {
                type: new DataTypes.DATE(),
                allowNull: true,
            },
            need_date: {
                type: new DataTypes.DATE(),
                allowNull: true,
            },
            application_status: {
                type: new DataTypes.ENUM('pending', 'running', 'completed'),
                allowNull: true,
            },
            reason: {
                type: new DataTypes.STRING(),
                allowNull: true,
            },
            attachments: {
                type: new DataTypes.STRING(),
                allowNull: true,
            },
            requst_amount: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
            },
            pay_amount: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: true,
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
