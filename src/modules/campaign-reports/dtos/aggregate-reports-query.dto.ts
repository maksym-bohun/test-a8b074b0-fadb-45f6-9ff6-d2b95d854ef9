import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { EventNameEnum } from '@app/common/enums/event-name.enum';

export class AggregateReportQueryDto {
  @ApiProperty()
  @IsString()
  fromDate: string;

  @ApiProperty()
  @IsString()
  toDate: string;

  @ApiProperty()
  @IsString()
  eventName: EventNameEnum;

  @ApiPropertyOptional({ default: 100, minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  take?: number;

  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;
}
