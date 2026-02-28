import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { TypeormHealthIndicator } from '@app/database/typeorm.health';
import { AppConfigModule } from '@app/configs/app-config.module';
import { CampaignReportsModule } from '@app/modules/campaign-reports/campaign-reports.module';
import { ProbationModule } from '@app/modules/probation/probation.module';

@Module({
  imports: [
    TerminusModule,
    AppConfigModule,
    ProbationModule,
    CampaignReportsModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => ormconfig,
    }),
  ],
  providers: [TypeormHealthIndicator, CampaignReportsModule],
  controllers: [AppController],
})
export class AppModule {}
