import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StarScoreEntity } from './entity/score.entity';
import { Repository } from 'typeorm';
import { CF } from 'nodeml';
import { StarScoreDTO } from './dto/star-score-dto';

/**
 * HYPE 행사 개인화 추천 API 서버 서비스
 * @author 조영욱
 * @since 2024.06.23
 * @version 1.0
 *
 * <pre>
 * 수정일        	수정자        수정내용
 * ----------  --------    ---------------------------
 * 2024.06.23  	조영욱        최초 생성
 * 2024.06.29   조영욱        트레이닝된 모델에 하나의 데이터만 추가 트레이닝 기능 구현
 * </pre>
 */
@Injectable()
export class CfService implements OnModuleInit {
  constructor(
    @InjectRepository(StarScoreEntity)
    private readonly starScoreRepository: Repository<StarScoreEntity>,
    private cf: CF,
  ) {}

  /**
   * 서버 작동 시 데이터셋 training
   */
  onModuleInit() {
    this.trainDataset();
  }

  /**
   * 모든 별점 데이터로 CF 모델 트레이닝
   */
  async trainDataset() {
    Logger.log('데이터셋 트레이닝');
    // 별점 데이터 조회
    const starScoreList = await this.starScoreRepository.find();

    // 데이터셋 트레이닝
    this.cf = new CF();
    this.cf.maxRelatedItem = 10;
    this.cf.maxRelatedUser = 10;
    this.cf.train(starScoreList, 'memberId', 'eventId', 'score');
  }

  /**
   * 이미 트레이닝된 모델에 대해
   * 하나의 데이터만 추가 트레이닝
   */
  trainAdditionalData(starScore: StarScoreDTO) {
    Logger.log('추가 트레이닝');
    Logger.log(`memberId: ${starScore.memberId}
                eventId: ${starScore.eventId}
                score: ${starScore.score}`);

    // 추가 데이터 트레이닝
    this.cf.addTrain(starScore, 'memberId', 'eventId', 'score');
  }

  async getScoreList(memberId: number) {
    Logger.log('요청 member: ' + memberId);

    const getRecommendResult = this.cf.recommendToUser(memberId, 10);

    Logger.log(JSON.stringify(getRecommendResult, null, 2));

    return getRecommendResult.map((obj) => Number(obj.itemId));
  }
}
