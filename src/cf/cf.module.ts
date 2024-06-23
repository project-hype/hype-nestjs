import { Module } from '@nestjs/common';
import { CfController } from './cf.controller';
import { CfService } from './cf.service';
import { StarScoreEntity } from './entity/score.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CF } from 'nodeml';

@Module({
  imports: [TypeOrmModule.forFeature([StarScoreEntity])],
  controllers: [CfController],
  providers: [CfService, CF],
})
export class CfModule {}
