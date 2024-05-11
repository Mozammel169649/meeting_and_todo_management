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
    nexttime = 'nexttime',
}

const tableName = 'task_users';
const modelName = 'TaskUsersModel';

type Infer = InferAttributes<DataModel>;
type InferCreation = InferCreationAttributes<DataModel>;

class DataModel extends Model<Infer, InferCreation> {
    declare id?: CreationOptional<number>;

    declare branch_id: number;
    declare task_id: number;
    declare staff_id: number;
    declare teacher_id: number;
    declare admin_id: number;
    declare is_complete: is_complete;

    declare creator?: number;
    declare status?: number;
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
            staff_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: false,
            },
            teacher_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: false,
            },
            admin_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: false,
            },
            task_id: {
                type: new DataTypes.BIGINT().UNSIGNED,
                allowNull: false,
            },
            
            is_complete: {
                type: new DataTypes.ENUM(
                    'pending',
                    'running',
                    'completed',
                    'nexttime',
                ),
                allowNull: true,
            },

            
            creator: {
                type: new DataTypes.TINYINT(),
                allowNull: true,
                defaultValue: null,
            },
            status: {
                type: new DataTypes.TINYINT(),
                allowNull: true,
                defaultValue: 1,
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
