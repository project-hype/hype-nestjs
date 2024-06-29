import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class StarScoreDTO {
  @IsNotEmpty()
  memberId: number;

  @IsNotEmpty()
  eventId: number;

  @IsNotEmpty()
  score: number;

  // hype 서버에서 보낸 요청만 받아들이기 수 있게 하기 위함
  @IsNotEmpty()
  @IsString()
  secretKey: string;
}
