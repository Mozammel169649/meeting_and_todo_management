import Fastify, {
    FastifyInstance,
    FastifyReply,
    FastifyRequest,
} from 'fastify';
import path from 'path';
import view from '@fastify/view';
import { sequelize } from './bootstrap/db.sql';

const AutoLoad = require('@fastify/autoload');
const underPressure = require('@fastify/under-pressure');
let sequelize_instance: any;
let appDir: string = path.resolve(path.dirname(__dirname));
let public_dir: string = path.resolve(appDir, 'public');
const fsp = require('fs').promises;

async function boot() {
    const fastify = Fastify({
        logger: true,
    });

    /** conver input files into buffer string */
    async function onFile(part: any) {
        console.log({ part });
        if (part.type == 'file') {
            const buff = await part.toBuffer();
            part.value = {};
            if (part.filename) {
                part.value = {
                    data: await Buffer.from(buff, 'base64'),
                    name: part.filename,
                    ext: '.' + part.filename.split('.')[1],
                };
            }
        }
    }

    fastify.register(require('@fastify/multipart'), {
        attachFieldsToBody: 'keyValues',
        onFile,
        limits: {
            fileSize: 6000000 * 10,
        },
    });
    /** find all module routes */
    async function findAllRoutesFiles(dir: any) {
        let results: any = [];
        async function recursiveSearch(currentPath: any) {
            const entries = await fsp.readdir(currentPath, {
                withFileTypes: true,
            });
            for (let entry of entries) {
                const fullPath = path.join(currentPath, entry.name);
                if (entry.isDirectory()) {
                    await recursiveSearch(fullPath);
                } else if (entry.name === 'routes.ts') {
                    results.push(fullPath);
                }
            }
        }
        await recursiveSearch(dir);
        return results;
    }

    /** register routes */
    await findAllRoutesFiles('./src/modules')
        .then((files: string[]) => {
            files.forEach((routes: string) => {
                fastify.register(require(path.resolve(appDir, routes)), {
                    prefix: 'api/v1',
                });
            });
        })
        .catch((err) => {
            console.error('Error searching for route files:', err);
        });

    /** register all dependencies */
    fastify
        .register(AutoLoad, {
            dir: path.join(__dirname, 'plugins'),
        })
        .register(AutoLoad, {
            dir: path.join(__dirname, 'routes'),
        })
        .register(require('@fastify/cookie'), {
            secret: 'fast#2$4@4!cokie02ms',
            hook: 'onRequest',
            parseOptions: {
                httpOnly: true,
                secure: true,
            },
        })
        .register(underPressure, {
            maxEventLoopDelay: 1000,
            maxHeapUsedBytes: 1000000000000,
            maxRssBytes: 1000000000000,
            maxEventLoopUtilization: 0.98,
            message: 'Under pressure!',
            retryAfter: 50,
            pressureHandler: (
                req: FastifyRequest,
                rep: FastifyReply,
                type: string,
                value: string,
            ) => {
                if (type === underPressure.TYPE_HEAP_USED_BYTES) {
                    fastify.log.warn(`too many heap bytes used: ${value}`);
                } else if (type === underPressure.TYPE_RSS_BYTES) {
                    fastify.log.warn(`too many rss bytes used: ${value}`);
                }
                // rep.send('out of memory')
            },
        })
        .register(view, {
            engine: {
                ejs: require('ejs'),
            },
            root: path.join(public_dir, 'views'),
        })
        .register(require('@fastify/static'), {
            root: public_dir,
            prefix: '/',
        })
        .setNotFoundHandler(function (req: FastifyRequest, res: FastifyReply) {
            (fastify as any).set_log('404', {}, res, req);
        })
        .setErrorHandler(async (error, req, res) => {
            console.log(error);
            (fastify as any).set_log('500', error, res, req);
        })
        .addHook('onRequest', async (request, reply) => {
            console.log('-------------');
            console.log('');

            request.raw.on('close', () => {
                console.log('sequelize instance closed');
                sequelize_instance.close();

                console.log('');
                console.log('-------------');
            });
        });

    try {
        fastify.listen({ port: 5000 }).then(() => {
            console.log('Server is running on http://127.0.0.1:5000');
        });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

sequelize().then((res: any = {}) => {
    sequelize_instance = res.sequelize;
    boot();
});
