import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CfService } from './cf.service';
import { StarScoreDTO } from './dto/star-score-dto';

/**
 * HYPE 행사 개인화 추천 API 서버 컨트롤러
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
@Controller('cf')
export class CfController {
  constructor(private readonly cfService: CfService) {}

  /**
   * id를 파라미터로 받아 추천 행사 리스트 반환
   * @param id
   * @returns
   */
  @Get('/:id')
  async getScore(@Param('id', ParseIntPipe) id: number) {
    return this.cfService.getScoreList(id);
  }

  /**
   * 별점 추가/수정 시 해당 정보 트레이닝 모델에 업데이트
   * @param starScore
   * @returns
   */
  @Post('/add-train')
  trainAdditionalData(@Body() starScore: StarScoreDTO) {
    // hype spring 서버에서 보내는 요청만 수락
    if (starScore.secretKey != process.env.SECRET_ACCESS_KEY) return;
    this.cfService.trainAdditionalData(starScore);
  }
}
