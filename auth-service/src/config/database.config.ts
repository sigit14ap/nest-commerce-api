import * as path from 'path';
import * as dotenv from 'dotenv';
import { Auth } from 'src/auth/auth.entity';

const dotenv_path = path.resolve(process.cwd(), `.env`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) { /* do nothing */ }

const entities = [Auth];

export const DatabaseConfig = {
    type: process.env.AUTH_DB_TYPE as any,
    host: process.env.AUTH_DB_HOST,
    port: parseInt(process.env.AUTH_DB_PORT),
    username: process.env.AUTH_DB_USERNAME,
    password: process.env.AUTH_DB_PASSWORD,
    database: process.env.AUTH_DB_NAME,
    entities: entities,
    synchronize: false,
    migrations: [
      "src/migrations/*.ts"
    ],
    migrationsTableName: "migrations",
    cli: {
      "migrationsDir": "src/migrations"
    },
    seeds: [
      "/usr/src/eliteopinio/backend/dist/**/entities/*.seeder.{js,ts}"
    ],
    factories: [
      "/usr/src/eliteopinio/backend/dist/**/entities/*.factory.{js,ts}"
    ]
}

export default DatabaseConfig;