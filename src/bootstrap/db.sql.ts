"use strict"
import { Sequelize, DataTypes, Model } from 'sequelize';
import path from 'path';
require('dotenv').config();

const fsp = require('fs').promises;
interface Database {
    [key: string]: any;
}
let db: Database = {};
let appDir: string = path.resolve(path.dirname(__dirname));

export interface sequelize_response {
    sequelize: Sequelize | null;
    // db: { [key: string]: Model };
}

export const sequelize = function (): Promise<sequelize_response> {
    return new Promise(async (resolve, reject) => {
        
        let db = process?.env.DB_DATABASE || '';
        let user = process?.env.DB_USER || '';
        let pass = process?.env.DB_PASS || '';

        const sequelize: Sequelize = new Sequelize(db, user, pass, {
            host: 'localhost',
            dialect: 'mysql',
            // logging: console.log,
        });

        try {
            await sequelize.authenticate();
            resolve({
                sequelize: sequelize
            });

            console.log('Connection has been established successfully.');

            // async function findAllModelsFiles(dir: any) {
            //     let results: any = [];
            //     async function recursiveSearch(currentPath: any) {
            //         const entries = await fsp.readdir(currentPath, { withFileTypes: true });
            //         for (let entry of entries) {
            //             const fullPath = path.join(currentPath, entry.name);
            //             if (currentPath.includes('models') && entry.name.includes('.js')) {
            //                 results.push(fullPath);
            //             }
            //             else if (entry.isDirectory() && !currentPath.includes('models')) {
            //                 await recursiveSearch(fullPath);
            //             }
            //         }
            //     }

            //     await recursiveSearch(dir);
            //     return results;
            // }

            // await findAllModelsFiles(path.resolve(appDir, `modules`))
            //     .then((files: string[]) => {
            //         files.forEach(async (routes: string) => {
            //             // let model_name = routes.substring(routes.lastIndexOf("\\") + 1, routes.length - 3);
            //             // const model = require(path.resolve(appDir, routes))(sequelize, DataTypes);
            //             // db[model.name] = model;
            //             const model = await import(routes);
            //             db[model.name] = model;

            //         });
            //     }).catch(err => {
            //         console.error('Error searching for route files:', err);
            //     });


        } catch (error) {
            console.error('Unable to connect to the database:', error);
            reject(false);
        }
    })
}
