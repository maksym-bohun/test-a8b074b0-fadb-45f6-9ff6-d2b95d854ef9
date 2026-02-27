import { EnvEnum } from '@app/common/enums/env.enum';
import * as process from 'node:process';

export const getEnvValue = (env: EnvEnum | string): string | undefined => {
  return process.env[env];
};

export const getEnvValueOrThrow = (env: EnvEnum | string): string => {
  const value = process.env[env];
  if (!value) {
    throw new Error(env + ' environment variable is not configured');
  }
  return value;
};
