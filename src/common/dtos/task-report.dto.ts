import { IsDateString, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskReportDto {
  @ApiProperty()
  @IsString()
  ad: string;

  @ApiProperty()
  @IsUUID()
  adId: string;

  @ApiProperty()
  @IsString()
  adgroup: string;

  @ApiProperty()
  @IsUUID()
  adgroupId: string;

  @ApiProperty()
  @IsString()
  campaign: string;

  @ApiProperty()
  @IsUUID()
  campaignId: string;

  @ApiProperty()
  @IsUUID()
  clientId: string;

  @ApiProperty()
  @IsDateString()
  eventTime: Date;
}
