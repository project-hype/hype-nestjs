import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StarScoreEntity } from './entity/score.entity';
import { Repository } from 'typeorm';
import { CF } from 'nodeml';

@Injectable()
export class CfService {
  constructor(
    @InjectRepository(StarScoreEntity)
    private readonly starScoreRepository: Repository<StarScoreEntity>,
  ) {}

  async getScoreList(memberId: number) {
    console.log('요청 member: ' + memberId);

    // 별점 데이터 조회
    const statScoreList = await this.starScoreRepository.find();

    // 데이터셋 트레이닝
    const cf = new CF();
    cf.maxRelatedItem = 10;
    cf.maxRelatedUser = 10;
    cf.train(statScoreList, 'memberId', 'eventId', 'score');

    const getRecommendResult = cf.recommendToUser(memberId, 10);

    console.log(getRecommendResult);

    return getRecommendResult.map((obj) => Number(obj.itemId));
  }
}
