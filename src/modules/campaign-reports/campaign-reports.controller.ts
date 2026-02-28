import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CampaignReportsService } from '@app/modules/campaign-reports/campaign-reports.service';
import { FetchReportsBodyDto } from '@app/modules/campaign-reports/dtos/fetch-reports-body.dto';
import { AggregateReportQueryDto } from '@app/modules/campaign-reports/dtos/aggregate-reports-query.dto';

@Controller('campaign-reports')
export class CampaignReportsController {
  constructor(
    private readonly campaignReportsService: CampaignReportsService,
  ) {}

  @Post('fetch')
  getCampaignReports(@Body() body: FetchReportsBodyDto) {
    return this.campaignReportsService.fetchReports(body);
  }

  @Get('aggregate')
  aggregateReports(@Query() query: AggregateReportQueryDto) {
    const take = query.take ?? 100;
    const page = query.page ?? 1;

    return this.campaignReportsService.getAggregatedReports({
      ...query,
      take,
      page,
    });
  }
}
