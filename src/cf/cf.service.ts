import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StarScoreEntity } from './entity/score.entity';
import { Repository } from 'typeorm';
import { CF } from 'nodeml';

@Injectable()
export class CfService implements OnModuleInit {
  constructor(
    @InjectRepository(StarScoreEntity)
    private readonly starScoreRepository: Repository<StarScoreEntity>,
    private cf: CF,
  ) {}

  // 서버 작동 시 CF 이니셜라이징
  onModuleInit() {
    this.trainDataset();
  }

  async trainDataset() {
    console.log('데이터셋 트레이닝');
    // 별점 데이터 조회
    const statScoreList = await this.starScoreRepository.find();

    // 데이터셋 트레이닝
    this.cf = new CF();
    this.cf.maxRelatedItem = 10;
    this.cf.maxRelatedUser = 10;
    this.cf.train(statScoreList, 'memberId', 'eventId', 'score');
  }

  async getScoreList(memberId: number) {
    console.log('요청 member: ' + memberId);

    const getRecommendResult = this.cf.recommendToUser(memberId, 10);

    console.log(getRecommendResult);

    return getRecommendResult.map((obj) => Number(obj.itemId));
  }
}
