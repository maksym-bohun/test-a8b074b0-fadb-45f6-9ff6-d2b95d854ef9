import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { DataSource } from 'typeorm';

@Injectable()
export class TypeormHealthIndicator extends HealthIndicator {
  constructor(private readonly dataSource: DataSource) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.dataSource.query('SELECT 1');
      return this.getStatus(key, true);
    } catch (error) {
      return this.getStatus(key, false, { error: error.message });
    }
  }
}
