import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CampaignReportsEntity } from '@app/modules/campaign-reports/db/campaign-reports.entity';
import { databaseConfig } from '@app/configs/database.config';

const dbConfig = databaseConfig();

const ormconfig: TypeOrmModuleOptions = {
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

export default ormconfig;
