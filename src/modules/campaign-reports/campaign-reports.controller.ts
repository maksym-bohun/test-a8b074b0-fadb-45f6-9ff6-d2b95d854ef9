import { Body, Controller, Post } from '@nestjs/common';
import { CampaignReportsService } from '@app/modules/campaign-reports/campaign-reports.service';
import { FetchReportsBodyDto } from '@app/modules/campaign-reports/dtos/fetch-reports-body.dto';

@Controller('campaign-reports')
export class CampaignReportsController {
  constructor(
    private readonly campaignReportsService: CampaignReportsService,
  ) {}

  @Post('fetch')
  getCampaignReports(@Body() body: FetchReportsBodyDto) {
    return this.campaignReportsService.fetchReports(body);
  }
}
