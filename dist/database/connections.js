"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
typeorm_1.createConnection();
const getOptions = async () => {
    let connectionOptions;
    connectionOptions = {
        type: "postgres",
        logging: false,
        extra: {
            ssl: true,
        },
        synchronize: false,
        entities: [
            "dist/models/*.js"
        ]
    };
    if (process.env.DATABASE_URL) {
        Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
    }
    else {
        connectionOptions = await typeorm_1.getConnectionOptions();
    }
    return connectionOptions;
};
const connect2Database = async () => {
    const typeormconfig = await getOptions();
    await typeorm_1.createConnection(typeormconfig);
};
exports.default = connect2Database;
