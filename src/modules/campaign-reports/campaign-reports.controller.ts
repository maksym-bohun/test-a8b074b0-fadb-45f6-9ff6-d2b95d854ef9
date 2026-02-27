import { Controller, Get } from '@nestjs/common';

@Controller('campaign-reports')
export class CampaignReportsController {
  constructor() {}
  @Get('')
  getCampaignReports() {}
}
