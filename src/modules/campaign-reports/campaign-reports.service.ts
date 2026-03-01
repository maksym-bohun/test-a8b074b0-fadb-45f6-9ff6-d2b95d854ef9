import { Injectable } from '@nestjs/common';
import { ProbationService } from '@app/modules/probation/probation.service';
import { EntityManager } from 'typeorm';
import { FetchReportsBodyDto } from '@app/modules/campaign-reports/dtos/fetch-reports-body.dto';
import { CampaignReportsEntity } from '@app/modules/campaign-reports/db/campaign-reports.entity';
import { TaskReportDto } from '@app/common/dtos/task-report.dto';
import { AggregateReportQueryDto } from '@app/modules/campaign-reports/dtos/aggregate-reports-query.dto';
import { EventNameEnum } from '@app/common/enums/event-name.enum';
import { SuccessDto } from '@app/common/dtos/success.dto';

@Injectable()
export class CampaignReportsService {
  constructor(
    private readonly probationService: ProbationService,
    private readonly manager: EntityManager,
  ) {}

  async fetchReports(body: FetchReportsBodyDto): Promise<SuccessDto> {
    const { fromDate, toDate, take } = body;

    const pages: Record<EventNameEnum, number> = {
      [EventNameEnum.INSTALL]: 1,
      [EventNameEnum.PURCHASE]: 1,
    };

    const hasMore: Record<EventNameEnum, boolean> = {
      [EventNameEnum.INSTALL]: true,
      [EventNameEnum.PURCHASE]: true,
    };

    while (Object.values(hasMore).some(Boolean)) {
      const fetchPromises: Promise<TaskReportDto[]>[] = Object.entries(hasMore)
        .filter(([_, more]) => more)
        .map(([eventName]) => {
          const page = pages[eventName as EventNameEnum];
          const fetchFn =
            eventName === EventNameEnum.INSTALL
              ? this.probationService.fetchInstallCampaignReports
              : this.probationService.fetchPurchaseCampaignReports;

          return fetchFn.call(this.probationService, {
            fromDate,
            toDate,
            page,
            take,
          });
        });

      const results = await Promise.all(fetchPromises);

      const records: TaskReportDto[] = [];
      let i = 0;
      Object.entries(hasMore)
        .filter(([_, more]) => more)
        .forEach(([eventName]) => {
          const fetched = results[i++];
          records.push(...fetched);

          pages[eventName as EventNameEnum]++;
          if (fetched.length < take)
            hasMore[eventName as EventNameEnum] = false;
        });

      if (records.length > 0) {
        await this.manager.upsert(CampaignReportsEntity, records, {
          conflictPaths: ['eventTime', 'clientId', 'eventName'],
        });
      }
    }

    return new SuccessDto(true);
  }

  async getAggregatedReports(query: AggregateReportQueryDto) {
    const { fromDate, toDate, eventName, take, page } = query;

    const skip = (page - 1) * take;

    // using queryBuilder because ".find" doesn't support groupBy
    const rawResults = await this.manager
      .createQueryBuilder(CampaignReportsEntity, 'cr')
      .select('cr.adId', 'adId')
      .addSelect("DATE_TRUNC('second', cr.eventTime)", 'date')
      .addSelect('COUNT(*)', 'count')
      .where('cr.eventName = :eventName', { eventName })
      .andWhere('cr.eventTime BETWEEN :fromDate AND :toDate', {
        fromDate,
        toDate,
      })
      .groupBy('cr.adId')
      .addGroupBy("DATE_TRUNC('second', cr.eventTime)")
      .orderBy("DATE_TRUNC('second', cr.eventTime)", 'ASC')
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
