import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FetchReportsBodyDto {
  @ApiProperty()
  @IsString()
  fromDate: string;

  @ApiProperty()
  @IsString()
  toDate: string;
}
