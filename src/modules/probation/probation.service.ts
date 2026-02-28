import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from '@app/configs/app.config';
import { ECfg } from '@app/configs/app-config.module';
import { lastValueFrom } from 'rxjs';
import { parse } from 'csv-parse/sync';
import { TaskReportDto } from '@app/common/dtos/task-report.dto';
import { IProbationTaskReport } from '@app/common/interfaces/probation-report.interface';
import { EventNameEnum } from '@app/common/enums/event-name.enum';
import { FetchProbationReportQuery } from '@app/common/interfaces/fetch-probation-reports-query.interface';

@Injectable()
export class ProbationService {
  readonly apiKey: string;
  readonly getReportsUrl: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const config = this.configService.getOrThrow<IAppConfig>(ECfg.APP);

    this.apiKey = config.probationApiKey;
    this.getReportsUrl = `${config.probationApiUrl}/tasks/campaign/reports`;
  }

  public fetchInstallCampaignReports(data: FetchProbationReportQuery) {
    return this.fetchCampaignReports({
      ...data,
      eventName: EventNameEnum.INSTALL,
    });
  }

  public fetchPurchaseCampaignReports(data: FetchProbationReportQuery) {
    return this.fetchCampaignReports({
      ...data,
      eventName: EventNameEnum.PURCHASE,
    });
  }

  private async fetchCampaignReports({
    fromDate,
    toDate,
    page,
    take,
    eventName,
  }: FetchProbationReportQuery & { eventName: EventNameEnum }): Promise<
    TaskReportDto[]
  > {
    const response = await lastValueFrom(
      this.httpService.get(this.getReportsUrl, {
        headers: { 'x-api-key': this.apiKey },
        params: {
          from_date: fromDate,
          to_date: toDate,
          page,
          take,
          event_name: eventName,
        },
      }),
    );

    const csv = response.data?.data?.csv;

    const records = parse(csv, {
      columns: true,
      skip_empty_lines: true,
    }) as IProbationTaskReport[];

    return records.map((r) => ({
      campaign: r.campaign,
      campaignId: r.campaign_id,
      adgroup: r.adgroup,
      adgroupId: r.adgroup_id,
      ad: r.ad,
      adId: r.ad_id,
      clientId: r.client_id,
      eventName: r.event_name,
      eventTime: new Date(r.event_time),
    })) as TaskReportDto[];
  }
}
