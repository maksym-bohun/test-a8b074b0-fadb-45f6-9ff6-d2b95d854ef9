import * as dotenv from 'dotenv';
dotenv.config();

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CampaignReportsEntity } from '@app/modules/campaign-reports/db/campaign-reports.entity';
import { databaseConfig } from '@app/configs/database.config';

const dbConfig = databaseConfig();

export const ormconfig: TypeOrmModuleOptions = {
  type: dbConfig.type as 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.db,
  entities: [CampaignReportsEntity],
  synchronize: true,
  logging: false,
};

export const AppDataSource = new DataSource({
  type: dbConfig.type as 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.db,
  entities: [CampaignReportsEntity],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: false,
});

export default ormconfig;
