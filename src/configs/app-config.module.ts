import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from '@app/configs/database.config';
import { appConfig } from '@app/configs/app.config';

export enum ECfg {
  DATABASE = 'database',
  APP = 'app',
}

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
      load: [
        () => ({ [ECfg.DATABASE]: databaseConfig() }),
        () => ({ [ECfg.APP]: appConfig() }),
      ],
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppConfigModule {}
