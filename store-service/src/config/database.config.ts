import * as path from 'path';
import * as dotenv from 'dotenv';
import { Store } from 'src/entities/store.entity';

const dotenv_path = path.resolve(process.cwd(), `.env`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) { /* do nothing */ }

const entities = [Store];

export const DatabaseConfig = {
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: entities,
    synchronize: false
}

export default DatabaseConfig;