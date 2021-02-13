import { ConnectionOptions, createConnection, getConnectionOptions } from 'typeorm';

createConnection()

const getOptions = async () => {
    let connectionOptions: ConnectionOptions;
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
        Object.assign(connectionOptions, { url: process.env.DATABASE_URL })
    } else {
        connectionOptions = await getConnectionOptions(); 
    }
    return connectionOptions;
}

const connect2Database = async (): Promise<void> => {
    const typeormconfig = await getOptions();
    await createConnection(typeormconfig);
};

export default connect2Database