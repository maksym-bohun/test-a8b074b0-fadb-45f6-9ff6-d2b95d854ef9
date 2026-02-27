import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { TypeormHealthIndicator } from '@app/database/typeorm.health';
import { AppConfigModule } from '@app/configs/app-config.module';

@Module({
  imports: [
    TerminusModule,
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => ormconfig,
    }),
  ],
  providers: [TypeormHealthIndicator],
  controllers: [AppController],
})
export class AppModule {}
