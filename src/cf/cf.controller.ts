import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CfService } from './cf.service';

@Controller('cf')
export class CfController {
  constructor(private readonly cfService: CfService) {}

  @Get('/train')
  trainDataset() {
    this.cfService.trainDataset();
  }

  @Get('/:id')
  async getScore(@Param('id', ParseIntPipe) id: number) {
    return this.cfService.getScoreList(id);
  }
}
