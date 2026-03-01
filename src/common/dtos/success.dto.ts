import { ApiProperty } from '@nestjs/swagger';

export class SuccessDto {
  @ApiProperty({ type: Boolean })
  success: boolean;

  constructor(success: boolean) {
    this.success = success;
  }
}
