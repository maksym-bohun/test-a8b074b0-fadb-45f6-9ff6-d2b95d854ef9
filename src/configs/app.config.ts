import { EnvEnum } from '@app/common/enums/env.enum';

export interface IAppConfig {
  port: number;
  probationApiKey: string;
  probationApiUrl: string;
}

const getEnvValueOrThrow = (env: EnvEnum | string): string => {
  const value = process.env[env];
  if (!value) {
    throw new Error(env + ' environment variable is not configured');
  }
  return value;
};

export const appConfig = (): IAppConfig => {
  const port = Number(getEnvValueOrThrow(EnvEnum.PORT));
  const probationApiKey = getEnvValueOrThrow(EnvEnum.PROBATION_API_KEY);
  const probationApiUrl = getEnvValueOrThrow(EnvEnum.PROBATION_API_URL);

  return {
    port,
    probationApiKey,
    probationApiUrl,
  };
};
