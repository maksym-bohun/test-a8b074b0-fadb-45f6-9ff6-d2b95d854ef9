import { Module } from '@nestjs/common';
import { CampaignReportsController } from '@app/modules/campaign-reports/campaign-reports.controller';
import { CampaignReportsService } from '@app/modules/campaign-reports/campaign-reports.service';

@Module({
  controllers: [CampaignReportsController],
  providers: [CampaignReportsService],
  exports: [CampaignReportsService],
})
export class CampaignReportsModule {}
