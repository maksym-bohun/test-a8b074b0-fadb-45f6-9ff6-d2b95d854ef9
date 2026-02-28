import { Injectable } from '@nestjs/common';
import { ProbationService } from '@app/modules/probation/probation.service';
import { EntityManager } from 'typeorm';
import { FetchReportsBodyDto } from '@app/modules/campaign-reports/dtos/fetch-reports-body.dto';
import { CampaignReportsEntity } from '@app/modules/campaign-reports/db/campaign-reports.entity';
import { TaskReportDto } from '@app/common/dtos/task-report.dto';
import { AggregateReportQueryDto } from '@app/modules/campaign-reports/dtos/aggregate-reports-query.dto';

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

  async getAggregatedReports(query: AggregateReportQueryDto) {
    const { fromDate, toDate, eventName, take, page } = query;

    const skip = (page - 1) * take;

    // using queryBuilder because ".find" doesn't support groupBy
    const rawResults = await this.manager
      .createQueryBuilder(CampaignReportsEntity, 'cr')
      .select('cr.adId', 'adId')
      .addSelect('DATE(cr.eventTime)', 'date')
      .addSelect('COUNT(*)', 'count')
      .where('cr.eventName = :eventName', { eventName })
      .andWhere('cr.eventTime BETWEEN :fromDate AND :toDate', {
        fromDate,
        toDate,
      })
      .groupBy('cr.adId')
      .addGroupBy('DATE(cr.eventTime)')
      .orderBy('DATE(cr.eventTime)', 'ASC')
      .skip(skip)
      .take(take)
      .getRawMany();

    return rawResults.map((r) => ({
      adId: r.adId,
      date: r.date,
      count: Number(r.count),
    }));
  }
}
