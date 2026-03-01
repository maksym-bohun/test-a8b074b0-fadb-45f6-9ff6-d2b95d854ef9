import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FetchReportsBodyDto {
  @ApiProperty()
  @IsString()
  fromDate: string;

  @ApiProperty()
  @IsString()
  toDate: string;

  @ApiProperty({ default: 500 })
  @IsOptional()
  @IsNumber()
  take: number = 500;
}
