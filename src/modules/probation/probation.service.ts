import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ProbationService {
  // @ts-expect-error
  constructor(private readonly httpService: HttpService) {}
}
