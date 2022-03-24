import * as path from 'path';
import * as dotenv from 'dotenv';
import { Province } from '../entities/province.entity';
import { City } from '../entities/city.entity';
import { DataSource, DataSourceOptions  } from "typeorm"

const dotenv_path = path.resolve(process.cwd(), `.env`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) { /* do nothing */ }

const entities = [Province, City];

export const dataSource: DataSourceOptions = {
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: entities,
    synchronize: false,
    migrationsRun: false,
    logging: true,
    logger: 'file',
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    // cli: {
    //     migrationsDir: 'src/migrations',
    // },
}

export default new DataSource(dataSource);
// export default DatabaseConfig;