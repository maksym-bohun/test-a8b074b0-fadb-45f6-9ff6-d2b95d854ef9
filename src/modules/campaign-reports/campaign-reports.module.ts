import { Module } from '@nestjs/common';
import { CampaignReportsController } from '@app/modules/campaign-reports/campaign-reports.controller';
import { CampaignReportsService } from '@app/modules/campaign-reports/campaign-reports.service';
import { ProbationModule } from '@app/modules/probation/probation.module';

@Module({
  imports: [ProbationModule],
  controllers: [CampaignReportsController],
  providers: [CampaignReportsService],
  exports: [CampaignReportsService],
})
export class CampaignReportsModule {}
