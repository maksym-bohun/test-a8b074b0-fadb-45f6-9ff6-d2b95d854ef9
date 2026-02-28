import { Injectable } from '@nestjs/common';
import { ProbationService } from '@app/modules/probation/probation.service';
import { EntityManager } from 'typeorm';
import { FetchReportsBodyDto } from '@app/modules/campaign-reports/dtos/fetch-reports-body.dto';
import { CampaignReportsEntity } from '@app/modules/campaign-reports/db/campaign-reports.entity';
import { TaskReportDto } from '@app/common/dtos/task-report.dto';

@Injectable()
export class CampaignReportsService {
  constructor(
    private readonly probationService: ProbationService,
    private readonly manager: EntityManager,
  ) {}

  async fetchReports(body: FetchReportsBodyDto) {
    const take = 500;
    let installPage = 1;
    let purchasePage = 1;
    let hasMoreInstall = true;
    let hasMorePurchase = true;

    const { fromDate, toDate } = body;

    while (hasMoreInstall || hasMorePurchase) {
      let installRecords: TaskReportDto[] = [];
      if (hasMoreInstall) {
        installRecords =
          await this.probationService.fetchInstallCampaignReports({
            fromDate,
            toDate,
            page: installPage,
            take,
          });
        installPage++;
        if (installRecords.length < take) hasMoreInstall = false;
      }

      let purchaseRecords: TaskReportDto[] = [];
      if (hasMorePurchase) {
        purchaseRecords =
          await this.probationService.fetchPurchaseCampaignReports({
            fromDate,
            toDate,
            page: purchasePage,
            take,
          });
        purchasePage++;
        if (purchaseRecords.length < take) hasMorePurchase = false;
      }

      const records = [...installRecords, ...purchaseRecords];

      await this.manager.upsert(CampaignReportsEntity, records, {
        conflictPaths: ['eventTime', 'clientId', 'eventName'],
      });
    }

    return { success: true };
  }
}
