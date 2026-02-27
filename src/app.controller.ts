import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { TypeormHealthIndicator } from '@app/database/typeorm.health';

@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private db: TypeormHealthIndicator,
  ) {}

  @Get('health')
  @HealthCheck()
  getHello() {
    return this.health.check([() => this.db.isHealthy('typeorm')]);
  }
}
