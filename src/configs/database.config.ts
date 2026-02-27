import { getEnvValue, getEnvValueOrThrow } from '@app/utils/get-env';
import { EnvEnum } from '@app/common/enums/env.enum';

export interface IDatabaseConfig {
  host: string;
  port: number;
  db: string;
  username: string | undefined;
  password: string | undefined;
  url: string;
  type: string;
}

export const databaseConfig = (): IDatabaseConfig => {
  const host = getEnvValue(EnvEnum.DB_HOST) || 'localhost';
  const port = Number(getEnvValue(EnvEnum.DB_PORT) || 5432);
  const db = getEnvValue(EnvEnum.DB_DATABASE) || 'default_db';
  const username = getEnvValueOrThrow(EnvEnum.DB_USERNAME);
  const password = getEnvValueOrThrow(EnvEnum.DB_PASSWORD);

  let typeRaw = getEnvValue(EnvEnum.DB_TYPE) || 'postgresql';
  const type = typeRaw === 'postgresql' ? 'postgres' : typeRaw;

  const url = `${type}://${username}:${password}@${host}:${port}/${db}`;

  return {
    host,
    port,
    db,
    username,
    password,
    url,
    type,
  };
};
