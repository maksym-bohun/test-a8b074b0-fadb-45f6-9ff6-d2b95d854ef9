import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ProbationService } from '@app/modules/probation/probation.service';

@Module({
  imports: [HttpModule],
  providers: [ProbationService],
  exports: [ProbationService],
})
export class ProbationModule {}
